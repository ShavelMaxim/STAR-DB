import React, { Component } from 'react'
import ErorrIndecator from '../error-indicator/error-indicator'
import './error-boundry'

export default class ErrorBoundry extends Component {
  state = {
    hasError: false
  }
  componentDidCatch () {
    this.setState({
      hasError: true
    })
  }
  render () {
    if (this.state.hasError) {
      return <ErorrIndecator />
    }
    return this.props.children
  }
}
