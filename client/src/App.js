import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

import PrivateRoute from './components/privateRoute/PrivateRoute'

import Home from '../src/components/common/Home';
import Register from '../src/components/users/Register';
import Login from '../src/components/users/Login';

import NotesList from '../src/components/notes/List'
import NotesShow from '../src/components/notes/Show'
import NotesNew from '../src/components/notes/New'
import NotesEdit from '../src/components/notes/Edit'
import NotesCopy from '../src/components/notes/Copy'

import CategoriesList from '../src/components/categories/List'
import CategoriesShow from '../src/components/categories/Show'
import CategoriesNew from '../src/components/categories/New'
import CategoriesEdit from '../src/components/categories/Edit'

import {connect} from 'react-redux'

import {startLogoutUser} from './actions/user'

function App(props) {
  function handleClick(){
    props.dispatch(startLogoutUser())
  }
  return (
    <div className="container-fluid">
      <BrowserRouter>
      {
          localStorage.getItem('authToken') ? 
          (
              <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="/">
                    {'Notes App'}
                  </Navbar.Brand>
                  <Nav className="mr-auto">
                    <Link to="/"><Nav.Link href="/">Home</Nav.Link></Link>
                    <Link to="/notes"> <Nav.Link href="/notes">Notes</Nav.Link></Link>
                    <Link to="/categories"> <Nav.Link href="/categories">Categories</Nav.Link></Link>
                    <Link to="#" onClick={handleClick}><Nav.Link href="#">Logout</Nav.Link></Link>
                  </Nav>
              </Navbar>
          )
          :
          (
              <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="/">
                    {'Notes App'}
                  </Navbar.Brand>
                  <Nav className="mr-auto">
                    <Link to="/"><Nav.Link href="/">Home</Nav.Link></Link>
                    <Link to="/users/register"> <Nav.Link href="/users/register">Register</Nav.Link></Link>
                    <Link to="/users/login"><Nav.Link href="/users/login">Login</Nav.Link></Link>
                  </Nav>
              </Navbar>
          )
        }

      <Switch>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/users/register" component={Register} />
        <Route path="/users/login" component={Login} />

        <PrivateRoute path="/notes" component={NotesList} exact={true}/>
        <PrivateRoute path="/notes/new" component={NotesNew} />
        <PrivateRoute path="/notes/edit/:id" component={NotesEdit} />
        <PrivateRoute path="/notes/copy/:id" component={NotesCopy} />
        <PrivateRoute path="/notes/:id" component={NotesShow} />

        <PrivateRoute path="/categories" component={CategoriesList} exact={true} />
        <PrivateRoute path="/categories/new" component={CategoriesNew} />
        <PrivateRoute path="/categories/edit/:id" component={CategoriesEdit} />
        <PrivateRoute path="/categories/:id" component={CategoriesShow} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)