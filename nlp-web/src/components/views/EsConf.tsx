import * as React from 'react'
// == import application modules ==
import * as EsConfActions from '../../actions/EsConfActions'
import { MessageArea } from './MessageArea'
import nlpData from 'nlp-data'

 
export interface EsConfProps extends EsConfActions.EsConfActionApi {
    items: Array<nlpData.Models.IConfig>
    message: { type: string, text: string}
    input: { key : string, value:string }
    children?
    pushState
}
export class EsConf extends React.Component<EsConfProps, any> {

    private _getInput() : { key:string, value:string}{
        return {
            key: (this.refs["inputKey"] as React.HTMLAttributes).value as string,
            value: (this.refs["inputValue"] as React.HTMLAttributes).value as string
        }
    }
    private _handleSave(event) {
        this.props.save(this._getInput())
    }
    private _handleChangeInputValue(event){
        this.props.changeInput(this._getInput())
    }
    private _handleReload(event){
        this.props.loadItems()
    }
    private _handleItemSelect(index,event){
        let item = this.props.items[index];
        this.props.changeInput(Object.assign({},item))
    }
    private _handleDelete(index,event) {
        let item = this.props.items[index];
        if(!confirm(item.key + "を削除してもよろしいですか")) return 
        this.props.deleteItem(item.key)
    }
    componentDidMount(){
        this.props.loadItems()
    }
    
    render() {
        //get values from props
        const {
            message,
        } = this.props
        
        return (
            <div className="esconf">
                <MessageArea message={message} />
                <div className="conf-container">
                    {this._getItemsDom()}
                    {this._getInputDom()}
                    </div>
                </div>
        )
    }
    private _getItemsDom(){
        const { items } = this.props
        let dom = null;
        let click = function(index){
            return function(event){
                this._handleItemSelect(index,event)   
            }.bind(this)
        }.bind(this)
        let deleteItem = function(index){
            return function(event){
                this._handleDelete(index,event)   
            }.bind(this)
        }.bind(this)
        
        if(items && items.length){
            dom = items.map((item,index) =>{
                return (
                    <li key={index} ref={"item_" + index} onClick={click(index)}>
                        <span className="key">{item.key}</span>	
                        <span className="value">{item.value}</span>
                        <input className="delete" type="button" value="×" onClick={deleteItem(index)} />
                    </li>
                )})
        } else{
            dom =(
                <li>no items</li>
            )
        }
        return (
            <div className="items">
                <div className="list-operations">
                    <input type="button" value="Reload" onClick={this._handleReload.bind(this)} />
                    </div>
                <ul className="list conf">
                    {dom}
                    </ul>
                </div>)
    }
    private _getInputDom(){
        const { input } = this.props
        let inputValue = { key: "" , value:"" }
        inputValue = Object.assign(inputValue, input)
        
        return (
            <div className="input-form">
                <p>
                    <label>Key</label>
                    <input type="text" ref="inputKey" value={inputValue.key} onChange={this._handleChangeInputValue.bind(this)} />
                    </p>
                <p>
                    <label>Value</label>
                    <input type="text" ref="inputValue" value={inputValue.value} onChange={this._handleChangeInputValue.bind(this)} />
                    </p>
                    <p className="operations">
                        <input type="button" value="save" onClick={this._handleSave.bind(this)} />
                        </p>
                </div>
        )
    }
}

export default { EsConf }
