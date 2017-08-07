import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 



export default class MainPage extends Page{

	static contextTypes = {
	};

	constructor(props){

		super(props);

		Object.assign(this.state, {
		});
	}
 

 	render(){

 		return <div>Main page</div>
	}
}

