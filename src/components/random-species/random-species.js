import React, { Component } from 'react'
import './random-species.css'
import SwapiService from '../../service/swapi-service'
import Spinner from '../spinner'
import ErorrIndecator from '../error-indicator/error-indicator'
import ErrorButton from '../error-button'

export default class RandomSpecies extends Component {
  swapiService = new SwapiService()

  state = {
    species: {},
    loading: true,
    error: false,
    hasError: false
  }
  componentDidMount () {
    this.upDateSpecies()
  }

  onError = err => {
    this.setState({ error: true, loading: false })
  }

  upDateSpecies () {
    const id = Math.floor(Math.random() * 37 + 1)
    this.swapiService
      .getSpecies(id)
      .then(species =>
        this.setState({
          species,
          loading: false
        })
      )
      .catch(this.onError)
  }
  onRandomSpecies = () => {
    this.upDateSpecies()
  }
  componentDidCatch (error, info) {
    debugger
    this.setState({
      hasError: true
    })
  }
  render () {
    if (this.state.hasError) {
      return <ErorrIndecator />
    }
    const { species, loading, error } = this.state
    const hasData = !(loading || error)
    const errorMessage = error ? <ErorrIndecator /> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? (
      <SpeciesView species={species} onRandomSpecies={this.onRandomSpecies} />
    ) : null

    return (
      <div className='wrapper-list list-group-item species'>
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}
const SpeciesView = ({ species, onRandomSpecies }) => {
  const {
    id,
    name,
    classification,
    hairColors,
    skinColors,
    height,
    averageLifespan,
    language
  } = species

  return (
    <React.Fragment>
      <div>
        <img
          className='img'
          alt='species'
          src={`https://starwars-visualguide.com/assets/img/species/${id}.jpg`}
        />
        <ul className='list-group'>
          <li className='list-group-item'>
            <h4>{name}</h4>
          </li>
          <li className='list-group-item'>Classification {classification}</li>
          <li className='list-group-item'>Hair Colors {hairColors}</li>
          <li className='list-group-item'>Skin Colors {skinColors}</li>
          <li className='list-group-item'>Height {height}</li>
          <li className='list-group-item'>
            Average Lifespan {averageLifespan}
          </li>
          <li className='list-group-item'>Language {language}</li>
        </ul>
        <button
          className='btn btn-secondary btn-sm btn-species-random'
          onClick={() => onRandomSpecies()}
        >
          <b>species random</b>
        </button>
        <ErrorButton />
      </div>
    </React.Fragment>
  )
}
