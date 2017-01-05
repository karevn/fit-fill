import React from 'react'
import ReactDOM from 'react-dom'

import {align, fit, fill} from './src/calc'

export default class Fit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      width: null,
      height: null
    }
    this.measure = ::this.measure
    this.onLoad = ::this.onLoad
  }

  componentDidMount () { window.addEventListener('resize', this.measure) }

  componentWillUnmount () {
    window.removeEventListener('resize', this.measure)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.src !== this.props.src) {
      this.setState({image: null})
    }
  }

  measure () {
    const node = ReactDOM.findDOMNode(this)
    this.setState({
      width: node.clientWidth,
      height: node.clientHeight
    })
  }

  getImageStyle (shouldFit) {
    if (!(this.state.height && this.state.image)) {
      return
    }
    if (shouldFit) {
      return align(this.state, fit(this.state, this.state.image))
    } else {
      return align(this.state, fill(this.state, this.state.image))
    }
  }

  onLoad (e) {
    this.measure()
    this.setState({
      image: {
        width: e.target.naturalWidth,
        height: e.target.naturalHeight
      }
    })
    if (this.props.onLoad) {
      this.props.onLoad(e)
    }
  }

  render () {
    let {className, fit, component, ...props} = this.props
    return (<div className={className}>
      {React.createElement(component, Object.assign({}, props, {
        style: this.getImageStyle(fit),
        onLoad: this.onLoad
      }))}
    </div>)
  }

}

Fit.defaultProps = {
  fit: false,
  className: 'fit',
  component: 'img'
}
