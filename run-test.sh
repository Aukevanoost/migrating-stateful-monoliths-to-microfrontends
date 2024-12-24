#!/bin/bash

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_DIR="k6/load_test_results_${TIMESTAMP}"
mkdir -p "$OUTPUT_DIR"

echo "name,cpu_percent,mem_usage,mem_limit,mem_percent" > "$OUTPUT_DIR/docker_stats.csv"

collect_stats() {
    while true; do
        current_time=$(date +%s)

        docker stats --no-stream --format "$current_time,{{.Name}},{{.CPUPerc}},{{.MemUsage}},{{.MemPerc}}" \
        | sed -E 's/%|\x1b\[H|\x1b\[K|\x1b\[J//g' \
        | sed 's/ \/ /,/g' \
        | sed '/^$/d' \
        >> "$OUTPUT_DIR/docker_stats.csv"
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

k6 run k6/load-test.js --out csv="$OUTPUT_DIR/results.csv" | tee /dev/tty

echo "Test completed! Results saved in: $OUTPUT_DIR"
echo "Docker stats: $OUTPUT_DIR/docker_stats.csv"
echo "k6 output: $OUTPUT_DIR/k6_output.log"