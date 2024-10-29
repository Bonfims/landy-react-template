import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes, { RouteType } from "./config";
import { Styles } from "../styles/styles";

const Router = () => {
  // ...
  const [remote, setRemote] = React.useState<Array<RouteType>>([]);

  React.useEffect(() => {
    setRemote(routes);
  }, []);

  return (
    <Suspense fallback={null}>
      <Styles />
      <Header />
      <Switch>
        {remote?.map((routeItem) => {
          const Component = lazy(() => import(`../pages/${routeItem.component}/index.tsx`));
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              render={(props) => <Component {...props} {...routeItem} />}
            />
          );
        })}
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default Router;
