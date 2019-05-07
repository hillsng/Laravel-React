import React, { Component } from 'react'
import {Jumbotron, Container, Col, Row, Form,  Button } from 'react-bootstrap';
import MaterialIcon from 'react-google-material-icons';

export class FooterMenu extends Component {
  render() {
  /* if (window.location.pathname === '/login') return null;
   if (window.location.pathname === '/signup') return null;
   if (window.location.pathname === '/createevent') return null;*/
 return (
    <Jumbotron fluid className="footer">
      <Container>
         <Row>
            <Col xs={12} md={4}>
            <div className="Footertitle">
                  <h4>Eventbux Office</h4>
               </div>
              <ul>
                <li>About EventBux</li>
                <li>How it Work</li>
                <li>Download App</li>
                <li>Promote Ticket</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>
            <Col xs={12} md={4}>
               <div className="Footertitle">
                  <h4>Explore events</h4>
               </div>
              <ul>
                <li>About eventBux</li>
                <li>How it eork</li>
                <li>Download epp</li>
                <li>Promote ticket</li>
                <li>Privacy policy</li>
              </ul>
            </Col>
            <Col xs={12} md={4} className="xs-center">
            <div className="emailList">
               <span>Subscribe to stay connected</span>
                <Form className="form-inline">
                <Form.Control type="email" placeholder="name@example.com" />
                <Button variant="primary" type="submit">Submit</Button>
             </Form>
             <div className="paymentServ socialMedia">
                <ul>
                   <li><MaterialIcon icon="favorite_border" size={30}/></li>
                   <li><MaterialIcon icon="favorite_border" size={30}/></li>
                   <li><MaterialIcon icon="favorite_border" size={30}/></li>
                </ul>
             </div>
            </div>
             <ul className="LastfooterMenu">
                <li>About EventBux</li>
                <li>How it Work</li>
                <li>Download App</li>
                <li>Promote Ticket</li>
                <li>Privacy Policy</li>
            </ul>
          </Col>
          <Col xs={12} md={6}>
             <div className="paymentServ">
               <h5>Payment Service Available</h5>
               <ul>
                 <li><img src="//via.placeholder.com/50x50" alt="card"></img></li>
                 <li><img src="//via.placeholder.com/50x50" alt="card"></img></li>
                 <li><img src="//via.placeholder.com/50x50" alt="card"></img></li>
                 <li><img src="//via.placeholder.com/50x50" alt="card"></img></li>
             </ul>
           </div>
           </Col>
           <Col xs={12} md={6}>
             <div className="paymentServ copyright">
               <p>Copyright@2019 eventbux.com</p>
           </div>
           </Col>
        </Row>
         
       </Container>
    </Jumbotron>
    )
  }
}

export default FooterMenu
