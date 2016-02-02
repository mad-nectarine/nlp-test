import * as superagent from 'superagent'
import thunk from 'redux-thunk'
import nlpData from 'nlp-data'

//state connector
import ActionStateConnector from '../util/ActionStateConnector'
export const StateConnector = ActionStateConnector()

//types
export const EsStateActionTypes = {
    CHANGE_COUNT: "ESSTATE.CHANGE_COUNT",
    CHANGE_INFO_CREATE_AT: "ESSTATE.CHANGE_INFO_CREATE_AT",
    CHANGE_INFO_ID: "ESSTATE.CHANGE_INFO_ID",
    CHANGE_MESSAGE: "ESSTATE.CHANGE_MESSAGE",
    CHANGE_INPUT: "ESSTATE.CHANGE_INPUT",
}

//api interface
export interface EsStateActionApi {
    loadCount?: { (): void }
    loadInfoCreateAt?: { (): void }
    loadInfoId?: { (): void }
    changeMessage: { (message: { type: string, text: string }): void }
    changeInput: { (input: { }): void }
}

//creators
export function loadCount() {
    return (dispatch, getState) => {
        dispatch(changeMessage({ type: "info", text: "件数を取得しています..." }))
        dispatch({
            type: EsStateActionTypes.CHANGE_COUNT,
            count: null
        })
        superagent.post("/es/count")
            .send({ searchText : null })
            .end((err, res) => {
                if (err) {
                    dispatch(changeMessage({ type: "error", text: err.message }))
                    return
                }
                let result = JSON.parse(res.text)
                if (result.isSuccess) {
                    dispatch(changeMessage({ type: "info", text: "件数が取得されました" }))
                    dispatch({
                        type: EsStateActionTypes.CHANGE_COUNT,
                        count: result.count
                    })
                    return
                }
                dispatch(changeMessage({ type: "error", text: result.message }))
            })
    }
}

export function loadInfoCreateAt() {
    return (dispatch, getState) => {
        dispatch(changeMessage({ type: "info", text: "ツイートの作成日時情報を取得しています..." }))
        dispatch({
            type: EsStateActionTypes.CHANGE_INFO_CREATE_AT,
            info: null
        })
        superagent.post("/es/info/createat")
            .end((err, res) => {
                if (err) {
                    dispatch(changeMessage({ type: "error", text: err.message }))
                    return
                }
                let result = JSON.parse(res.text)
                if (result.isSuccess) {
                    dispatch(changeMessage({ type: "info", text: "ツイートの作成日時情報が取得されました" }))
                    dispatch({
                        type: EsStateActionTypes.CHANGE_INFO_CREATE_AT,
                        info: result.info
                    })
                    return
                }
                dispatch(changeMessage({ type: "error", text: result.message }))
            })
    }
}

export function loadInfoId() {
    return (dispatch, getState) => {
        dispatch(changeMessage({ type: "info", text: "ID情報を取得しています..." }))
        dispatch({
            type: EsStateActionTypes.CHANGE_INFO_ID,
            info: null
        })
        superagent.post("/es/info/id")
            .end((err, res) => {
                if (err) {
                    dispatch(changeMessage({ type: "error", text: err.message }))
                    return
                }
                let result = JSON.parse(res.text)
                if (result.isSuccess) {
                    dispatch(changeMessage({ type: "info", text: "ID情報が取得されました" }))
                    dispatch({
                        type: EsStateActionTypes.CHANGE_INFO_ID,
                        info: result.info
                    })
                    return
                }
                dispatch(changeMessage({ type: "error", text: result.message }))
            })
    }
}

export function changeMessage(message: { type: string, text: string }) {
    return {
        type: EsStateActionTypes.CHANGE_MESSAGE,
        message
    }
}

export function changeInput(input: {  }) {
    return {
        type: EsStateActionTypes.CHANGE_INPUT,
        input
    }
}