import * as superagent from 'superagent'
import thunk from 'redux-thunk'

//state connector
import ActionStateConnector from '../util/ActionStateConnector'
export const StateConnector = ActionStateConnector()

//types
export const EsLogActionTypes = {
    CHANGE_ITEMS: "ESLOG.CHANGE_ITEMS"
}

//api interface
export interface EsLogActionApi {
    load?: { (): void }
}

//creators
export function load() {
    return (dispatch, getState) => {
        dispatch({
            type: EsLogActionTypes.CHANGE_ITEMS,
            log: null
        })
        superagent.get("/es/info/log")
            .end((err, res) => {
                if (err) {
                    return
                }
                let result = JSON.parse(res.text)
                if (result.isSuccess) {
                    dispatch({
                        type: EsLogActionTypes.CHANGE_ITEMS,
                        log: result
                    })
                    return
                }
            })
    }
}
