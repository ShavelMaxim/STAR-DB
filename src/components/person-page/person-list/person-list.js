import React, { Component } from 'react'
import './person-list.css'
import SwapiService from '../../../service/swapi-service'
import Spinner from '../../spinner'
import ErorrIndecator from '../../error-indicator/error-indicator'
export default class PersonList extends Component {
  swapiService = new SwapiService()

  state = {
    personList: [],
    error: false,
    loading: true
  }

  onError = err => {
    this.setState({ error: true, loading: false })
  }

  componentDidMount () {
    this.swapiService
      .getAllPeople()
      .then(personList =>
        this.setState({
          personList,
          loading: false
        })
      )
      .catch(this.onError)
  }
  render () {
    const { personList, loading, error } = this.state
    const hasData = !(loading || error)
    const errorMessage = error ? <ErorrIndecator /> : null
    const spinner = loading ? <Spinner /> : null
    const nameList = personList.map(({ name, id }) => {
      return (
        <li
          key={id}
          className='list-group-item list-group-item-action'
          onClick={() => this.props.onItemSelected(id)}
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
