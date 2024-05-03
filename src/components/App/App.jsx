import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PreLoader from "../PreLoader/PreLoader";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/list">
          <CoinList />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
