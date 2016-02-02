// == import installed modules ==
import * as React from 'react'
import { bindActionCreators } from 'redux';
var { ReduxRouter, reduxReactRouter, pushState} = require('redux-router')
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
// == import application modules ==
import { DefaultLayout } from '../components/layouts/DefaultLayout'
import { EsAppContainer } from '../components/views/EsAppContainer'
import { UrlUnMatch }  from '../components/views/UrlUnMatch'
import * as StoreFactory from '../util/StoreFactory'
import * as ActionStateConnector from '../util/ActionStateConnector'
//Search
import { EsSearch } from '../components/views/EsSearch'
import * as EsSearchActions from '../actions/EsSearchActions'
import EsSearchReducer from '../reducers/EsSearchReducer'
//State
import { EsState } from '../components/views/EsState'
import * as EsStateActions from '../actions/EsStateActions'
import EsStateReducer from '../reducers/EsStateReducer'
//Conf
import { EsConf } from '../components/views/EsConf'
import * as EsConfActions from '../actions/EsConfActions'
import EsConfReducer from '../reducers/EsConfReducer'
//Log
import { EsLog } from '../components/views/EsLog'
import * as EsLogActions from '../actions/EsLogActions'
import EsLogReducer from '../reducers/EsLogReducer'


//====== bind state and action to components props ======
var components = {
    
    /* bind AppContainer */
    AppContainer: connect(
        (state) => {
            return {}
        },
        (dispatch) => {
            return bindActionCreators({ pushState }, dispatch)
        }
    )(EsAppContainer),
    
    /* bind EsSearch */
    EsSearch: connect(
        (state) => {
            return {
                items: state.es_search.items,
                message: state.es_search.message,
                input: state.es_search.inputData
            }
        },
        (dispatch) => {
            //merge actions
            let actions = {
                pushState //"pushState" is a function,so you must set as a property.  
            }
            Object.assign(actions, EsSearchActions)
            //you can merge more actions
            //Object.assign(actions, hogeActionCreator, fugaActionCreator);
    
            //bind actions to dispatcher 
            return bindActionCreators(actions, dispatch)
        })(EsSearch),
    
    /* bind EsState */
    EsState: connect(
        (state) => {
            return {
                count: state.es_state.count,
                createAtInfo: state.es_state.createAtInfo,
                idInfo: state.es_state.idInfo,
                message: state.es_state.message,
                input: state.es_state.inputData
            }
        },
        (dispatch) => {
            let actions = { pushState }
            Object.assign(actions, EsStateActions)
            return bindActionCreators(actions, dispatch)
        })(EsState),
        
    /* bind EsConf */
    EsConf: connect(
        (state) => {
            return {
                items: state.es_conf.items,
                message: state.es_conf.message,
                input: state.es_conf.inputData
            }
        },
        (dispatch) => {
            let actions = { pushState }
            Object.assign(actions, EsConfActions) 
            return bindActionCreators(actions, dispatch)
        })(EsConf),
    /* bind EsLog */
    EsLog: connect(
        (state) => {
            return {
                log: state.es_log.log,
            }
        },
        (dispatch) => {
            let actions = { pushState }
            Object.assign(actions, EsLogActions) 
            return bindActionCreators(actions, dispatch)
        })(EsLog),
}
//====== connect action and state ======
EsSearchActions.StateConnector.connect("es_search")
EsStateActions.StateConnector.connect("es_state")
EsConfActions.StateConnector.connect("es_conf")
EsLogActions.StateConnector.connect("es_log")

//====== create store functions ======
export function CreateServerStore(initialState: any, isDevelopment: boolean) {
    var reducer = {
        es_search: EsSearchReducer,
        es_state: EsStateReducer,
        es_conf: EsConfReducer,
        es_log: EsLogReducer,
    };
    //create store
    let store = StoreFactory.RouterAppServerDefault(getRoutes(), reducer, initialState, isDevelopment);
    return store;
}
export function CreateClientStore(initialState: any, isDevelopment: boolean) {
    var reducer = {
        es_search: EsSearchReducer,
        es_state: EsStateReducer,
        es_conf: EsConfReducer,
        es_log: EsLogReducer,
    };
    //create store
    let store = StoreFactory.RouterAppClientDefault(reducer, initialState, isDevelopment);
    return store;
}

//====== app component ======
export function getRoutes() {
    return (
        <Route path="es/view" component={components.AppContainer} >
            <Route path="search" component={components.EsSearch} />
            <Route path="state" component={components.EsState} />
            <Route path="conf" component={components.EsConf} />
            <Route path="log" component={components.EsLog} />
            { /* Catch all route */ }
            <Route path="*" component={UrlUnMatch} status={404} />
            </Route>
    )
}
export class EsApp extends React.Component<any, any> {
    render() {
        return (
            <DefaultLayout title={this.props.title} rootPath="/es/view/">
            <ReduxRouter>
                    {getRoutes() }
                </ReduxRouter>
                </DefaultLayout>
        )
    }
}
