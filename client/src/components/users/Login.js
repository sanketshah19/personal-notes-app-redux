import React from 'react';
import {Form, Col, Button, Row} from 'react-bootstrap';

import {connect} from 'react-redux'

import {startLoginUser} from '../../actions/user'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
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
            email: this.state.email,
            password: this.state.password
        }
        this.props.dispatch(startLoginUser(formData, this.props))
    }

    render(){
        return(
            <div>
                <br/>
                <h2>Login Form</h2><br/>
                <Form onSubmit={this.handleSubmit}>
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
                </Form>
            </div>
        )
    }
}

export default connect()(Login)