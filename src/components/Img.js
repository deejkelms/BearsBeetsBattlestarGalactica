import React from 'react'
import { Config } from '../config.js'

const Img = (props) => {
  const img = props.path
  let src;
  if (img) {
    src = `${Config.IMG_URL}${img}`
  } else {
    src = 'http://placekitten.com/g/200/300'
  }
  return (
    <img alt='' src={src} />
  )
}

export default Img
