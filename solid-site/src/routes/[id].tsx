import { Title } from "solid-start";
import { RouteDataArgs, useRouteData, useParams } from "solid-start";

export default function Home() {
  const params = useParams();

  return (
    <main>
      <Title>{params.id}</Title>
      <h1>You have opened the id {params.id}</h1>
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
