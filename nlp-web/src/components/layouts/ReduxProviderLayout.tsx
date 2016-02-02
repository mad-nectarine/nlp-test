import * as React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { DebugPanel, DevTools, LogMonitor } from 'redux-devtools/lib/react';

export interface ReduxProviderLayoutProps {
    hasDevTool: boolean,
    store: any,
    children?: React.ReactNode
}

export class ReduxProviderLayout extends React.Component<ReduxProviderLayoutProps, any>
{
    render() {
        let debug = null;
        if (this.props.hasDevTool) {
            debug = (
                <DebugPanel top right bottom>
                    <DevTools store={this.props.store} monitor={LogMonitor} />
                    </DebugPanel>);
        }
        return (
            <div>
                <Provider store={this.props.store}>
                    {this.props.children}
                    </Provider>
                {debug}
                </div>);
    }
}

export default { ReduxProviderLayout }