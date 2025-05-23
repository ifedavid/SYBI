import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("submit-review", "routes/submit-review.tsx"),
    route("terms_and_privacy", "routes/terms_and_privacy.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
