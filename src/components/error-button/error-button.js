import React, { Component } from 'react'
import './error-button.css'

export default class ErrorButton extends Component {
  state = {
    renderError: false
  }
  render () {
    if (this.state.renderError) {
      this.too.bar = 0
    }
    return (
      <button
        className='errorButton btn btn-danger btn-lg'
        onClick={() => this.setState({ renderError: true })}
      >
        Throw Error
      </button>
    )
  }
}
