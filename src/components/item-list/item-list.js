import React, { Component } from 'react'
import ErorrIndecator from '../error-indicator/error-indicator'
import Spinner from '../spinner'
import './item-list.css'
export default class ItemList extends Component {
  state = {
    itemList: [],
    error: false,
    loading: true
  }

  onError = err => {
    this.setState({ error: true, loading: false })
  }

  componentDidMount () {
    this.props
      .getData()
      .then(itemList =>
        this.setState({
          itemList,
          loading: false
        })
      )
      .catch(this.onError)
  }
  renderItems = arr =>
    arr.map(item => {
      const { id } = item
      const label = this.props.children(item)
      return (
        <li
          key={id}
          className='list-group-item list-group-item-action'
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      )
    })
  render () {
    const { itemList, loading, error } = this.state
    const hasData = !(loading || error)
    const errorMessage = error ? <ErorrIndecator /> : null
    const spinner = loading ? <Spinner /> : null

    const content = hasData ? this.renderItems(itemList) : null
    return (
      <div className='list-group-item'>
        {errorMessage}
        {spinner}
        <ul className='list-group'>{content}</ul>
      </div>
    )
  }
}
