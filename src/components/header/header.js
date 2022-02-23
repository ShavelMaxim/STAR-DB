import React from 'react'
import './header.css'

const Header = ({ onCategorySelected }) => {
  const category = [
    { name: 'People', id: 1 },
    { name: 'Planets', id: 2 },
    { name: 'Starship', id: 3 }
  ]
  const content = category.map(({ name, id }) => {
    return (
      <div
        key={id}
        className='header category btn btn-active '
        onClick={() => onCategorySelected(id)}
      >
        {name}
      </div>
    )
  })
  return (
    <span>
      <div className='wrapper'>
        <div className='header starDB'>
          <span>Star DB</span>
        </div>
        <span>{content}</span>
      </div>
    </span>
  )
}
export default Header
