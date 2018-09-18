import React, { Component } from "react";

import axios from "axios";

class Today extends Component {
  state = {
    btcprice: "",
    ltcprice: "",
    ethprice: ""
  };

  componentDidMount() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
      )
      .then(response => {
        this.setState({
          btcprice: response.data.BTC.USD,
          ethprice: response.data.ETH.USD,
          ltcprice: response.data.LTC.USD
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { btcprice, ethprice, ltcprice } = this.state;

    return (
      <div className="today--section container">
        <h2>Current Price</h2>
        <div className="columns today--section__box">
          <div className="column btc--section">
            <h5>${btcprice}</h5>
            <p>1 BTC</p>
          </div>
          <div className="column eth--section">
            <h5>${ethprice}</h5>
            <p>1 ETH</p>
          </div>
          <div className="column ltc--section">
            <h5>${ltcprice}</h5>
            <p>1 LTC</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Today;
