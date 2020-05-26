import React from 'react';
import axios from '../../config/axios';
import swal from 'sweetalert';
import CategoriesForm from './Form';

import {connect} from 'react-redux'

import {startSingleCategory} from '../../actions/categories'

class CategoriesEdit extends React.Component{
    constructor(){
        super()
        this.state = {
            name: ''
        }
    }

    componentDidMount(){
        // console.log(this.props.match.params.id)
        const id = this.props.match.params.id
        this.props.dispatch(startSingleCategory(id))
    }

    handleSubmit = (name) => {
        // console.log(name)
        const id = this.props.match.params.id
        axios.put(`/categories/${id}`, {name}, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                // alert(response.data.message)
                swal("Oops!", `${response.data.message}`, "error");
            }else{
                this.props.history.push('/categories')
                swal("Success!", "Category Information Updated!", "success");
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <div><br/>
                <h2>Update Information</h2><br/>
                { this.props.singleCategory.length > 1 && <CategoriesForm name={this.props.singleCategory} handleSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        singleCategory: state.singleCategory
    }
}

export default connect(mapStateToProps)(CategoriesEdit)