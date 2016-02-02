import * as React from 'react';

export interface PlainFullPageLayoutProps {
	title: string,
	children? : React.ReactNode,
}

export class PlainFullPageLayout extends React.Component<PlainFullPageLayoutProps, any>
{
	render() {
		return (
		<html>
			<head>
				<title>{this.props.title}</title>
				<link rel="stylesheet" href="/stylesheets/style.css" />
				</head>
			<body>
				<div id="root" >
					{this.props.children}
					</div>
				</body>
			</html>);
	}
}

export default { PlainFullPageLayout }