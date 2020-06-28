import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}