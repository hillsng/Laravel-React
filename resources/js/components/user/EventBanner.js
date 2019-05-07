import React, { Component } from 'react'
import {Jumbotron, Container, Form, Col, Button } from 'react-bootstrap'


export class EventBanner extends Component {
  render() {
    /*if (window.location.pathname === '/login') return null;
    if (window.location.pathname === '/signup') return null;
    if (window.location.pathname === '/createevent') return null;
    if (window.location.pathname === '/eventdetails') return null;*/
    return (
     <Jumbotron fluid className="bg">
        <Container>
        <Form className="searchForm">
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Control as="select">
              <option>Choose...</option>
              <option>New South Wales</option>
              <option>Melbourne</option>
              <option>Queenland</option>
              <option>South Australia</option>
              <option>Tasmania</option>
              <option>Western Australia</option>
              <option>Northen territory</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
          <Button variant="primary" type="submit">
          Submit
          </Button>
          </Form.Group>
        </Form.Row>
       </Form>
       </Container>
      </Jumbotron>
    )
  }
}

export default EventBanner
