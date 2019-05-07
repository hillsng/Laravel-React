import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import MyGlobleSetting from '../../MyGlobleSetting';



class TableRow extends Component {
  constructor(props) {
      super(props);
  }
  delete(id) {
      if( window.confirm("Are you sure? You want to delete this item.") ) {
          var self = this;
          let uri = MyGlobleSetting.url + `/api/event/${this.props.object.id}`;
          axios.delete(uri)
              .then(res => {
                  alert(res.data.message);
                  this.props.action(id);
                  return console.log(res.data);
              })
              .catch(err => console.log(err))
      }
  }
  render() {
    return (
        <tr>
          <td>
            {this.props.object.title}
          </td>
          <td>
            {this.props.object.location}
          </td>
          <td>
            {this.props.object.description}
          </td>
          <td>
            {this.props.object.start_date} / {this.props.object.start_time}
          </td>
          <td>
            <Link to={"edit-event/"+this.props.object.id} className="btn btn-primary">Edit</Link> &nbsp;
            <button  onClick={event => this.delete(this.props.object.id)} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}


export default TableRow;