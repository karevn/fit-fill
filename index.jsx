import React from 'react'
import ReactDOM from 'react-dom'

import {align, valign, halign, fit, fill} from './src/calc'

function getImageStyle (container, size, opt) {
  if (!(container.height && size)) {
    return
  }
  const func = opt.fit ? fit : fill
  size = func(container, size)
  if (opt.valign) {
    size = valign(container, size)
  }
  if (opt.halign) {
    size = halign(container, size)
  }
  return size
}

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

  componentWillUnmount () { window.removeEventListener('resize', this.measure) }

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
    const state = this.state
    const {className, fit, component, valign, halign, ...props} = this.props
    return (<div className={className}>
      {React.createElement(component, Object.assign({}, props, {
        style: getImageStyle(state, state.image, {fit, valign, halign}),
        onLoad: this.onLoad
      }))}
    </div>)
  }

}

Fit.defaultProps = {
  fit: false,
  className: 'fit',
  component: 'img',
  valign: true,
  halign: true
}
