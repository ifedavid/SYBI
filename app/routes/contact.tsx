import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SYBI Contacts" },
    { name: "description", content: "Contact us!" },
  ];
}

export default function Home() {
  return <div>Contact!</div>;
}
