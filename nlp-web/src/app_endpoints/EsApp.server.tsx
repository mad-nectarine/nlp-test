import * as React from 'react';
import  { ReduxFullPageLayout } from '../components/layouts/ReduxFullPageLayout'
import * as App from '../apps/EsApp'

export interface EsAppProps {
	title: string,
	store: any,
	isDevelopment: boolean
}

export class EsApp extends React.Component<EsAppProps, any>
{	
	render() { 
		return (
		<ReduxFullPageLayout
			title={this.props.title}
			pageName="esapp"
			store={this.props.store}
			isDevelopment={this.props.isDevelopment}>
			<App.EsApp title={this.props.title} />
			</ReduxFullPageLayout>);
            
	}
}

export default { EsApp }