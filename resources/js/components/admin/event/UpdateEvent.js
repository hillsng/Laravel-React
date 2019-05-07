import React, {Component} from 'react';
import axios from 'axios';
import { Link , browserHistory} from 'react-router';
import MyGlobleSetting from '../../MyGlobleSetting';


class UpdateEvent extends Component {
  constructor(props) {
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

      this.handleChange1 = this.handleChange1.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleChange3 = this.handleChange3.bind(this);
      this.handleChange4 = this.handleChange4.bind(this);
      this.handleChange5 = this.handleChange5.bind(this);
      this.handleChange6 = this.handleChange6.bind(this);
      this.onChange = this.onChange.bind(this);
      this.handleChange7 = this.handleChange7.bind(this);
      this.handleChange8 = this.handleChange8.bind(this);
      this.handleChange9 = this.handleChange9.bind(this);
      this.handleChange10 = this.handleChange10.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChangeEvent = this.onChangeEvent.bind(this);
  }


  componentDidMount(){
    axios.get(MyGlobleSetting.url + `/api/event/${this.props.params.id}/edit`)
    .then(response => {
      this.setState({ 
        eventTitle: response.data.data.title,
        location: response.data.data.location,
        start_date: response.data.data.start_date,
        start_time: response.data.data.start_time,
        end_date: response.data.data.end_date,
        end_time: response.data.data.end_time,
        image: response.data.data.image,
        description: response.data.data.description,
        organiser_id: response.data.data.organiser_id,
        organiser_description: response.data.data.organiser_description,
        category_id: response.data.data.category_id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

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
  handleChange1(e){
    this.setState({
      eventTitle: e.target.value
    })
  }
  handleChange2(e){
    this.setState({
      location: e.target.value
    })
  }
  handleChange3(e){
    this.setState({
      start_date: e.target.value
    })
  }
  handleChange4(e){
    this.setState({
      start_time: e.target.value
    })
  }
  handleChange5(e){
    this.setState({
      end_date: e.target.value
    })
  }
  handleChange6(e){
    this.setState({
      end_time: e.target.value
    })
  }
  handleChange7(e){
    this.setState({
      description: e.target.value
    })
  }
  handleChange8(e){
    this.setState({
      organiser_id: e.target.value
    })
  }
  handleChange9(e){
    this.setState({
      organiser_description: e.target.value
    })
  }
  handleChange10(e){
    this.setState({
      category_id: e.target.value
    })
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


  handleSubmit(event) {
    event.preventDefault();
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
      }
      let uri = MyGlobleSetting.url + '/api/event/'+this.props.params.id;
      axios.patch(uri, events).then((response) => {
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


  render(){
    const {organisersData} = this.state;
    const {categoriesData} = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-10">
            <h3>Update Event</h3>
          </div>
          <div className="col-md-2">
            <Link to="/display-event" className="btn btn-success">Back</Link>
          </div>
        </div><br />
        <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label> Event Title : </label>
                  <input type="text" className="form-control" value={this.state.eventTitle}  name="eventTitle" onChange={this.onChangeEvent} />
                  <div className="errorMsg">{this.state.errors.eventTitle}</div>
                </div>
              </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label> Location : </label>
                    <input type="text"  className="form-control" value={this.state.location} name="location" onChange={this.onChangeEvent} />
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
                        <input type="date" className="form-control" value={this.state.start_date} name="start_date" onChange={this.onChangeEvent} />
                        <div className="errorMsg">{this.state.errors.start_date}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                      <label> Start Time : </label>
                        <input type="time" className="form-control" value={this.state.start_time} name="start_time" onChange={this.onChangeEvent} />
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
                        <input type="date" className="form-control" value={this.state.end_date} name="end_date" onChange={this.onChangeEvent} />
                        <div className="errorMsg">{this.state.errors.end_date}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label> End Time : </label>
                        <input type="time" className="form-control" value={this.state.end_time} name="end_time" onChange={this.onChangeEvent} />
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
                      <input type='file' className="form-control"  onChange={this.onChange} /> 
                    </div>
                    
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label> Description : </label>
                    <textarea className="form-control" value={this.state.description || ''} name="description" onChange={this.onChangeEvent} />
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
                    <textarea className="form-control" value={this.state.organiser_description || ''} name="organiser_description" onChange={this.onChangeEvent} />
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
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
    )
  }
}
export default UpdateEvent;