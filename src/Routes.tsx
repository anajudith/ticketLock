import { Routes as Switch, Route, BrowserRouter } from "react-router-dom";

import InitHome from "./pages/HomePage";
import { ShowDetails } from "./components";

export default function Routes() {
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route path="/" element={<InitHome />} />
          <Route path="/shows/:id" element={<ShowDetails />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
