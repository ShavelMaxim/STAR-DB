import React from 'react'
import PlanetList from './planet-list'
import PlanetDetails from './planet-details'
import './planet-page.css'

const PlanetPage = ({ planetId, onPlanetSelected }) => {
  return (
    <div>
      <div className='page'>
        <span className='list'>
          <PlanetList onPlanetSelected={onPlanetSelected} />
        </span>

        <span className='planet'>
          <PlanetDetails planetId={planetId} />
        </span>
      </div>
    </div>
  )
}
export default PlanetPage
