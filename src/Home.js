import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

import SearchResults from './SearchResults'
import bear from './images/bears.svg'
import beets from './images/beets.svg'
import bsg from './images/bsg.svg'

const URL = 'http://localhost:4000/shows/'
const API_KEY = '0e22f21a01e286fe1da4827c9cb155dc'
const API_URL = 'https://api.themoviedb.org/3/'

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      query: '',
      results: []
    }
  }

  handleInputChange = (evt) => {
    this.setState({
      query: evt.target.value
    })
  }

  getInfo = (evt) => {
    evt.preventDefault()
    axios.get(`${API_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${this.state.query}`)
      .then(response => {
        return response.data
      })
      .then(data => {
        this.setState({
          results: data.results
        })
      })
  }

  addShow = (result) => {
    axios.get(`${API_URL}tv/${result.id}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        return response.data
      })
      .then(data => {
        axios.post(`${URL}`, data)
          .then(response => {
            PubSub.publish('List Updated', 'hello world!')
            this.props.history.push(`/shows/${data.id}`);
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return(
      <div className='home'>
        <div className='homeTitle'>
          <img src={bear} alt='bear' />
          <img src={beets} alt='beets' />
          <img src={bsg} alt="battlestargalactica" />
        </div>
          <form onSubmit={this.getInfo}>
            <input
              placeholder="Moar TV..."
              onChange={this.handleInputChange}
            />
            <button>Search</button>
          </form>
          <SearchResults data={this.state.results} addShow={this.addShow}/>
      </div>
    )
  }
}
