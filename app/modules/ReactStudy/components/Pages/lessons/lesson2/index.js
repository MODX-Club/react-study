import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../../layout'; 

import GraphiQL from 'graphiql';

// import { graphql, buildSchema } from 'graphql';

// console.log('GraphiQL', GraphiQL, graphql, buildSchema);
// console.log('resolve', resolve);

import {
	buildSchema,
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import 'graphiql/graphiql.css';

export default class PageGraphiQL extends Page{
 

	constructor(props){

		super(props);

		Object.assign(this.state, {
		});
	}

 	graphQLFetcher(graphQLParams) {
 
 		console.log('graphQLParams', graphQLParams);

 		var body = new FormData();
  

	  for(var i in graphQLParams){

	    var value = graphQLParams[i];

	    if(value === null || value === undefined){
	      continue;
	    }

	    body.append(i, JSON.stringify(value));
	    // body.append(i, value);
	  };

	  return fetch('/react-lessons/api/?pub_action=graphql', {
	    method: 'post',
	    headers: { 'Content-Type': 'application/json' },
	    // body: JSON.stringify(graphQLParams),
	    // body: JSON.stringify(body),
	    body: body,
	  }).then(response => response.json());
	}

	getContent(){
 

		const DocumentType = new GraphQLObjectType({
      name: 'DocumentType',
      fields: {
        id: {
          type: GraphQLInt
        },
        pagetitle: {
          type: GraphQLString
        },
        longtitle: {
          type: GraphQLString
        },
        uri: {
          type: GraphQLString
        }, 
      }
    });

    const UserType = new GraphQLObjectType({
      name: 'UserType',
      fields: {
        id: {
          type: GraphQLInt
        },
        username: {
          type: GraphQLString
        },
        fullname: {
          type: GraphQLString
        },
        resources: {
          type: new GraphQLList(DocumentType), 
        }
      }
    });


    const RootType = new GraphQLObjectType({
      name: 'RootType',
      fields: {
        users: {
          type: new GraphQLList(UserType),
          resolve: () => {
            return this.usersResolver();
          },
        },
        resources: {
          type: new GraphQLList(DocumentType),
          resolve: () => {
            return this.resourcesResolver();
          },
        },
        resource: {
          type: DocumentType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLID)
            }
          } 
        }
      }
    });
		
		var schema = new GraphQLSchema({
		  query: RootType
		});

		return <GraphiQL
			schema={schema}
			defaultQuery="query{
			  users {
			    id
			    username
			    fullname
			  }
			}"
			fetcher={::this.graphQLFetcher} 
		/>;
	}
}

