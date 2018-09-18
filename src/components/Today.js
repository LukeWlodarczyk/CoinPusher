import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import CryptoPrice from "./CryptoPrice";

class Today extends Component {
  state = {
    btcprice: 0,
    ltcprice: 0,
    ethprice: 0
  };

  sendPricePusher = data => {
    axios
      .post("/prices/new", {
        prices: data
      })
      .then(console.log)
      .catch(console.error);
  };

  saveStateToLocalStorage = () => {
    localStorage.setItem("today-state", JSON.stringify(this.state));
  };

  restoreStateFromLocalStorage = () => {
    const state = JSON.parse(localStorage.getItem("today-state"));
    this.setState(state);
  };

  componentDidMount() {
    if (!navigator.onLine) {
      return this.restoreStateFromLocalStorage();
    }
    this.pusher = new Pusher("ed1e9ea5a087b9be2988", {
      cluster: "eu",
      encrypted: true
    });

    this.prices = this.pusher.subscribe("coin-prices");

    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
      )
      .then(({ data: { BTC, ETH, LTC } }) => {
        this.setState(
          {
            btcprice: BTC.USD,
            ethprice: ETH.USD,
            ltcprice: LTC.USD
          },
          this.saveStateToLocalStorage
        );
      })
      .catch(console.error);

    this.cryptoSubscription = setInterval(() => {
      axios
        .get(
          "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
        )
        .then(({ data }) => {
          this.sendPricePusher(data);
        })
        .catch(console.error);
    }, 10000);

    this.prices.bind(
      "prices",
      ({ prices: { BTC, ETH, LTC } }) => {
        this.setState(
          {
            btcprice: BTC.USD,
            ethprice: ETH.USD,
            ltcprice: LTC.USD
          },
          this.saveStateToLocalStorage
        );
      },
      this
    );
  }

  componentWillUnmount() {
    clearInterval(this.cryptoSubscription);
  }

  render() {
    // Let's extract everything uptop to keep our render method cleaner ;)
    const { ethprice, btcprice, ltcprice } = this.state;
    return (
      <div className="today--section container">
        <h2>Current Price</h2>
        <div className="columns today--section__box">
          {/** Creating components for things that repeat themselves is also pretty good**/}
          <CryptoPrice currency="btc" price={btcprice} />
          <CryptoPrice currency="eth" price={ethprice} />
          <CryptoPrice currency="ltc" price={ltcprice} />
        </div>
      </div>
    );
  }
}

export default Today;
