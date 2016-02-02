import * as Redux from 'redux'
import { EsSearchActionTypes } from '../actions/EsSearchActions'
import nlpData from 'nlp-data'

//reducer
function items(state: Array<nlpData.Models.ITweet> = [], action) {
    switch (action.type) {
        case EsSearchActionTypes.CHANGE_ITEMS:
            let items = []
            items = items.concat(action.items)
            return items;
        default:
            return state
    }
}

function message(state: { type: string, text: string } = null, action) {
    switch (action.type) {
        case EsSearchActionTypes.CHANGE_MESSAGE:
            return action.message;
        default:
            return state
    }
}

function inputData(state: { searchText: string } = null, action) {
    switch (action.type) {
        case EsSearchActionTypes.CHANGE_INPUT:
            return action.input;
        default:
            return state
    }
}

export const Reducer = Redux.combineReducers({ items, message, inputData });
export default Reducer;