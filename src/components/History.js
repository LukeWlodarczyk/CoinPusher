import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import SectionBox from "./SectionBox";

class History extends Component {
  state = {
    todayprice: {},
    yesterdayprice: {},
    twodaysprice: {},
    threedaysprice: {},
    fourdaysprice: {}
  };

  saveStateToLocalStorage = () => {
    localStorage.setItem("history-state", JSON.stringify(this.state));
  };

  restoreStateFromLocalStorage = () => {
    const state = JSON.parse(localStorage.getItem("today-state"));
    console.log(state);
    this.setState(state);
  };

  getPrices = (currency, date) => {
    return axios.get(
      `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${currency}&tsyms=USD&ts=${date}`
    );
  };

  getPriceForDay = (daysBefore, stateProp) => {
    const t = moment()
      .subtract(daysBefore, "days")
      .unix();

    axios
      .all([
        this.getPrices("ETH", t),
        this.getPrices("BTC", t),
        this.getPrices("LTC", t)
      ])
      .then(
        axios.spread((eth, btc, ltc) => {
          const data = {
            date: moment.unix(t).format("MMMM Do YYYY"),
            eth: eth.data.ETH.USD,
            btc: btc.data.BTC.USD,
            ltc: ltc.data.LTC.USD
          };

          this.setState({ [stateProp]: data }, this.saveStateToLocalStorage);
        })
      );
  };

  componentDidMount() {
    if (!navigator.onLine) {
      this.restoreStateFromLocalStorage();
    }
    this.getPriceForDay(0, "todayprice");
    this.getPriceForDay(1, "yesterdayprice");
    this.getPriceForDay(2, "twodaysprice");
    this.getPriceForDay(3, "threedaysprice");
    this.getPriceForDay(4, "fourdaysprice");
  }

  render() {
    const {
      todayprice,
      yesterdayprice,
      twodaysprice,
      threedaysprice,
      fourdaysprice
    } = this.state;

    return (
      <div className="history--section container">
        <h2>History (Past 5 days)</h2>
        <div className="history--section__box">
          <SectionBox price={todayprice} />
          <SectionBox price={yesterdayprice} />
          <SectionBox price={twodaysprice} />
          <SectionBox price={threedaysprice} />
          <SectionBox price={fourdaysprice} />
        </div>
      </div>
    );
  }
}

export default History;
