import React, { Component } from 'react'
import PersonDetails from './person-details/person-details'
import './person-page.css'
import ItemList from '../item-list'
import Row from '../row'
import ErrorBoundry from '../error-boundry/error-boundry'
import ErrorButton from '../error-button'

export default class PersonPage extends Component {
  state = {
    hasError: false
  }
  render () {
    const { personId, onItemSelected, getData } = this.props
    const itemList = (
      <ItemList onItemSelected={onItemSelected} getData={getData}>
        {i => i.name}
      </ItemList>
    )
    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={personId} />
        <ErrorButton />
      </ErrorBoundry>
    )
    return <Row left={itemList} rigth={personDetails} />
  }
}
