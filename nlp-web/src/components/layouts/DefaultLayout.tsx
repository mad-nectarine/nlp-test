import * as React from 'react';

export interface DefaultLayoutProps {
	title?: string,
    rootPath? :string
	children? : React.ReactNode,
}

export class DefaultLayout extends React.Component<DefaultLayoutProps, any>
{
	render() {
		return (
		<div>
			<header>
				<a href={this.props.rootPath ? this.props.rootPath : "../" } className="title">{this.props.title}</a>
				</header>
			<div id="content">
				{this.props.children}
				</div>
			</div>
		);
	}
}
export default { DefaultLayout }