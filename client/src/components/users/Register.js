import React from 'react';
import {Form, Col, Button, Row} from 'react-bootstrap';

import {connect} from 'react-redux'

import {startRegisterUser} from '../../actions/user'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        this.props.dispatch(startRegisterUser(formData, this.props))
    }

    render(){
        return(
            <div>
                <br/>
                <h2>Registration Form</h2><br/>
                <form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Username:</Form.Label>
                        <Col sm="10">
                            <input type="text" value={this.state.username} onChange={this.handleChange} name="username"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Email:</Form.Label>
                        <Col sm="10">
                            <input type="text" value={this.state.email} onChange={this.handleChange} name="email"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Password:</Form.Label>
                        <Col sm="10">
                            <input type="password" value={this.state.password} onChange={this.handleChange} name="password"/>
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}

export default connect()(Register)