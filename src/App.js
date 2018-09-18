import React, { Component } from "react";
import "./index.css";

import Today from "./components/Today";
import History from "./components/History";
import Header from "./components/Header";

const App = () => (
  <div className="">
    <div className="topheader">
      <Header />
    </div>
    <section className="results--section">
      <div className="container">
        <h1>
          PusherCoins is a realtime price information about<br /> BTC, ETH and
          LTC.
        </h1>
      </div>
      <div className="results--section__inner">
        <Today />
        <History />
      </div>
    </section>
  </div>
);

export default App;
