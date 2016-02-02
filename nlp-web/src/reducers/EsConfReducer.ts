import * as Redux from 'redux'
import { EsConfActionTypes } from '../actions/EsConfActions'
import nlpData from 'nlp-data'

//reducer
function items(state: Array<nlpData.Models.IConfig> = [], action) {
    switch (action.type) {
        case EsConfActionTypes.CHANGE_ITEMS:
            //return [].concat(action.items)
            return [...action.items]
        case EsConfActionTypes.ITEMS_ADD_OR_REPLACE:
            let hasItem = false
            let newList = state.map(x => {
                if (x.key == action.item.key) {
                    hasItem = true
                    return action.item
                }
                return x
            })
            if (!hasItem) {
                newList = [...newList, action.item]
            }
            return newList
        case EsConfActionTypes.ITEMS_DELETE:
            return state.filter(x => x.key !== action.key)
        default:
            return state
    }
}

function message(state: { type: string, text: string } = null, action) {
    switch (action.type) {
        case EsConfActionTypes.CHANGE_MESSAGE:
            return action.message;
        default:
            return state
    }
}

function inputData(state: { key: string, value: string } = null, action) {
    switch (action.type) {
        case EsConfActionTypes.CHANGE_INPUT:
            return action.input;
        default:
            return state
    }
}

export const Reducer = Redux.combineReducers({ items, message, inputData });
export default Reducer;