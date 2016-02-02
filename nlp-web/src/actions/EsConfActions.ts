import * as superagent from 'superagent'
import thunk from 'redux-thunk'
import nlpData from 'nlp-data'

//state connector
import ActionStateConnector from '../util/ActionStateConnector'
export const StateConnector = ActionStateConnector()

//types
export const EsConfActionTypes = {
    CHANGE_ITEMS: "ESCONF.CHANGE_ITEMS",
    CHANGE_MESSAGE: "ESCONF.CHANGE_MESSAGE",
    CHANGE_INPUT: "ESCONF.CHANGE_INPUT",
    ITEMS_ADD_OR_REPLACE: "ESCONF.ITEMS_ADD_REPLACE",
    ITEMS_DELETE: "ESCONF.ITEMS_DELETE",
}

//api interface
export interface EsConfActionApi {
    loadItems?: { (): void }
    changeMessage: { (message: { type: string, text: string }): void }
    changeInput: { (input: { key: string, value: string }): void }
    save: { (input: { key: string, value: string }): void }
    deleteItem: { (key: string): void }
}

//creators
export function loadItems() {
    return (dispatch, getState) => {
        dispatch(changeMessage({ type: "info", text: "リストを更新しています..." }))
        dispatch({
            type: EsConfActionTypes.CHANGE_ITEMS,
            items: []
        })
        superagent.post("/es/conf/list")
            .end((err, res) => {
                if (err) {
                    dispatch(changeMessage({ type: "error", text: err.message }))
                    return
                }
                let result = JSON.parse(res.text)
                if (result.isSuccess && result.items && result.items.length) {
                    dispatch(changeMessage({ type: "info", text: "リストが更新されました" }))
                    dispatch({
                        type: EsConfActionTypes.CHANGE_ITEMS,
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

export function save(input: { key: string, value: string }) {
    return (dispatch, getState) => {
        dispatch(changeMessage({ type: "info", text: "データを登録しています..." }))
        superagent.post("/es/conf/save")
            .send({ input })
            .end((err, res) => {
                if (err) {
                    dispatch(changeMessage({ type: "error", text: err.message }))
                    return
                }
                let result = JSON.parse(res.text)
                if (result.isSuccess) {
                    //すぐにListを再取得するとES側で反映されていない
                    dispatch(changeMessage({ type: "info", text: "登録されました。" }))
                    dispatch({
                        type: EsConfActionTypes.ITEMS_ADD_OR_REPLACE,
                        item : input
                    })
                    return
                }
                dispatch(changeMessage({ type: "error", text: result.message }))
            })
    }
}

export function deleteItem(key: string) {
    return (dispatch, getState) => {
        dispatch(changeMessage({ type: "info", text: key + "を削除しています..." }))
        superagent.post("/es/conf/delete")
            .send({ key })
            .end((err, res) => {
                if (err) {
                    dispatch(changeMessage({ type: "error", text: err.message }))
                    return
                }
                let result = JSON.parse(res.text)
                if (result.isSuccess) {
                    dispatch(changeMessage({ type: "info", text: key + "が削除されました。" }))
                    dispatch({
                        type: EsConfActionTypes.ITEMS_DELETE,
                        key
                    })
                    return
                }
                dispatch(changeMessage({ type: "error", text: result.message }))
            })
    }
}

function _reloadList(dispatch) {
    //reload list
    return new Promise((resolve, reject) => {
        superagent.post("/es/conf/list")
            .end((err, res) => {
                if (err) { return }
                let result = JSON.parse(res.text)
                if (result.isSuccess && result.items && result.items.length) {
                    dispatch({
                        type: EsConfActionTypes.CHANGE_ITEMS,
                        items: result.items
                    })
                }
                resolve(result.items)
            })
    });


}

export function changeMessage(message: { type: string, text: string }) {
    return {
        type: EsConfActionTypes.CHANGE_MESSAGE,
        message
    }
}

export function changeInput(input: { key: string, value: string }) {
    return {
        type: EsConfActionTypes.CHANGE_INPUT,
        input
    }
}