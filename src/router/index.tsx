import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import remote, { RouteType } from "./config";
import { Styles } from "../styles/styles";

import { ItemProps, useItems, useItem } from "../common/utils/useItems";

interface PageProps extends ItemProps {
  path: string[];
  sections: {
    _model: string;
    _id: string;
  }[];
}

interface SectionProps extends ItemProps {
  id: string;
  title: string;
  text: string;
}

const Router = () => {
  // ...
  const [pages, loading, error, handleRefresh] = useItems<PageProps>("page");
  const [section] = useItem<SectionProps>("section", pages?.[0]?.sections?.[0]?._id);

  console.log(pages, section);

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
