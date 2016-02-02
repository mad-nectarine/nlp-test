import * as Redux from 'redux'
import { EsStateActionTypes } from '../actions/EsStateActions'
import nlpData from 'nlp-data'

//reducer
function count(state: number = null, action) {
    switch (action.type) {
        case EsStateActionTypes.CHANGE_COUNT:
            return action.count;
        default:
            return state
    }
}

function createAtInfo(state: { max_create_at: number, min_create_at: number } = null, action) {
    switch (action.type) {
        case EsStateActionTypes.CHANGE_INFO_CREATE_AT:
            return action.info;
        default:
            return state
    }
}
function idInfo(state: { max_id: number, min_id: number } = null, action) {
    switch (action.type) {
        case EsStateActionTypes.CHANGE_INFO_ID:
            return action.info;
        default:
            return state
    }
}

function message(state: { type: string, text: string } = null, action) {
    switch (action.type) {
        case EsStateActionTypes.CHANGE_MESSAGE:
            return action.message;
        default:
            return state
    }
}

function inputData(state: {} = null, action) {
    switch (action.type) {
        case EsStateActionTypes.CHANGE_INPUT:
            return action.input;
        default:
            return state
    }
}

export const Reducer = Redux.combineReducers({ count, createAtInfo, idInfo, message, inputData });
export default Reducer;