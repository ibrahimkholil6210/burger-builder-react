import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './container/Auth/Logout/Logout';
const Auth = React.lazy(() => import('./container/Auth/Auth'));
const Orders = React.lazy(() => import('./container/Orders/Orders'));
const Checkout = React.lazy(() => import('./container/Checkout/Checkout'));

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth"
          render={
            () => <Suspense fallback={<div>Loading...</div>}><Auth /></Suspense>}
        />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>

    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/checkout"
            render={
              (props) => <Suspense fallback={<div>Loading...</div>}><Checkout {...props} /></Suspense>}
          />
          <Route path="/orders"
            render={
              () => <Suspense fallback={<div>Loading...</div>}><Orders /></Suspense>}
          />
          <Route path="/auth"
            render={
              () => <Suspense fallback={<div>Loading...</div>}><Auth /></Suspense>}
          />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      )
    }
    return (
      <div className="App">
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

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
