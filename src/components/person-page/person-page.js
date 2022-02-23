import React from 'react'
import ItemList from './item-list/item-list'
import PersonDetails from './person-details/person-details'
import './person-page.css'

const PersonPage = ({ personId, onItemSelected }) => {
  return (
    <div className='page'>
      <span className='list'>
        <ItemList onItemSelected={onItemSelected} />
      </span>

      <span className='person'>
        <PersonDetails personId={personId} />
      </span>
    </div>
  )
}
export default PersonPage
