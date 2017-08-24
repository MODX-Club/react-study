'use strict';

// import React    from 'react';
// import ReactDOMServer from 'react-dom/server';

var Model = require('objection').Model;
 
import Response from './components/response';

 

import {db as db_config} from '../../config/config'; 

var knex = require('knex')(db_config);


 
let styles = {};

module.exports = function (options) {



  var options = options || {};

  var express = require('express');
  var router = express.Router();

  var debug = require('debug')("server:router/main");

  var querystring = require('querystring');

  var mime = require('mime-types');
  var path = require('path');

  var http = require('http');

  var fs = require('fs');

  /*
  * Надстройка WebSocket для роутера
  * */
  // var expressWs = require('express-ws')(options.app);
  require('express-ws')(options.app);

  var host = options.host;
  let raw_host_port = options.raw_host_port;
  ;


  debug("Server started");


  var cfg = {
    hot_reload_debug: options.hot_reload_debug,
    hot_reload_port: options.hot_reload_port,
    ssl: false,
  };

  // var host = options.host;

  var httpServ = (cfg.ssl) ? require('https') : require('http');

  /*
  * API
  * */
  //


  function SendMessage(client, message, original_message){
    if(client && client.readyState == client.OPEN){

      // console.log(client);

      if(typeof message !== "object"){
        message = {
          text: "message"
        };
      }

      if(!message.ts){
        message.ts = new Date().getTime();
      }

      delete message.cookie;
      delete message.password;

      if(original_message){

        delete original_message.cookie;
        delete original_message.password;

        message.original_message = original_message;
      }

      client.send(JSON.stringify(message));
    }

  }
 


  function SendMessageToAll(ws, message, original_message, exclude_current){

    delete message.cookie;
    delete message.password;

    if(original_message){
      delete original_message.cookie;
      delete original_message.password;
    }

    for(var i in clients){

      var client = clients[i];

      if(exclude_current && client == ws){
        continue;
      }

      SendMessage(client, message, original_message);
    }
  }


  function success(req, res, response, knex){
    

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
  }

  function failure(req, res, response){


    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
  }


  function processResponse(req, res, response){
    if(response.success){
      return success(req, res, response);
    }
    else{
      return failure(req, res, response);
    }
  }
 

  router.post('/react-lessons/api/', function(req, res) {

    // debug("Server. Request Requested");
    // console.log("Server. Request Requested", req.query);
    // console.log("Server. Request body", req.body);

    var body = "";

    let request = {};

    req.on('data', chunk => {
      // console.log('got data chunk', chunk);
      body += chunk;
    });

    req.on('end', () => {
    
      // var preg = 'Content-Disposition: form-data; name="(.+?)"(.*?)------WebKitFormBoundary';
      // var preg = 'Content-Disposition: form-data; name="(.+?)"([\s\S]+?)-------';
      var preg = 'name="(.+?)"([\s\S]+?)------';

      // var match = body.match(new RegExp(preg, 'mgu'));
      // var match = new RegExp(preg, 'gu').exec(body);
      var match = body.match(/Content-Disposition: form-data; name="(.+?)"([\s\S]+?)------/g)

      if(match && match.length){
        match.map(str => {
          // let result = str.match(new RegExp(preg, 'mu'));

          // let result = str.match(/Content-Disposition: form-data; name="(.+?)"((\s*)(\S*)(\s*)?)------/);
          let result = str.match(/Content-Disposition: form-data; name="(.+?)"[\s]*(.*)/);

          // console.log('result', result);

          if(result){
            let {
              1: name,
              2: value,
            } = result;

            // value = value.replace(//);

            request[name] = value;
          }
        });
      }
 

      let response = new Response(req, res, request, knex);

      return response.process();
    });

 
  });
 

  /*
   * Static
   * */
   

  return router;
}
