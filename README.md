# Solid-start-lambda-sample

This project contains a sample of a [solid-js](https://www.solidjs.com) website running in an AWS Lambda environment.

### install dependencies

```bash
cd solid-site && npm i && cd ..
```

### test in local browser

```bash
cd solid-site && npm run dev
```

### SSR on lambda

to rebuild the lambda function:

```bash
cd solid-site && npm run build && cd .. && sam build
```

to test it (you will need to have [AWS sam](https://aws.amazon.com/de/serverless/sam/) and [Docker](https://www.docker.com/) installed on your local system):

```bash
sam local start-api 2>&1 | tr "\r" "\n"
```

and open [http://localhost:3000/123456](http://localhost:3000/123456) in your browser

### TODO:

- [ ] determine why `onMount` is not called in the client after SSR. When using `npm run dev` directly we can see that it is called (via `dev` the background changes, via SSR it does not)
- [ ] determine why `root.css` is not imported when run via `SSR`. It only works when run via `npm run dev`. When importing as a named import it works for both
- [ ] figure out how to tell rollup that `@aws-sdk/client-dynamodb` is an external dependency, since it is available per default in lambda environment (so it does not need to be bundled)
