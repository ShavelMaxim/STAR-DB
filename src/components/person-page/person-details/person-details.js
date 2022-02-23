import React, { Component } from 'react'
import SwapiService from '../../../service/swapi-service'
import ErorrIndecator from '../../error-indicator/error-indicator'
import Spinner from '../../spinner'
import './person-details.css'

export default class PersonDetails extends Component {
  swapiService = new SwapiService()

  state = {
    person: {},
    loading: true,
    error: false
  }

  componentDidMount () {
    this.upDatePerson()
  }
  componentDidUpdate (prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.upDatePerson()
    }
  }

  onError = err => {
    this.setState({ error: true, loading: false })
  }

  upDatePerson () {
    const { personId } = this.props
    if (!personId) {
      return
    }
    this.swapiService
      .getPerson(personId)
      .then(person =>
        this.setState({
          person,
          loading: false
        })
      )
      .catch(this.onError)
  }
  render () {
    const { person, loading, error } = this.state
    const hasData = !(loading || error)
    const errorMessage = error ? <ErorrIndecator /> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <PersonView person={person} /> : null

    return (
      <div className='list-group-item'>
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}
const PersonView = ({ person }) => {
  const { id, name, birthYear, eyeColor, gender, height } = person

  return (
    <React.Fragment>
      <img
        className='img-person'
        alt='person'
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />

      <ul className='list-group'>
        <li className='list-group-item'>
          <h4>{name}</h4>
        </li>
        <li className='list-group-item'>Birth Year {birthYear}</li>
        <li className='list-group-item'>Eye Color {eyeColor}</li>
        <li className='list-group-item'>Gender {gender}</li>
        <li className='list-group-item'>Height {height}</li>
      </ul>
    </React.Fragment>
  )
}
