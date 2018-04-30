import React from 'react'

const IMG_URL = 'https://image.tmdb.org/t/p/original/'

const Img = (props) => {
  const img = props.path
  let src;
  if (img) {
    src = `${IMG_URL}${img}`
  } else {
    src = 'http://placekitten.com/g/200/300'
  }
  return (
    <img alt='' src={src} />
  )
}

export default Img
