import * as Redux from 'redux'
import { EsLogActionTypes } from '../actions/EsLogActions'


//reducer
function log(state: { fileName: string, data: Array<string> } = null, action) {
    switch (action.type) {
        case EsLogActionTypes.CHANGE_ITEMS:
            return action.log
        default:
            return state
    }
}

export const Reducer = Redux.combineReducers({ log });
export default Reducer;