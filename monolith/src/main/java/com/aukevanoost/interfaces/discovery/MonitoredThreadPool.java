package com.aukevanoost.interfaces.discovery;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

public class MonitoredThreadPool extends ThreadPoolExecutor {
    private static final int CORE_POOL_SIZE = 50;
    private static final int MAXIMUM_POOL_SIZE = 500;
    private static final long KEEP_ALIVE_TIME = 60L;
    private static final double ALERT_THRESHOLD = 0.8;

    private final AtomicInteger currentTaskCount = new AtomicInteger(0);
    private volatile boolean alertTriggered = false;

    public MonitoredThreadPool() {
        super(CORE_POOL_SIZE,
            MAXIMUM_POOL_SIZE,
            KEEP_ALIVE_TIME,
            TimeUnit.SECONDS,
            new LinkedBlockingQueue<>(MAXIMUM_POOL_SIZE),
            new ThreadFactory() {
                private final AtomicInteger threadCount = new AtomicInteger(1);
                @Override
                public Thread newThread(Runnable r) {
                    Thread thread = new Thread(r);
                    thread.setName("MonitoredThread-" + threadCount.getAndIncrement());
                    thread.setDaemon(true);
                    return thread;
                }
            },
            new ThreadPoolExecutor.CallerRunsPolicy());
    }

    @Override
    protected void beforeExecute(Thread t, Runnable r) {
        super.beforeExecute(t, r);
        int current = currentTaskCount.incrementAndGet();
        checkUsage(current);
    }

    @Override
    protected void afterExecute(Runnable r, Throwable t) {
        super.afterExecute(r, t);
        currentTaskCount.decrementAndGet();

        if (alertTriggered && getPoolUsagePercentage() < ALERT_THRESHOLD) {
            alertTriggered = false;
        }
    }

    private void checkUsage(int currentTasks) {
        double usage = getPoolUsagePercentage();
        if(usage >= 0.1) {
            System.out.printf("Pool usage: %.1f%%%n", usage * 100);
        }
        if (usage >= ALERT_THRESHOLD && !alertTriggered) {
            System.out.printf(
                "WARNING: Thread pool usage has reached %.1f%% (Current tasks: %d, Active threads: %d, Pool size: %d, Max size: %d)%n",
                usage * 100,
                currentTasks,
                getActiveCount(),
                getPoolSize(),
                getMaximumPoolSize()
            );
            alertTriggered = true;
        }
    }

    public double getPoolUsagePercentage() {
        return (double) currentTaskCount.get() / MAXIMUM_POOL_SIZE;
    }

    public static MonitoredThreadPool createInstance() {
        return new MonitoredThreadPool();
    }
}