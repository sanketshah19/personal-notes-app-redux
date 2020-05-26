import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Row, Col, Table} from 'react-bootstrap';

import {connect} from 'react-redux'

import {startGetCategories, startRemoveCategory} from '../../actions/categories'

class CategoriesList extends React.Component{

    componentDidMount(){
        this.props.dispatch(startGetCategories())
    }

    handleRemove = (id) => {
        this.props.dispatch(startRemoveCategory(id))
    }
    
    render(){
        return(
            <div><br/>
                <h2>Listing Category - {this.props.categories.length} <Link to="/categories/new"><Button>Add Category</Button></Link></h2><hr/>

                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>

                        <Table striped bordered hover className="text-center">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Category</th>
                                <th>Show</th>
                                <th>Edit</th>
                                <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.categories.map((category, i) => {
                                        return(
                                            <tr key={category._id}>
                                                <td>{i+1}</td>
                                                <td>{category.name}</td>
                                                <td><Link to={`/categories/${category._id}`}><Button variant="outline-secondary">Show</Button></Link></td>
                                                <td><Link to={`/categories/edit/${category._id}`}><Button variant="outline-success">Edit</Button></Link></td>
                                                <td><Button variant="outline-danger" onClick={() => this.handleRemove(category._id)}>Remove</Button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(CategoriesList)