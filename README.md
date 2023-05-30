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
