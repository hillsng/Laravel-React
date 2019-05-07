import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import MyGlobleSetting from '../../MyGlobleSetting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const EditorComponent = () => <Editor />

class CreateEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventTitle: '',
      location: '',
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: '',
      image: '',
      description: '',
      organiser_id: '',
      organiser_description: '',
      category_id: '',
      ticket_type_id: '',
      event_type: '',
      organisersData: [],
      categoriesData: [],
      fields: {},
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEvent = this.onChangeEvent.bind(this);

  }


  onChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
    return;
    this.createImage(files[0]);
  }
  createImage(file) {
    let reader = new FileReader();
      reader.onload = (e) => {
      this.setState({
      image: e.target.result
      })
    };
    reader.readAsDataURL(file);
  }


  onChangeEvent(e) {
        this.setState({
            [e.target.name]: e.target.value
        });        
        
        let errors = this.state.errors;
        if (!e.target.value.length) {          
          errors[e.target.name] = "*Please enter "+[e.target.name];          
        }else{
          errors[e.target.name] = "";
        }
        this.setState({
            errors: errors
          });
        
    }

  handleChange11(e){
    this.setState({
      event_type: e.target.value
    })
  }


  componentDidMount() {
      axios.get(MyGlobleSetting.url + '/api/organisers')
          .then(response => {
              this.setState({organisersData: response.data.data});
          })
          .catch(function (error) {
              console.log(error);
          });
      axios.get(MyGlobleSetting.url + '/api/categories')
          .then(response => {
              this.setState({categoriesData: response.data.data});
          })
          .catch(function (error) {
              console.log(error);
          });
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }
  handleSubmit(e){
    e.preventDefault();
    if (this.validateForm()) {
      const events = {
        title: this.state.eventTitle,
        location: this.state.location,
        start_date: this.state.start_date,
        start_time: this.state.start_time,
        end_date: this.state.end_date,
        end_time: this.state.end_time,
        image: this.state.image,
        description: this.state.description,
        organiser_id: this.state.organiser_id,
        organiser_description: this.state.organiser_description,
        category_id: this.state.category_id,
        event_type: this.state.event_type,
      }
      let uri = MyGlobleSetting.url + '/api/event';
      axios.post(uri, events).then((response) => {
        browserHistory.push('/display-event');
      });
    }

  }

   validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!this.state.eventTitle) {
        formIsValid = false;
        errors["eventTitle"] = "*Please enter Title.";
      }

      if (!this.state.location) {
        formIsValid = false;
        errors["location"] = "*Please enter Location.";
      }

      if (!this.state.start_date) {
        formIsValid = false;
        errors["start_date"] = "*Please select event start date.";
      }
      if (!this.state.start_time) {
        formIsValid = false;
        errors["start_time"] = "*Please select event start time.";
      }
      if (!this.state.end_date) {
        formIsValid = false;
        errors["end_date"] = "*Please select event end date.";
      }
      if (!this.state.end_time) {
        formIsValid = false;
        errors["end_time"] = "*Please select event end time.";
      }
      if (!this.state.image) {
        formIsValid = false;
        errors["image"] = "*Please upload image.";
      }
      if (!this.state.description) {
        formIsValid = false;
        errors["description"] = "*Please enter description.";
      }
      if (!this.state.organiser_id) {
        formIsValid = false;
        errors["organiser_id"] = "*Please select organiser.";
      }
      if (!this.state.organiser_description) {
        formIsValid = false;
        errors["organiser_description"] = "*Organiser description is mandatory.";
      }
      if (!this.state.category_id) {
        formIsValid = false;
        errors["category_id"] = "*Please select category.";
      }

      this.setState({
        errors: errors
      });
      //console.log(formIsValid);
      return formIsValid;

    }

    render() {
      const {organisersData} = this.state;
      const {categoriesData} = this.state;

      return (
      <div>
        <div className="row">
            <div className="col-md-10">
              <h3>Create An Event</h3>
            </div>
            <div className="col-md-2">
            </div>
          </div>
       
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label> Event Title : </label>
                <input type="text" className="form-control" 
                name="eventTitle" onChange={this.onChangeEvent} />
                  <div className="errorMsg">{this.state.errors.eventTitle}</div>
              </div>
            </div>
          </div>
          <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label> Location : </label>
                  <input type="text"  className="form-control" name="location" onChange={this.onChangeEvent} />
                    <div className="errorMsg">{this.state.errors.location}</div>
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                    <label> Start Date : </label>
                      <input type="date" className="form-control" name="start_date" onChange={this.onChangeEvent} />
                      <div className="errorMsg">{this.state.errors.start_date}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                    <label> Start Time : </label>
                      <input type="time" className="form-control" name="start_time" onChange={this.onChangeEvent} />
                      <div className="errorMsg">{this.state.errors.start_time}</div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> End Date : </label>
                      <input type="date" className="form-control" name="end_date" onChange={this.onChangeEvent} />
                      <div className="errorMsg">{this.state.errors.end_date}</div>      
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> End Time : </label>
                      <input type="time" className="form-control" name="end_time" onChange={this.onChangeEvent} />
                      <div className="errorMsg">{this.state.errors.end_time}</div>      
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label> Image : </label>
                  <div className='button'>
                    <input type='file' className="form-control" name="image" onChange={this.onChange} /> 
                    <div className="errorMsg">{this.state.errors.image}</div>      
                  </div>
                  
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label> Description : </label>
                  <textarea className="form-control" name="description" onChange={this.onChangeEvent} />
                    <div className="errorMsg">{this.state.errors.description}</div>
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Select organiser:
                  </label>
                    <select
                        className="form-control"
                        name="organiser_id"
                        value={this.state.organiser_id}
                        onChange={this.onChangeEvent}>
                        <option value="">Select Organisers</option>
                        {organisersData.map(obj => (
                            <option key={obj.id} value={obj.id}>{obj.name}</option>
                        ))}
                    </select>
                    <div className="errorMsg">{this.state.errors.organiser_id}</div>
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label> Organiser Description : </label>
                  <textarea className="form-control" name="organiser_description" onChange={this.onChangeEvent} />
                    <div className="errorMsg">{this.state.errors.organiser_description}</div>
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Select category:
                  </label>
                  <select
                        className="form-control"
                        name="category_id"
                        value={this.state.category_id}
                        onChange={this.onChangeEvent}>
                        <option value="">Select Category</option>
                        {categoriesData.map(obj => (
                            <option key={obj.id} value={obj.id}>{obj.name}</option>
                        ))}
                    </select>
                    <div className="errorMsg">{this.state.errors.category_id}</div>
                </div>
              </div>
          </div><br />
            <div className="form-group">
              <button className="btn btn-primary">Add Event</button>
            </div>
        </form>
  </div>
      )
    }
}
export default CreateEvent;