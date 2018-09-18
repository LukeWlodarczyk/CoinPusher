import React, { Component } from "react";

import axios from "axios";
import moment from "moment";

class History extends Component {
  state = {
    todayprice: {},
    yesterdayprice: {},
    twodaysprice: {},
    threedaysprice: {},
    fourdaysprice: {}
  };

  getPrices = (currency, date) => {
    return axios.get(
      `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${currency}&tsyms=USD&ts=${date}`
    );
  };

  getTodayPrice() {
    const t = moment().unix();

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

          this.setState({ todayprice: data });
        })
      );
  }

  getHistoryPrice = (daysBefore, stateProp) => {
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

          this.setState({ [stateProp]: data });
        })
      );
  };

  componentDidMount() {
    this.getTodayPrice();
    this.getHistoryPrice(1, "yesterdayprice");
    this.getHistoryPrice(2, "twodaysprice");
    this.getHistoryPrice(3, "threedaysprice");
    this.getHistoryPrice(4, "fourdaysprice");
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
          <div className="history--section__box__inner">
            <h4>{todayprice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${todayprice.btc}</p>
              </div>
              <div className="column">
                <p>1 ETH = ${todayprice.eth}</p>
              </div>
              <div className="column">
                <p>1 LTC = ${todayprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{yesterdayprice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${yesterdayprice.btc}</p>
              </div>
              <div className="column">
                <p>1 ETH = ${yesterdayprice.eth}</p>
              </div>
              <div className="column">
                <p>1 LTC = ${yesterdayprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{twodaysprice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${twodaysprice.btc}</p>
              </div>
              <div className="column">
                <p>1 ETH = ${twodaysprice.eth}</p>
              </div>
              <div className="column">
                <p>1 LTC = ${twodaysprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{threedaysprice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${threedaysprice.btc}</p>
              </div>
              <div className="column">
                <p>1 ETH = ${threedaysprice.eth}</p>
              </div>
              <div className="column">
                <p>1 LTC = ${threedaysprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{fourdaysprice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${fourdaysprice.btc}</p>
              </div>
              <div className="column">
                <p>1 ETH = ${fourdaysprice.eth}</p>
              </div>
              <div className="column">
                <p>1 LTC = ${fourdaysprice.ltc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
