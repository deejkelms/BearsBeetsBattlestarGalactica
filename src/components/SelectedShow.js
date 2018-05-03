import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import PubSub from 'pubsub-js'
import moment from 'moment'

import facebook from '../images/facebook-square.svg'
import instagram from '../images/instagram.svg'
import twitter from '../images/twitter-square.svg'
import Img from './Img'
import { Config } from '../config.js'

export default class SelectedShow extends Component {
  constructor() {
    super()

    this.state = {
      show: {},
      backgroundImage: '',
      credits: {},
      social: {}
    }
  }

  componentDidMount() {
    // call componentWillReceiveProps so that when we want to go to new show it updates
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(newProps) {
    // getting id from URL via react-router
    const showId = newProps.match.params.showId

    axios.all([
      axios.get(`${Config.URL}/${showId}`),
      axios.get(`${Config.API_URL}/${showId}/credits?api_key=${Config.API_KEY}&languate=en-US`),
      axios.get(`${Config.API_URL}/${showId}/external_ids?api_key=${Config.API_KEY}&language=en-US`)
    ])
    .then(axios.spread((overview, credits, social) => {
      return [overview.data, credits.data, social.data]
    }))
    .then(data => {
      this.setState({
        show: data[0],
        backgroundImage: `${Config.IMG_URL}${data[0].backdrop_path}`,
        credits: data[1],
        social: data[2]
      })
    })
  }

  deleteShow = (id) => {
    axios.delete(`${Config.URL}${id}`)
      .then(response => {
        PubSub.publish('List Updated', 'goodbye world!')
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const {
      name, id, overview, first_air_date, last_air_date, poster_path,
      created_by, genres, networks, number_of_episodes, seasons, popularity
    } = this.state.show
    const { cast } = this.state.credits
    const { facebook_id, twitter_id, instagram_id } = this.state.social
    const network = networks && networks[0]
    return(
      <div className='show'>
        <div className='showImage' style={{backgroundImage: `url(${this.state.backgroundImage})`}}>
          <div className='showOverview'>
            { network && <Img path={network.logo_path} /> }
            <h1>
              {name}{' '}<small>({moment(first_air_date).format('Y')})</small>
            </h1>
            <div>
              <p>
               {overview}
              </p>
            </div>
            <button onClick={() => this.deleteShow(id)}>
              Remove Show
            </button>
          </div>
        </div>

        <div id='showOtherInfo' >
          <h1 className='showTitle'>{this.state.show.name}</h1>

          <Row>
            <Col sm={7} smOffset={1}  id="cast">
              <div>
                <h4 className='title'> Cast Members </h4>
                <Row>
                  {cast && cast.map((actor, idx) => {
                    return (
                      <Col sm={3} key={idx} className='castMember'>
                        <Img path={actor.profile_path} />
                        <h4>{actor.name}</h4>
                      </Col>
                    )
                  })}
                </Row>
              </div>
            </Col>
            <Col sm={3} className='showSidebar'>

              <div id='social'>
                <a href={`https://www.facebook.com/${facebook_id}`}>
                  <img src={facebook} alt='facebook'></img>
                </a>
                <a href={`https://www.instagram.com/${instagram_id}`}>
                  <img src={instagram} alt='instagram'></img>
                </a>
                <a href={`https://www.twitter.com/${twitter_id}`}>
                  <img src={twitter} alt='twitter'></img>
                </a>
              </div>

              <div id='popularity'>
                <h3>Popularity: { Math.round(popularity, 1) }%</h3>
              </div>

              <div id="credits">
                <h3> Created By </h3>
                  {created_by && created_by.map((creator, idx) => {
                    return (
                      <span key={idx}>{creator.name} </span>
                    )
                  })}
                  <h3> Genres </h3>
                  <div id='genres'>
                    <ul>
                    { genres && genres.map((genre, idx) => {
                      return (
                        <li key={idx}>{genre.name}</li>
                      )
                    })}
                    </ul>
                  </div>
              </div>
              <div id='poster'>
                <Img path={poster_path} />
              </div>
            </Col>

            <Col sm={10} smOffset={1}>
              <div id='seasons'>
                <h4 className='title'> {seasons && seasons.length} Seasons and {number_of_episodes} Episodes
                </h4>
                <p> Last Air Date: {moment(last_air_date).format('LL')} </p>

                <Row>
                  {seasons && seasons.map((season, idx) => {
                    return (
                      <Col sm={2} key={idx} className='season'>
                        <Img path={season.poster_path} />
                        <h5>{season.name}</h5>
                      </Col>
                    )
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
