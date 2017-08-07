import React, {Component} from 'react';

import PropTypes from 'prop-types';

const defaultProps = {}

export default class Page extends Component{

	constructor(props){

		super(props);

		this.state = {}
	}

	componentWillMount(){

	}

	componentDidMount(){

		this.setPagetitle();
	}

  componentDidUpdate(){

    if(this.props.debug){
      console.log("Page componentDidUpdate", this);
    }
  }

	render(){

		return null;
	}
}

Page.defaultProps = defaultProps;

Page.propTypes = {
}
