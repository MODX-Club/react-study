

import './styles/styles.less';

import React, {Component} from "react";

import PropTypes from 'prop-types';

import Lesson1 from '../lessons/lesson1/';

export default class MainApp extends Component {


  constructor(props){

    super(props);

    let state = {
    };

    this.state = state;
  }


  render() {

    let {
      ...other
    } = this.props;

    return <div>
      <Lesson1 
      />
    </div>

  }
}

MainApp.propTypes = {
}

MainApp.defaultProps = {
}