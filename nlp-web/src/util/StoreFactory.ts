import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
var thunk = require('redux-thunk')
import { devTools, persistState } from 'redux-devtools'
import * as history from 'history'
var { routerStateReducer, reduxReactRouter } = require('redux-router')
var ReduxRouterServer = require('redux-router/server')

export function RouterAppServerDefault(routes: any, reducers: any, initialState: any, hasDevTool: boolean) {
	//** initial state **
	//initial state must not be "undefined"
	//if it is, exception is thrown
	initialState = initialState || {};
	
	//** merge reducers **
	//you must add reducer for redux-router
	let reducer = {
		router: routerStateReducer
	}
	Object.assign(reducer, reducers)
	let mergedReducer = combineReducers(reducer)
	
	//** set components **
	let finalCreateStore;
	//#1
	if (hasDevTool) {
		finalCreateStore = devTools()(createStore)
	}
	else{
		finalCreateStore = createStore
	}
	//#2
	// finalCreateStore = applyMiddleware(thunk)(createStore)
	// if (hasDevTool) {
	// 	finalCreateStore = devTools()(finalCreateStore)
	// }
	//#3
	// let components = [ applyMiddleware(thunk) ]
	// if (hasDevTool) {
	// 	components = components.concat([
	// 		devTools()
	// 	])
	// }
	//finalCreateStore = compose(...components)(createStore)
	
	//** for redux-router / on server **
	//1. must use reduxReactRouter for server
	//2. routes is required -- ex: function getRoutes() { return (<Route path="/" component="hoge">....) }
	finalCreateStore = ReduxRouterServer.reduxReactRouter({ routes, createHistory: history.createMemoryHistory })(finalCreateStore)

	return finalCreateStore(mergedReducer, initialState)
}
export function RouterAppClientDefault(reducers: any, initialState: any, hasDevTool: boolean) {
	//** initial state **
	//initial state must not be "undefined"
	//if it is, exception is thrown
	initialState = initialState || {};
	
	//** merge reducers **
	//you must add reducer for redux-router
	let reducer = {
		router: routerStateReducer
	}
	Object.assign(reducer, reducers)
	let mergedReducer = combineReducers(reducer)
	
	//** set components **
	let finalCreateStore;
	let components = [ applyMiddleware(thunk) ]
	if (hasDevTool) {
		components = components.concat([
			devTools(),
			persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
		])
	}
	finalCreateStore = compose(...components)(createStore)
	
	//** for redux-router / on client **
	//1. must use reduxReactRouter for client
	//2. you can use createHistory, only on client
	finalCreateStore = reduxReactRouter({ createHistory: history.createHistory })(finalCreateStore)

	return finalCreateStore(mergedReducer, initialState)
}


/* =========== not use this sample ============*/
/*
import { Reducer, Middleware, compose } from 'redux'

export function ServerDefault(reducer: Reducer, initialState: any, hasDevTool: boolean): any {
	let storeComponents = [
		applyMiddleware(thunk)
	];
	if (hasDevTool) {
		storeComponents = storeComponents.concat([
			devTools()
		]);
	}
	return Make(reducer, initialState, ...storeComponents)
}
export function ClientDefault(reducer: Reducer, initialState: any, hasDevTool: boolean): any {
	let storeComponents = [
		applyMiddleware(thunk)
	];
	if (hasDevTool) {
		storeComponents = storeComponents.concat([
			devTools(),
			persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
		]);
	}
	return Make(reducer, initialState, ...storeComponents);
}

export function Make(reducer: Reducer, initialState: any, ...storeComponents: Function[]): any {
	let finalCreateStore = compose(...storeComponents)(createStore);
	return finalCreateStore(reducer, initialState);
} 
*/