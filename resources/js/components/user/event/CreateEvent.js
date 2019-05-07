import React, { Component } from 'react'
import MaterialIcon from 'react-google-material-icons';
import {NavigationBar} from '../NavigationBar';
import {FooterMenu} from '../FooterMenu';
import axios from "axios";
import MyGlobleSetting from "../../MyGlobleSetting";
import {browserHistory , Link} from "react-router";
import {Row, Col, Button, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import TinyMCE from 'react-tinymce';
import { LocationField } from '../../shared/LocationField';
import { Formik, Field } from 'formik';


class OrganiserModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            organiser_name:'',
            errors: {},
        };

        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);

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

    handleModalSubmit(e){
        e.preventDefault();
        if (this.validateForm()) {
            const organisers = {
                name: this.state.organiser_name,
            }
            let uri = MyGlobleSetting.url + '/api/organiser';
            axios.post(uri, organisers).then((response) => {
                //console.log(response.data.data);
                this.props.action(response.data.data);

                this.props.onHide();
            });
        }
    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!this.state.organiser_name) {
            formIsValid = false;
            errors["organiser_name"] = "*Please enter name.";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    render() {
        /*if (window.location.pathname === '/createevent') return null;*/

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Organiser
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleModalSubmit}>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} md={6}>
                                <Row>
                                    <Col xs={12} md={5}>
                                        Organiser Name :
                                    </Col>
                                    <Col xs={12} md={7}>
                                        <input type="text" name="organiser_name" onChange={this.onChangeEvent}
                                               className="form-control flat-input" placeholder="Name" />
                                        <div className="errorMsg">{this.state.errors.organiser_name}</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col xs={12} md={9}>

                            </Col>
                            <Col xs={12} md={3}>
                                <button className="btn btn-primary">Add</button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export class CreateEvent extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            location: '',
            start_date: new Date(),
            start_time: new Date(),
            end_date: new Date(),
            end_time: new Date(),
            image: '',
            description: '',
            organiser_id: '',
            organiser_description: '',
            category_id: '',
            ticket_type_id: '',
            main_topic_id: '',
            event_type: '',
            selectedOption: 'public',
            status: '',
            ticket_name: '',
            quantity: '',
            price: '',
            ticket_description:'',
            ticket_start_date: new Date(),
            ticket_start_time: new Date(),
            ticket_end_date: new Date(),
            ticket_end_time: new Date(),
            minimum_tickets:'',
            maximum_tickets:'',
            ticket_promoter_program:'',
            promoterOption: 'disable',
            organisersData: [],
            categoriesData: [],
            ticketTypeData: [],
            mainTopics: [],
            fields: {},
            errors: {},
            modalShow: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.handleSuccessResponse = this.handleSuccessResponse.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleDescriptionEditorChange = this.handleDescriptionEditorChange.bind(this);
        this.handleOrganiserDescriptionEditorChange = this.handleOrganiserDescriptionEditorChange.bind(this);
        this.handleTicketDescriptionEditorChange = this.handleTicketDescriptionEditorChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleTicketOptionChange = this.handleTicketOptionChange.bind(this);

        this.handleTicketStartDateChange = this.handleTicketStartDateChange.bind(this);
        this.handleTicketStartTimeChange = this.handleTicketStartTimeChange.bind(this);
        this.handleTicketEndDateChange = this.handleTicketEndDateChange.bind(this);
        this.handleTicketEndTimeChange = this.handleTicketEndTimeChange.bind(this);


    }

    handleSuccessResponse(data) {
        const newOrganisers = this.state.organisersData.filter(
            organisersData => organisersData.id !== data.id
        );
        newOrganisers.push(data);
        this.setState({
            organisersData: newOrganisers
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

    handleDescriptionEditorChange (e) {
        this.setState({
            description: e.target.getContent()
        })
    }

    handleOrganiserDescriptionEditorChange (e) {
        this.setState({
            organiser_description: e.target.getContent()
        })
    }

    handleTicketDescriptionEditorChange (e) {
        this.setState({
            ticket_description: e.target.getContent()
        })
    }


    handleStartDateChange(date) {
        this.setState({
            start_date: date
        })
    }

    handleStartTimeChange(time) {
        this.setState({
            start_time: time
        })
    }

    handleEndDateChange(date) {
        this.setState({
            end_date: date
        })
    }

    handleEndTimeChange(time) {
        this.setState({
            end_time: time
        })
    }


    handleTicketStartDateChange(date) {
        this.setState({
            ticket_start_date: date
        })
    }

    handleTicketStartTimeChange(time) {
        this.setState({
            ticket_start_time: time
        })
    }

    handleTicketEndDateChange(date) {
        this.setState({
            ticket_end_date: date
        })
    }

    handleTicketEndTimeChange(time) {
        this.setState({
            ticket_end_time: time
        })
    }

    handleTicketOptionChange(e) {
        this.setState({
            [e.target.attributes.name.value] : e.target.attributes.value.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {

        axios.get(MyGlobleSetting.url + '/api/organisers')
            .then(response => {
                this.setState({organisersData: response.data.data});
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(MyGlobleSetting.url + '/api/ticketTypes')
            .then(response => {
                this.setState({ticketTypeData: response.data.data});
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
        axios.get(MyGlobleSetting.url + '/api/topics')
            .then(response => {
                this.setState({mainTopics: response.data.data});
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

    handleOptionChange(e) {
        this.setState({
            selectedOption: e.target.value
        });

    }

    handleSubmit(e){

        e.preventDefault();
        if (this.validateForm()) {
            const events = {
                title: this.state.title,
                location: this.state.location,
                start_date: this.state.start_date.toLocaleDateString(),
                start_time: this.state.start_time.toLocaleTimeString(),
                end_date: this.state.end_date.toLocaleDateString(),
                end_time: this.state.end_time.toLocaleTimeString(),
                image: this.state.image,
                description: this.state.description,
                organiser_id: this.state.organiser_id,
                organiser_description: this.state.organiser_description,
                category_id: this.state.category_id,
                main_topic_id: this.state.main_topic_id,
                event_type: this.state.selectedOption,
                status: this.state.status,
                ticket_type_id: this.state.ticket_type_id,
                ticket_name: this.state.ticket_name,
                quantity: this.state.quantity,
                price: this.state.price,
                ticket_description: this.state.ticket_description,
                ticket_start_date: this.state.ticket_start_date.toLocaleDateString(),
                ticket_start_time: this.state.ticket_start_time.toLocaleTimeString(),
                ticket_end_date: this.state.ticket_end_date.toLocaleDateString(),
                ticket_end_time: this.state.ticket_end_time.toLocaleTimeString(),
                minimum_tickets: this.state.minimum_tickets,
                maximum_tickets: this.state.maximum_tickets,
                ticket_promoter_program: this.state.promoterOption,
            }
            //console.log(events);
            let uri = MyGlobleSetting.url + '/api/event';
            axios.post(uri, events).then((response) => {
                browserHistory.push('/');
            });
        }

    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!this.state.title) {
            formIsValid = false;
            errors["title"] = "*Please enter Title.";
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
        if (!this.state.ticket_type_id) {
            formIsValid = false;
            errors["ticket_type_id"] = "*Please select ticket type.";
        }
        if (!this.state.category_id) {
            formIsValid = false;
            errors["category_id"] = "*Please select category.";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    render() {
        const {organisersData} = this.state;
        const {ticketTypeData} = this.state;
        const {categoriesData} = this.state;
        const {mainTopics} = this.state;
        let modalClose = () => this.setState({ modalShow: false });
        return (
         <React.Fragment>
               <NavigationBar />
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <div className="loginApp container">
                <div className="row justify-content-md-center">
                    <div className="col-md-12 col-md-auto createEvent-box">
                        <h4 className="text-left wdi-red">Create an Event</h4>
                        <hr />
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div className="form-1">
                                <div className="col-md-6">
                                    <input type="text" name="title" onChange={this.onChangeEvent}
                                           className="form-control form-control-lg flat-input" placeholder="Event Title" />
                                    <div className="errorMsg">{this.state.errors.title}</div>
                                </div>
                                <div className="col-md-6">
                               <Formik><Field name="tmp" component={LocationField} /></Formik>
                                </div>
                                <div className="form-row col-md-6">
                                    <div className="form-group col-md-3">
                                        <DatePicker
                                            name="start_date"
                                            margin="normal"
                                            label="Start Date"
                                            selected={this.state.start_date}
                                            value={this.state.start_date}
                                            onChange={this.handleStartDateChange}
                                        />
                                        <div className="errorMsg">{this.state.errors.start_date}</div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <TimePicker
                                            name="start_time"
                                            margin="normal"
                                            label="Start Time"
                                            selected={this.state.start_time}
                                            value={this.state.start_time}
                                            onChange={this.handleStartTimeChange}
                                        />
                                        <div className="errorMsg">{this.state.errors.start_time}</div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <DatePicker
                                            name="end_date"
                                            margin="normal"
                                            label="End Date"
                                            selected={this.state.end_date}
                                            value={this.state.end_date}
                                            onChange={this.handleEndDateChange}
                                        />
                                        <div className="errorMsg">{this.state.errors.end_date}</div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <TimePicker
                                            name="end_time"
                                            margin="normal"
                                            label="End Time"
                                            selected={this.state.end_time}
                                            value={this.state.end_time}
                                            onChange={this.handleEndTimeChange}
                                        />
                                        <div className="errorMsg">{this.state.errors.end_time}</div>
                                    </div>
                                </div>
                                <div className="setItem">
                                    <ul>
                                        <li>Type Something</li>
                                        <li>Timezone & date setting</li>
                                    </ul>
                                </div>
                                <div className="custom-file col-md-6 file-upload ">
                                    <div className="image-upload-wrap">
                                        <input className="file-upload-input" type='file' name="image" onChange={this.onChange} />
                                        <div className="drag-text">
                                            <h3>Add Event image</h3>
                                            <span>Choose image or graphics for your event</span>
                                        </div>
                                        {this.state.image ? <img id="target" className="imgFrame" src={this.state.image}/> : ''}
                                        {this.state.image ? '' : <div className="errorMsg">{this.state.errors.image}</div>}
                                        <div className="instruc">
                                            <span>We recommend using at least a 2160 X1080px(2:1 ratio) image that's no larger than 10MB. learn more</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Add Description</label>
                                    <TinyMCE
                                        config={{
                                            plugins: 'autolink link image lists print preview',
                                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                                        }}
                                        name="description"
                                        onChange={this.handleDescriptionEditorChange}
                                    />
                                    <div className="errorMsg">{this.state.errors.description}</div>
                                    <span>need help ?</span>
                                </div>
                                <div className="form-row col-md-6 organiserTab">
                                    <div className="col-md-6">
                                        <label>Organiser Details</label>
                                    </div>
                                    <div className="col-md-3">
                                        <MaterialIcon  icon="edit" size={20}/>
                                        <a href ="#">Edit organiser</a>
                                    </div>
                                    <div className="col-md-3">
                                        <MaterialIcon  icon="add" size={20}/>
                                        <a href="#" onClick={() => this.setState({ modalShow: true })}>Add new </a>
                                    </div>
                                    <div className="col-md-12">
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
                                <div className="form-group col-md-6">
                                    <label>Add Organiser's Description</label>
                                    <TinyMCE
                                        config={{
                                            plugins: 'autolink link image lists print preview',
                                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                                        }}
                                        name="organiser_description"
                                        onChange={this.handleOrganiserDescriptionEditorChange}
                                    />
                                    <div className="errorMsg">{this.state.errors.organiser_description}</div>
                                </div>
                                <div className="form-row col-md-6 ticketTab">
                                    <div className="col-md-6">
                                        <label>Ticket Type :</label>
                                    </div>
                                    <div className="col-md-12">
                                        <select
                                            className="form-control"
                                            name="ticket_type_id"
                                            value={this.state.ticket_type_id}
                                            onChange={this.onChangeEvent}>
                                            <option value="">Select Ticket Type</option>
                                            {ticketTypeData.map(obj => (
                                                <option key={obj.id} value={obj.id}>{obj.name}</option>
                                            ))}
                                        </select>
                                        <div className="errorMsg">{this.state.errors.ticket_type_id}</div>
                                    </div>
                                </div>
                                <div className="form-group col-md-12 addtx">
                                    <h4>Ticket Information</h4>
                                    <div className="form-row TicketDetails">
                                        <div className="col-md-4">
                                            <label>Ticket Name</label>
                                            <input type="text" name="ticket_name" onChange={this.onChangeEvent}
                                                   className="form-control form-control-lg flat-input" placeholder="Name" />
                                        </div>
                                        <div className="col-md-3">
                                            <label>Ticket Quantity</label>
                                            <input type="text" name="quantity" onChange={this.onChangeEvent}
                                                   className="form-control form-control-lg flat-input" placeholder="Quantity" />
                                        </div>
                                        <div className="col-md-3">
                                            <label>Price</label>
                                            <input type="text" name="price" onChange={this.onChangeEvent}
                                                   className="form-control form-control-lg flat-input" placeholder="Price" />
                                        </div>
                                        <div className="col-md-2 actionTab">
                                            <MaterialIcon icon="edit" size={30} />
                                            <MaterialIcon  icon="delete" size={30}/>
                                        </div>
                                        <div className="settingTab">
                                            <h4>Ticket Settings</h4>
                                            <div className="form-group">
                                                <label>Ticket Description</label>
                                                <TinyMCE
                                                    config={{
                                                        plugins: 'autolink link image lists print preview',
                                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                                                    }}
                                                    name="ticket_description"
                                                    onChange={this.handleTicketDescriptionEditorChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <div className="form-row col-md-12">
                                                    <div className="form-col col-md-6">
                                                        <DatePicker
                                                            name="ticket_start_date"
                                                            margin="normal"
                                                            label="Start Date"
                                                            selected={this.state.ticket_start_date}
                                                            value={this.state.ticket_start_date}
                                                            onChange={this.handleTicketStartDateChange}
                                                        />
                                                    </div>
                                                    <div className="form-col col-md-6">
                                                        <TimePicker
                                                            name="ticket_start_time"
                                                            margin="normal"
                                                            label="Start Time"
                                                            selected={this.state.ticket_start_time}
                                                            value={this.state.ticket_start_time}
                                                            onChange={this.handleTicketStartTimeChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-row col-md-12">
                                                    <div className="form-col col-md-6">
                                                        <DatePicker
                                                            name="ticket_end_date"
                                                            margin="normal"
                                                            label="End Date"
                                                            selected={this.state.ticket_end_date}
                                                            value={this.state.ticket_end_date}
                                                            onChange={this.handleTicketEndDateChange}
                                                        />
                                                    </div>
                                                    <div className="form-col col-md-6">
                                                        <TimePicker
                                                            name="ticket_end_time"
                                                            margin="normal"
                                                            label="End Time"
                                                            selected={this.state.ticket_end_time}
                                                            value={this.state.ticket_end_time}
                                                            onChange={this.handleTicketEndTimeChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <h5>Tickets allowed per order</h5>
                                                <div className="form-row col-md-12">
                                                    <div className="form-col col-md-4">
                                                        <input type="text" name="minimum_tickets" onChange={this.onChangeEvent}
                                                               className="form-control form-control-lg flat-input" placeholder="Minimum" />
                                                    </div>
                                                    <div className="form-col col-md-4">
                                                        <input type="text" name="maximum_tickets" onChange={this.onChangeEvent}
                                                               className="form-control form-control-lg flat-input" placeholder="Maximum" />
                                                    </div>
                                                    <div className="form-col col-md-4">
                                                        <MaterialIcon icon="add_circle" size={30} /><span>Add a group ticket</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <h5>Tickets Promoter Program</h5>
                                                <div className="btn-group " data-toggle="">
                                                    <label className={this.state.promoterOption === 'enable' ? 'btn btn-secondary active' : 'btn btn-secondary'}
                                                           name="promoterOption"
                                                           value="enable"
                                                           onClick={this.handleTicketOptionChange}
                                                    >
                                                        Enable
                                                    </label>
                                                    <label className={this.state.promoterOption === 'disable' ? 'btn btn-secondary active' : 'btn btn-secondary'}
                                                           name="promoterOption"
                                                           value="disable"
                                                           onClick={this.handleTicketOptionChange}>
                                                        Disable
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="addMore">
                                            <MaterialIcon icon="add_circle" size={30} /><span>Add More</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <h3> Additional Settings </h3>
                                    <div className="form-row col-md-6 mainTopicTab">
                                        <div className="col-md-12">
                                            <select
                                                className="form-control"
                                                name="main_topic_id"
                                                value={this.state.main_topic_id}
                                                onChange={this.onChangeEvent}>
                                                <option value="">Select Main Topic</option>
                                                {mainTopics.map(obj => (
                                                    <option key={obj.id} value={obj.id}>{obj.name}</option>
                                                ))}
                                            </select>
                                            <div className="errorMsg">{this.state.errors.main_topic_id}</div>
                                        </div>
                                    </div>
                                    <div className="form-row col-md-6 categoryTab">
                                        <div className="col-md-12">
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
                                    <div className="form-row col-md-10">
                                        <div className="form-group col-md-3">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="event_type"
                                                    value="public"
                                                    checked={this.state.selectedOption === 'public'}
                                                    onChange={this.handleOptionChange}
                                                />
                                                 Make Event Public
                                            </label>
                                            <div className="errorMsg">{this.state.errors.event_type}</div>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="event_type"
                                                    value="private"
                                                    onChange={this.handleOptionChange}
                                                />
                                                 Make Event Private
                                            </label>
                                            <div className="errorMsg">{this.state.errors.event_type}</div>
                                        </div>
                                    </div>
                                    <div className="form-row col-md-12">
                                        <div className="col-md-8">
                                            <h4>Well done ! Your Event will go Live</h4>
                                        </div>
                                        <div className="col-md-4">
                                            <button type="submit" className="btn btn-save" name="status" value="1" onClick={this.onChangeStatus}>Save</button>
                                            <button type="submit" className="btn btn-goLive" name="status" value="2" onClick={this.onChangeStatus} >Go Live</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
             </MuiPickersUtilsProvider>
             <OrganiserModal
                 show={this.state.modalShow}
                 action={this.handleSuccessResponse}
                 onHide={modalClose}/>
             <FooterMenu />
         </React.Fragment>
        )
    }
}

export default CreateEvent