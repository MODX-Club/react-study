import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import {Link} from 'react-router';

const defaultProps = {}

export default class Page extends Component{

	static contextTypes = {
	};

	constructor(props){

		super(props);

		this.state = {}
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

  componentDidUpdate(){

    if(this.props.debug){
      console.log("Page componentDidUpdate", this);
    }
  }

  getContent(){
  	return null;
  }

	render(){

		let content = this.getContent();

		return <Grid
			item
			xs={12}
			style={{
				height: '100%',
		    display: 'flex',
		    flexDirection: "column",
			}}
		>
			<div
			>

				<ul
					className="react-lessons--main-menu"
				>
					<li>
						<a href="https://modxclub.ru/">MODX-Клуб</a>
					</li>
					<li>
						<Link
							to="/react-lessons/"
							href="/react-lessons/"
						>
							Уроки React-JS
						</Link>
					</li>
				</ul>


			</div>
			<div
				style={{
					// flexGrow: 1,
			    display: 'flex',
			    flexDirection: 'column',
			    flexBasis: '100%',
				}}
			>
				{content}
			</div>
		</Grid>;
	}
}

Page.defaultProps = defaultProps;

Page.propTypes = {
}
