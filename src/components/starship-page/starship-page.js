import React from 'react'
import StarshipDetails from './starship-details'
import StarshipList from './starship-list/starship-list'
import './starship-page.css'

const StarshipPage = ({ starshipId, onStarshipSelected }) => {
  return (
    <div div className='page'>
      <span className='starship-list'>
        <StarshipList onStarshipSelected={onStarshipSelected} />
      </span>
      <span className='starship'>
        <StarshipDetails starshipId={starshipId} />
      </span>
    </div>
  )
}
export default StarshipPage
