# Migrating monoliths to micro frontends

This repository contains the experiments related to the Msc. thesis 'Migrating stateful monoliths to micro frontends'. The experiment is divided into 6 sections: 

1. [Initial wicket monolith to be migrated](https://github.com/Aukevanoost/migrating-stateful-monoliths-to-microfrontends/tree/1-baseline-monolith)
2. [Micro frontends experiments and code snippets](https://github.com/Aukevanoost/migrating-stateful-monoliths-to-microfrontends/tree/2-experiments)
3. [Client Side Rendering setup](https://github.com/Aukevanoost/migrating-stateful-monoliths-to-microfrontends/tree/3-csr-setup)
4. [Server Side Rendering setup (horizontal)](https://github.com/Aukevanoost/migrating-stateful-monoliths-to-microfrontends/tree/4-ssr-setup)
5. [Server Side Rendering setup (vertical)](https://github.com/Aukevanoost/migrating-stateful-monoliths-to-microfrontends/tree/5-ssr-setup-vertical)
6. [Benchmark results](https://github.com/Aukevanoost/migrating-stateful-monoliths-to-microfrontends/tree/6-benchmark)

## Reproduction: 
To be able to reproduce the tests, some tools are necessary:

- Running the applications: [Docker](https://www.docker.com/)
- Running the tests: [Grafana K6](https://k6.io/) | [Node 23.3](https://nodejs.org/en)
- Running the analytics: [Python 3](https://www.python.org/) | [Jupyter Notebook](https://jupyter.org/install) | Python packages

Note that these tests were run on a Macbook pro 14-inch 2023 (Apple M2 PRO chip + 16gb RAM + macOS 15.1.1). Therefore, some changes were required to be able to run the clusters like an internal urls change: 'http://localhost' -> 'http://docker.for.mac.localhost'. _Your mileage may vary based on OS and hardware_. 

**Run services:**
- Checkout desired branch (1, 3, 4 or 5)
- move to project directory
- (optional) make sh file executable
- Start cluster: `docker-compose up -d --build`

**Reproduction steps (server-side):**
- Run tests: `./run-test.sh`

**Reproduction steps (client-side):**
- Checkout branch 6 in another folder
- Run cluster as shown above
- Move to playwright folder
- Install node packages: `npm install`
- Run test: `npm run test:vitals`