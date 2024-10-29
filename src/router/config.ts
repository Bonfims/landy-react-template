
const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Remote",
  },
];

export interface RouteType {
  path: Array<string>;
  exact: boolean;
  component: string;
}

export default routes;
