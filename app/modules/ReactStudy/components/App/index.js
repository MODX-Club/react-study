

import './styles/styles.less';

import React, {Component} from "react";

import PropTypes from 'prop-types';

export default class MainApp extends Component {


  constructor(props){

    super(props);

    let state = {
    };

    this.state = state;
  }


  render() {

    let {
      children,
      ...other
    } = this.props;

    return <div
      id="MainApp"
    >
      {children}
    </div>

  }
}

MainApp.propTypes = {
}

MainApp.defaultProps = {
}