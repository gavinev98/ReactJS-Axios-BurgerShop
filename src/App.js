import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';


import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {


  componentDidMount() {
    //try run auto login method.
    this.props.onTryAutoLogin();

  }

  render() {
    let routes = (
      <Switch>
      <Route path="/auth" exact component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" exact component={Orders} />
        <Route path='/logout' exact component={Logout} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      );
    }


  return (
      <div>
        <Layout>
        {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {

    return {
        isAuthenticated: state.auth.token !== null
    }


}


//setting up redux mapDispatchToProps method.
const mapDispatchToProps = dispatch => {
    return {
      onTryAutoLogin: () => dispatch(actions.authCheckState())
    }


}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
