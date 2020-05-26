import React from 'react';
import CategoriesForm from './Form';

import {connect} from 'react-redux'

import {starAddCategory} from '../../actions/categories'

class CategoriesNew extends React.Component{
    
    handleSubmit = (name) => {
        this.props.dispatch(starAddCategory(name, this.props))
    }

    render(){
        return(
            <div><br/>
                <h2>Category Form</h2><br/>
                <CategoriesForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default connect()(CategoriesNew)