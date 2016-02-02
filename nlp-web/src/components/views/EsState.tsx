import * as React from 'react'
// == import application modules ==
import * as EsStateActions from '../../actions/EsStateActions'
import { MessageArea } from './MessageArea'
import nlpData from 'nlp-data'


export interface EsStateProps extends EsStateActions.EsStateActionApi {
    count: number
    createAtInfo: { max_create_at: number, min_create_at: number }
    idInfo: { max_id: number, min_id: number }
    message: { type: string, text: string }
    input: {}
    children?
    pushState
}
export class EsState extends React.Component<EsStateProps, any> {

    private _handleCount(event) {
        this.props.loadCount()
    }
    private _handleInfoCreateAt(event) {
        this.props.loadInfoCreateAt()
    }
    private _handleInfoId(event) {
        this.props.loadInfoId()
    }
    private _handleChangeInputValue(event) {
        this.props.changeInput({})
    }
    
    render() {
        
        //get values from props
        const {
            message,
            input
        } = this.props

        let inputValue = {}
        inputValue = Object.assign(inputValue, input)

        return (
            <div className="essearch">
                <MessageArea message={message} />
                <ul className="list unselectable state">
                    {this._createCount() }
                    {this._createInfoId() }
                    {this._createInfoCreateAt() }
                    </ul>
                </div>
        )
    }
    private _createCount() {
        const { count } = this.props
        return (
            <li>
                <h3>Count</h3>
                <input type="button" value="Get" onClick={this._handleCount.bind(this) } />
                <p>{count == null ? "" : count}</p>
                </li>
        )
    }
    private _createInfoCreateAt() {
        const { createAtInfo } = this.props
        let result = ""
        if (createAtInfo) {
            let max = this._getDateText(createAtInfo.max_create_at)
            let min = this._getDateText(createAtInfo.min_create_at)
            result = "Min:" + min + " / Max:" + max
        }
        return (
            <li>
                <h3>CrateAt</h3>
                <input type="button" value="Get" onClick={this._handleInfoCreateAt.bind(this) } />
                <p>{result}</p>
                </li>
        )
    }

    private _createInfoId() {
        const { idInfo } = this.props
        let result = ""
        if (idInfo) {
            result = "Min:" + idInfo.min_id + " / Max:" + idInfo.max_id
        }
        return (
            <li>
                <h3>ID</h3>
                <input type="button" value="Get" onClick={this._handleInfoId.bind(this) } />
                <p>{result}</p>
                </li>
        )
    }

    private _getDateText(time: number) {
        let d = new Date("1970-01-01")
        d.setTime(time)

        let year = d.getFullYear().toString()
        let month = (d.getMonth() + 1).toString()
        let date = d.getDate().toString()
        let hours = d.getHours().toString()
        let minutes = d.getMinutes().toString()

        month = month.length == 1 ? "0" + month : month
        date = date.length == 1 ? "0" + date : date
        hours = hours.length == 1 ? "0" + hours : hours
        minutes = minutes.length == 1 ? "0" + minutes : minutes

        return year + "-" + month + "-" + date + " " + hours + ":" + minutes
    }


}

export default { EsState }
