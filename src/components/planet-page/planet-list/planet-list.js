import React, { Component } from 'react'
import './planet-list.css'
import SwapiService from '../../../service/swapi-service'
import Spinner from '../../spinner'
import ErorrIndecator from '../../error-indicator/error-indicator'
export default class PlanetList extends Component {
  swapiService = new SwapiService()

  state = {
    planetList: [],
    error: false,
    loading: true
  }

  onError = err => {
    this.setState({ error: true, loading: false })
  }

  componentDidMount () {
    this.swapiService
      .getAllPlanets()
      .then(planetList =>
        this.setState({
          planetList,
          loading: false
        })
      )
      .catch(this.onError)
  }
  render () {
    const { planetList, loading, error } = this.state
    const hasData = !(loading || error)
    const errorMessage = error ? <ErorrIndecator /> : null
    const spinner = loading ? <Spinner /> : null
    const nameList = planetList.map(({ name, id }) => {
      return (
        <li
          key={id}
          className='list-group-item list-group-item-action'
          onClick={() => this.props.onPlanetSelected(id)}
        >
          {name}
        </li>
      )
    })
    const content = hasData ? nameList : null
    return (
      <div className='list-group-item'>
        {errorMessage}
        {spinner}
        <ul className='list-group'>{content}</ul>
      </div>
    )
  }
}
