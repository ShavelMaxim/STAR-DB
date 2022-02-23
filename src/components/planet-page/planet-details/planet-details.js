import React, { Component } from 'react'
import SwapiService from '../../../service/swapi-service'
import ErorrIndecator from '../../error-indicator/error-indicator'
import Spinner from '../../spinner'
import './planet-details.css'

export default class PlanetDetails extends Component {
  swapiService = new SwapiService()

  state = {
    planet: {},
    loading: true,
    error: false
  }

  componentDidMount () {
    this.upDatePlanet()
  }
  componentDidUpdate (prevProps) {
    if (this.props.planetId !== prevProps.planetId) {
      this.upDatePlanet()
    }
  }

  onError = err => {
    this.setState({ error: true, loading: false })
  }

  upDatePlanet () {
    const { planetId } = this.props
    if (!planetId) {
      return
    }
    this.swapiService
      .getPlanet(planetId)
      .then(planet =>
        this.setState({
          planet,
          loading: false
        })
      )
      .catch(this.onError)
  }
  render () {
    const { planet, loading, error } = this.state
    const hasData = !(loading || error)
    const errorMessage = error ? <ErorrIndecator /> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <PlanetView planet={planet} /> : null

    return (
      <div className='list-group-item'>
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}
const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter, climate } = planet

  return (
    <React.Fragment>
      <img
        className='img-planet'
        alt='planet'
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />

      <ul className='list-group'>
        <li className='list-group-item'>
          <h4>{name}</h4>
        </li>
        <li className='list-group-item'>Population {population}</li>
        <li className='list-group-item'>Rotation Period {rotationPeriod}</li>
        <li className='list-group-item'>Diameter {diameter}</li>
        <li className='list-group-item'>Climate {climate}</li>
      </ul>
    </React.Fragment>
  )
}
