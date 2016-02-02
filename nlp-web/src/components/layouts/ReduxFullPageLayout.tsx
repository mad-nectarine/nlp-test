import * as React from 'react';
import * as ReactDom from 'react-dom/server';
import { devTools, persistState } from 'redux-devtools';
import { ReduxProviderLayout } from './ReduxProviderLayout';

export interface ReduxFullPageLayoutProps {
	title: string,
	pageName: string,
	store: any,
	children?,
	isDevelopment? : boolean
}

export class ReduxFullPageLayout extends React.Component<ReduxFullPageLayoutProps, any>
{
	render() {
		//create contents html
		let contents = (
			<ReduxProviderLayout store={this.props.store} hasDevTool={this.props.isDevelopment} >
				{this.props.children}
				</ReduxProviderLayout>);
		let html = ReactDom.renderToString(contents);
		
		//create initial state
		let initialState = this.props.store.getState();
		let stateJson = JSON.stringify(initialState);
		
		//script src
		let extensions = this.props.isDevelopment ? ".debug.js" : ".min.js";
		let scriptSrc =  "/scripts/apps/" + this.props.pageName.toLowerCase() + extensions;
		        
		//create full page elemements
		return (
		<html>
			<head>
				<title>{this.props.title}</title>
				<link rel="stylesheet" href="/stylesheets/style.css" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
				</head>
			<body>
				<div id="root" dangerouslySetInnerHTML={{ __html: html }} data-initialstate={stateJson} data-dev={this.props.isDevelopment}></div>
				<script type="text/javascript" src={scriptSrc} />
				</body>
			</html>);
	}
}

export default { ReduxFullPageLayout }