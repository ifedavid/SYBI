import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SYBI About" },
    { name: "description", content: "Get to know us!" },
  ];
}

export default function Home() {
  return <div>About!</div>;
}
