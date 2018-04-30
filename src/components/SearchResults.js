import React, { Component } from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import Img from './Img'

export default class SearchResults extends Component {

  render() {
    return (
      <Grid>
        <Row>
          { this.props.data && this.props.data.map(result => {
            return (
              <Col sm={3} className='resultWrapper' >
                <div className='result'>
                  <Img path={result.poster_path} />
                  <button onClick={() => this.props.addShow(result)}>
                    Add Show
                  </button>
                </div>
              </Col>
            )})
          }
        </Row>
      </Grid>
    )
  }
}
