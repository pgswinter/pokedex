import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Route } from "react-router-dom";
import {
  Switch,
} from "react-router-dom";

import routerConfig from "./configs/router";


import {
  HomePageLoader
} from './loadable';

import './style/style.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/fontawesome/css/all.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount = () => {

  }

  render = () => {
    return (
      <div className="wrap">
        <div className="body-wrap">
          <Switch>
            <Route
              path={routerConfig["home"]}
              exact
              render={props => <HomePageLoader
                {...props}
              />}
            />
          </Switch>
        </div>
      </div>
    );
  };
}

App.propTypes = {

};

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
