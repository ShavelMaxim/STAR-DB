import React from 'react'
import './row.css'

const Row = ({ left, rigth }) => {
  return (
    <div className='page'>
      <span className='list'>{left}</span>

      <span className='person'>{rigth}</span>
    </div>
  )
}
export default Row
