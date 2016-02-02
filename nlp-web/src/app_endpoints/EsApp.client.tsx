require('babel-polyfill')
import * as React from 'react'
import * as ReactDom from 'react-dom'
import { ReduxProviderLayout } from '../components/layouts/ReduxProviderLayout';
import * as App from '../apps/EsApp' 

//get node and parameter
let rootElement = document.getElementById("root");
let initialState = JSON.parse(rootElement.getAttribute("data-initialstate"));
let isDevelopment = rootElement.getAttribute("data-dev") == "true";
	 
//create store
let store = App.CreateClientStore(initialState,isDevelopment);

//render contents
let contents = (
	<ReduxProviderLayout store={store} hasDevTool={isDevelopment} >
		<App.EsApp title={document.title} />
		</ReduxProviderLayout>);
ReactDom.render(contents,rootElement);