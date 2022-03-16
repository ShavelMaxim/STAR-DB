import React, { Component } from 'react'
import PlanetDetails from './planet-details'
import './planet-page.css'
import ErrorButton from '../error-button'
import ErorrIndecator from '../error-indicator/error-indicator'
import ItemList from '../item-list'

export default class PlanetPage extends Component {
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
    if (this.state.hasError) {
      return <ErorrIndecator />
    }
    const { planetId, onItemSelected, getData } = this.props
    return (
      <div>
        <div className='page'>
          <span className='list'>
            <ItemList onItemSelected={onItemSelected} getData={getData}>
              {i => i.name}
            </ItemList>
          </span>

          <span className='planet'>
            <PlanetDetails planetId={planetId} />
            <ErrorButton />
          </span>
        </div>
      </div>
    )
  }
}
