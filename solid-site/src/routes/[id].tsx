import { Title } from "solid-start";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { RouteDataArgs, useRouteData, useParams } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { onMount } from "solid-js";

// this method would run in your serverless lambda environment, not in the browser
const getFromDynamoDB = async (id: string | null | undefined, env?: string): Promise<any | undefined> => {
  const client = new DynamoDBClient({});
  const ddbDocClient = DynamoDBDocumentClient.from(client);

  if (!id || id.length < 1) {
    return undefined;
  }

  var params = {
    TableName: process.env.DEV_TABLE,
    Key: { id: id },
  };

  const data = await ddbDocClient.send(new GetCommand(params));
  return data.Item as any | undefined;
}

export function routeData({ params }: RouteDataArgs) {
  var mode = process.env.NODE_ENV;
  console.log("mode: ", mode)

  if (mode == 'development') {
    // when running the app via `npm run dev` in the local client, we stub it wit test data
    const serverData = () => ({ name: 'Herbert', age: 77 });
  
    return { serverData };
  } else {

    const serverData = createServerData$(async ([id]) => {
    // on the server we would fetch the data from the database
    // uncomment the following when you have created a dynamodb table in your aws account and set the env variable DEV_TABLE to the name of the table 

    //   return await getFromDynamoDB(id)
      return { name: 'Louise', age: 99 };
    }, { key: () => [params.id] });

    return { serverData };
  }
}

export default function Home() {
  const params = useParams();
  const { serverData } = useRouteData<typeof routeData>();

  onMount(() => {
    // this will only run via `run dev` not when run through SSR
    console.log("Site for id: ", params.id, " has been mounted");
    document.body.style.backgroundColor = "#AACC00";
  })

  return (
    <main>
      <Title>{params.id}</Title>
      <h1>You have opened the id {params.id}</h1>
      <p>
        Our server responded with { serverData()?.name}
      </p>
    </main>
  );
}
