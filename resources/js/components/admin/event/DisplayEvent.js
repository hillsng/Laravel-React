import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRow from './TableRow';
import MyGlobleSetting from '../../MyGlobleSetting';


class DisplayEvent extends Component {
  constructor(props) {
       super(props);
       this.state = {value: '', event: ''};
       this.handleDeleteSuccessResponse = this.handleDeleteSuccessResponse.bind(this);
     }

     componentDidMount(){
       axios.get(MyGlobleSetting.url + '/api/event')
       .then(response => {
        //console.log(response.data.data);
         this.setState({ event: response.data.data });
       })
       .catch(function (error) {
         console.log(error);
       })
     }
     handleDeleteSuccessResponse(id) {
        const event = this.state.event.filter(
            event => event.id !== id
        );
        this.setState({
            event: event
        });
    }
     tabRow(){
      var self = this;
       if(this.state.event instanceof Array){
         return this.state.event.map(function(object, i,handleDeleteSuccessResponse){
         // console.log(object);
             return <TableRow action={self.handleDeleteSuccessResponse} object={object} key={i} />;

         })
       }
     }

  render(){
    return (
      <div>

        <div className="row">
          <div className="col-md-10"><h1>Events</h1></div>
          <div className="col-md-2">
            <Link to="/add-event" className="btn btn-primary">Create Event</Link>
          </div>
        </div><br />


        <table className="table table-hover">
            <thead>
            <tr>
                <th>Event Title</th>
                <th>Location</th>
                <th>Description</th>
                <th>Start Date/Time</th>
                <th width="200px">Actions</th>
            </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
        </table>
    </div>
    )
  }
}
export default DisplayEvent;