import * as superagent from 'superagent'
import thunk from 'redux-thunk'
import nlpData from 'nlp-data'

//state connector
import ActionStateConnector from '../util/ActionStateConnector'
export const StateConnector = ActionStateConnector()

//types
export const EsSearchActionTypes = {
    CHANGE_ITEMS: "ESSEARCH.LOAD_LIST",
    CHANGE_MESSAGE: "ESSEARCH.CHANGE_MESSAGE",
    CHANGE_INPUT: "ESSEARCH.CHANGE_INPUT",
}

//api interface
export interface EsSearchActionApi {
    search?: { (searchText: string): void }
    changeMessage: { (message: { type: string, text: string }): void }
    changeInput: { (input: { searchText: string }): void }
}

//creators
export function search(searchText: string) {
    return (dispatch, getState) => {
        const start = new Date().getTime()
        dispatch(changeMessage({ type: "info", text: "「" + searchText + "」を検索中です..." }))
        dispatch({
            type: EsSearchActionTypes.CHANGE_ITEMS,
            items: []
        })
        superagent.post("/es/search")
            .send({ searchText })
            .end((err, res) => {
                const responseEnd = new Date().getTime()
                if (err) {
                    dispatch(changeMessage({ type: "error", text: err.message }))
                    return
                }
                let result = JSON.parse(res.text)
                if (result.isSuccess && result.items && result.items.length) {
                    dispatch(changeMessage({
                        type: "info",
                        text: result.totalCount + "件中" + result.items.length + "件のデータを表示しています"
                              + "  ( all: " + ((responseEnd - start) / 1000).toString().slice(0,5) + "s"
                              + ",  es: " + result.searchSeconds.toString().slice(0,5) + "s"
                              + ",  all-es: " + (((responseEnd - start) / 1000) - result.searchSeconds).toString().slice(0,5) + "s )"
                    }))
                    dispatch({
                        type: EsSearchActionTypes.CHANGE_ITEMS,
                        items: result.items
                    })
                    return
                }
                if (result.isSuccess) {
                    dispatch(changeMessage({ type: "error", text: "検索結果は0件です" }))
                    return
                }
                dispatch(changeMessage({ type: "error", text: result.message }))
            })
    }
}

export function changeMessage(message: { type: string, text: string }) {
    return {
        type: EsSearchActionTypes.CHANGE_MESSAGE,
        message
    }
}

export function changeInput(input: { searchText: string }) {
    return {
        type: EsSearchActionTypes.CHANGE_INPUT,
        input
    }
}