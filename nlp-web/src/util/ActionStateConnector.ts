export class ActionStateConnector{
	
	private _connectedStatePath
	private _getStateFunction
	
	connect(statePath:string)
	connect(getStateFunction: { (state:any) : any })
	connect(arg: string | { (state:any) : any }){
		if(typeof arg === "string"){
			this._connectedStatePath = arg
		}
		if(typeof arg === "function"){
			this._getStateFunction = arg
		}	
	}
		
	get(getState: { (): any }){
		let state = getState()
		return this._getConnectedState(state)
	}
	
	getOrOriginal(getState: { (): any }){
		let original = getState()
		let state = this._getConnectedState(original)
		if(state){
			return state
		}
		return original
	}
	
	private _getConnectedState(state){
		if(this._connectedStatePath){
			return this._getConnectedStateByPath(state)
		}
		if(this._getStateFunction){
			return this._getStateFunction(state)
		}
		return null
	}
	
	private _getConnectedStateByPath(state){
		let path = this._connectedStatePath as string 
		if(path){
			var paths = path.split(".")
			for (var i = 0; i < paths.length; i++) {
				let p = paths[0]
				if(state[p] === undefined){
					return null
				}
				state = state[p]
			}
			return state
		}
		return null;
	}
}

export default function ConnectedState() : ActionStateConnector {
	return new ActionStateConnector()
}
