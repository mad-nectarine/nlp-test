import * as React from 'react';
import { PlainFullPageLayout } from '../components/layouts/PlainFullPageLayout'
import { DefaultLayout } from '../components/layouts/DefaultLayout'


export interface ErrorProps {
	title: string,
	message: string,
	error: any
}

export default class Error extends React.Component<ErrorProps, any>
{
	render() {
        
        
        var arr = new Array<string>()
        arr.concat(["1","2"])
        var xx = arr.map(x => { x })
        xx.forEach(x => {
            arr.push("test")
        })
        
		return (
			<PlainFullPageLayout title={this.props.title}>
			<DefaultLayout title={this.props.message}>
                <h2>{this.props.error.status}</h2>
                <pre>{this.props.error.stack}</pre>
				</DefaultLayout>
				</PlainFullPageLayout>);
	}
}

module.exports = Error;