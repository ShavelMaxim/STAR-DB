import React, { Component } from 'react'
import './app.css'
import Header from '../header'
import PersonPage from '../person-page'
import StarshipPage from '../starship-page'
import PlanetPage from '../planet-page'
import RandomSpecies from '../random-species'

export default class App extends Component {
  state = {
    selectedPerson: Math.floor(Math.random() * 82) + 1,
    selectedStarship: 5,
    selectedPlanet: Math.floor(Math.random() * 19) + 2,
    selectedCategory: 1
  }

  onPersonSelected = id => {
    this.setState({
      selectedPerson: id
    })
  }
  onStarshipSelected = id => {
    this.setState({
      selectedStarship: id
    })
  }
  onPlanetSelected = id => {
    this.setState({
      selectedPlanet: id
    })
  }
  onCategorySelected = id => {
    this.setState({
      selectedCategory: id
    })
  }

  render () {
    const { selectedCategory } = this.state
    const page = () => {
      if (selectedCategory === 1) {
        return (
          <PersonPage
            personId={this.state.selectedPerson}
            onItemSelected={this.onPersonSelected}
          />
        )
      } else if (selectedCategory === 2) {
        return (
          <PlanetPage
            planetId={this.state.selectedPlanet}
            onPlanetSelected={this.onPlanetSelected}
          />
        )
      } else if (selectedCategory === 3) {
        return (
          <StarshipPage
            starshipId={this.state.selectedStarship}
            onStarshipSelected={this.onStarshipSelected}
          />
        )
      } else return
    }
    return (
      <div>
        <Header
          onCategorySelected={this.onCategorySelected}
          selectedCategory={this.state.selectedCategory}
        />
        {page()}
        <RandomSpecies />
      </div>
    )
  }
}
