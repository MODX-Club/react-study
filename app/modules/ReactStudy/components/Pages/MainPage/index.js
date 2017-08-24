import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link} from 'react-router';

export default class MainPage extends Page{


	constructor(props){

		super(props);

		Object.assign(this.state, {
		});
	}
 

 	render(){

 		return <div>
 			<ul>
 				<li>
 					<Link
 						to="/react-lessons/lesson1"
 						href="/lesson1"
 					>
 						Урок 1. Snackbar
 					</Link>
 				</li>
 				<li>
 					<Link
 						to="/react-lessons/lesson2"
 						href="/lesson2"
 					>
 						Урок 2. GraphQL
 					</Link>
 				</li>
 			</ul>
 		</div>
	}
}

