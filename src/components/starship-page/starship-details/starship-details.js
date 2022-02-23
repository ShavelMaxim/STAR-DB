import React, { Component } from 'react'
import SwapiService from '../../../service/swapi-service'
import ErorrIndecator from '../../error-indicator/error-indicator'
import Spinner from '../../spinner'
import './starship-details.css'

export default class StarshipDetails extends Component {
  swapiService = new SwapiService()

  state = {
    starship: {},
    loading: true,
    error: false
  }

  componentDidMount () {
    this.upDateStarship()
  }
  componentDidUpdate (prevProps) {
    if (this.props.starshipId !== prevProps.starshipId) {
      this.upDateStarship()
    }
  }

  onError = err => {
    this.setState({ error: true, loading: false })
  }

  upDateStarship () {
    const { starshipId } = this.props
    if (!starshipId) {
      return
    }
    this.swapiService
      .getStarship(starshipId)
      .then(starship =>
        this.setState({
          starship,
          loading: false
        })
      )
      .catch(this.onError)
  }
  render () {
    const { starship, loading, error } = this.state
    const hasData = !(loading || error)
    const errorMessage = error ? <ErorrIndecator /> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <StarshipView starship={starship} /> : null

    return (
      <div className='list-group-item'>
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}
const StarshipView = ({ starship }) => {
  const {
    id,
    name,
    model,
    manufacturer,
    costInCredits,
    length,
    crew,
    passengers,
    cargoCapacity
  } = starship

  return (
    <React.Fragment>
      <div>
        <img
          className='img-starship'
          alt='starship'
          src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
        />

        <ul className='list-group'>
          <li className='list-group-item'>
            <h4>{name}</h4>
          </li>
          <li className='list-group-item'>Model {model}</li>
          <li className='list-group-item'>Manufacturer {manufacturer}</li>
          <li className='list-group-item'>Cost In Credits {costInCredits}</li>
          <li className='list-group-item'>Length {length}</li>
          <li className='list-group-item'>Crew {crew}</li>
          <li className='list-group-item'>Passengers {passengers}</li>
          <li className='list-group-item'>Cargo Capacity {cargoCapacity}</li>
        </ul>
      </div>
    </React.Fragment>
  )
}
