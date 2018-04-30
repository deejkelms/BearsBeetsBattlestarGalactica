import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PubSub from 'pubsub-js'
import classnames from 'classnames'

const URL = 'http://localhost:4000/shows/'
const IMG_URL = 'https://image.tmdb.org/t/p/original/'

export default class Shows extends Component {

  constructor() {
    super()

    this.state = {
      shows: [],
      active: false
    }
  }

  componentDidMount () {
    this.token = PubSub.subscribe('List Updated', this.subscriber)

    // fetch inital data from json server and set to state
    axios.get(URL)
    .then((response) => {
      this.setState({
        shows: response.data
      })
    })
  }

  componentWillUnmount () {
    PubSub.unsubscribe(this.token)
  }

  // listening and setting state on changes to shows list
  subscriber = (msg, data) => {
    axios.get(URL)
    .then((response) => {
      this.setState({
        shows: response.data
      })
    })
  }

  handleClick = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    return(
      <div>
        <div
          onClick={this.handleClick}
          className={classnames('menu', {
            active: this.state.active
        })}>
          <div id='top'></div>
          <div id='middle'></div>
          <div id='bottom'></div>
        </div>

        <div className={classnames('shows', {
          active: this.state.active
        })}>
          <ul className='items'>
            {
              this.state.shows && this.state.shows.map(show => {
                return (
                  <li className='item' key={show.id}>
                    <Link to={`/shows/${show.id}/`}>
                      {show.name}
                    </Link>
                  </li>
                )
              })
            }
            <li className='item'>
              <Link to={`/shows/`}>
                Add new Show
              </Link>
          </li>
          </ul>
        </div>
      </div>
    )
  }
}
