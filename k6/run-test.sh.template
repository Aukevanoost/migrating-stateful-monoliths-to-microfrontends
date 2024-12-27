#!/bin/bash

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_DIR="k6/${TIMESTAMP}_load_test"
mkdir -p "$OUTPUT_DIR"

echo "timestamp,name,cpu_percent,mem_usage,mem_limit,mem_percent" > "$OUTPUT_DIR/docker.csv"

collect_stats() {
    next_run=0
    while true; do
        start_time=$(perl -MTime::HiRes=time -e 'printf "%.6f\n", time')
        
        current_time=$(date +%s)
        docker stats --no-stream --format "$current_time,{{.Name}},{{.CPUPerc}},{{.MemUsage}},{{.MemPerc}}" \
        | sed -E 's/%|\x1b\[H|\x1b\[K|\x1b\[J//g' \
        | sed 's/ \/ /,/g' \
        | sed '/^$/d' \
        >> "$OUTPUT_DIR/docker.csv"
        
        perl -MTime::HiRes=time,sleep -e '
            my $elapsed = time() - '$start_time';
            my $to_sleep = 5 - $elapsed;
            sleep $to_sleep if $to_sleep > 0;
        '
    done
}

collect_stats &
DOCKER_STATS_PID=$!

cleanup() {
    echo "Cleaning up..."
    kill $DOCKER_STATS_PID 2>/dev/null
    exit
}

trap cleanup EXIT INT TERM

k6 run k6/load-test.js --out csv="$OUTPUT_DIR/raw_k6.csv" | tee /dev/tty

echo "Test completed! Results saved in: $OUTPUT_DIR"
echo "Docker stats: $OUTPUT_DIR/docker.csv"
echo "k6 output: $OUTPUT_DIR/raw_k6.csv"