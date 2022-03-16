import React, { Component } from 'react'
import './app.css'
import Header from '../header'
import PersonPage from '../person-page'
import StarshipPage from '../starship-page'
import PlanetPage from '../planet-page'
import RandomSpecies from '../random-species'
import SwapiService from '../../service/swapi-service'

export default class App extends Component {
  state = {
    selectedItem: Math.floor(Math.random() * 9 + 3),
    selectedCategory: 1
  }
  swapiService = new SwapiService()

  onItemSelected = id => {
    this.setState({
      selectedItem: id
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
            personId={this.state.selectedItem}
            onItemSelected={this.onItemSelected}
            getData={this.swapiService.getAllPeople}
          />
        )
      } else if (selectedCategory === 2) {
        return (
          <PlanetPage
            planetId={this.state.selectedItem}
            onItemSelected={this.onItemSelected}
            getData={this.swapiService.getAllPlanets}
          />
        )
      } else if (selectedCategory === 3) {
        return (
          <StarshipPage
            starshipId={this.state.selectedItem}
            onItemSelected={this.onItemSelected}
            getData={this.swapiService.getAllStarships}
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
