# (EGENIE NEXT WEB SOLUTION)


## Getting Started

`yarn install` - Install all the dependencies.
`yarn dev` - Run a local API environment for **development**.
`yarn test` - Will run all tests with the --silent enabled and --detectOpenHandles so you don't get a huge blob of console.logs.

## With Docker

`yarn dev:docker` - Creates and runs an isolated environment in a docker container for **development** (recommended).

### Building for production

`yarn build:docker` - This command will transpile and create a distribution folder in a docker image.
