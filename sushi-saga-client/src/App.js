import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"
let SUSHIS = []

class App extends Component {
  constructor() {
    super()
    this.state = {
      wallet: 100,
      sushisEaten: [],
      sushiIndex: 0,
      currentSushis:[]
    }

    this.getSushis()
  }

  getSushis = () => {
    fetch(API)
    .then(res => res.json())
    .then(sushis => {
      SUSHIS = sushis
      this.setState({
        currentSushis: sushis.slice(this.state.sushiIndex, this.state.sushiIndex+4)
      })
    })
  }

  isSushiEaten = (sushi) => {
    if (this.state.sushisEaten.some(s => (s.id === sushi.id))) {
      return true
    } else {
      return false
    }
  }

  eatSushi = (sushi) => {
    const newWallet = this.state.wallet - sushi.price
    if (!this.isSushiEaten(sushi) && (newWallet >= 0)) {
      let currentSushisEaten = this.state.sushisEaten
      currentSushisEaten.push(sushi)
      this.setState({
        wallet: newWallet,
        sushisEaten: currentSushisEaten
      })
    }
  }

  moreSushi = () => {
    const nextIndex = this.state.sushiIndex+4
    this.setState({
      sushiIndex: nextIndex,
      currentSushis: SUSHIS.slice(nextIndex, nextIndex+4)
    })
  }

  render() {
    return (
      <div className="app">
        <SushiContainer
          currentSushis={this.state.currentSushis}
          eatSushi={(sushi) => this.eatSushi(sushi)}
          isSushiEaten={this.isSushiEaten}
          moreSushi={this.moreSushi}
        />
        <Table wallet={this.state.wallet} sushisEaten={this.state.sushisEaten}/>
      </div>
    );
  }
}

export default App;
