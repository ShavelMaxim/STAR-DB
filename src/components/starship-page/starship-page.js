import React, { Component } from 'react'
import ErrorButton from '../error-button'
import ErorrIndecator from '../error-indicator/error-indicator'
import ItemList from '../item-list'
import './starship-page.css'
import StarshipDetails from './starship-details'
export default class StarshipPage extends Component {
  state = {
    hasError: false
  }
  componentDidCatch (error, info) {
    debugger
    this.setState({
      hasError: true
    })
  }
  render () {
    const { starshipId, onItemSelected, getData } = this.props
    if (this.state.hasError) {
      return <ErorrIndecator />
    }
    return (
      <div div className='page'>
        <span className='starship-list'>
          <ItemList onItemSelected={onItemSelected} getData={getData}>
            {i => i.name}
          </ItemList>
        </span>
        <span className='starship'>
          <StarshipDetails starshipId={starshipId} />
          <ErrorButton />
        </span>
      </div>
    )
  }
}
