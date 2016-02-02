import * as React from 'react'
// == import application modules ==
import * as EsSearchActions from '../../actions/EsSearchActions'
import { MessageArea } from './MessageArea'
import nlpData from 'nlp-data'

 
export interface EsSearchProps extends EsSearchActions.EsSearchActionApi {
    items: Array<nlpData.Models.ITweet>
    message: { type: string, text: string}
    input: { searchText : string }
    children?
    pushState
}
export class EsSearch extends React.Component<EsSearchProps, any> {

    private _getSearchText(){
        return (this.refs["searchtext"] as React.HTMLAttributes).value as string
    }
    private _handleSearch(event) {
        this.props.search(this._getSearchText())
    }
    private _handleChangeInputValue(event){
        this.props.changeInput({ 
            searchText : this._getSearchText() 
        })
    }
    render() {
        
        //get values from props
        const {
            items,
            message,
            input
        } = this.props
        
        let itemsDom = null;
        if(items && items.length){
            itemsDom = items.map((item,index) =>{
                return (
                    <li key={index}>	
                        <span className="score">{item["_score"]}</span>
                        <span className="text">{item.text}</span>
                        <div className="user">
                            <span className="un">{item.user_name }</span>
                            <span className="usn">{"@" + item.user_screen_name }</span>
                            <span className="uid">{"-" + item.user_id + "-" }</span>
                            </div>
                        <div className="time">
                            <span>{this._getDateText(item.create_at) }</span>
                        </div>
                        <div className="others">
                            <span>{"favorite " + item.favorite_count }</span>
                            <span>{"/ retweet " + item.retweet_count }</span>
                            <span>{"/ id  " + item.id }</span>
                            </div>
                    </li>
                )})
        } else{
            itemsDom =(
                <li>no items</li>
            )
        }
        
        let searchText = input && input.searchText ? input.searchText : "" 
        return (
            <div className="essearch">
                <MessageArea message={message} />
                <div className="search-container">
                    <div className="condition">
                        <input type="text" ref="searchtext" placeholder="検索ワードを入力してください" value={searchText} onChange={this._handleChangeInputValue.bind(this)} /> 
                        <input type="button" value="search" onClick={this._handleSearch.bind(this)} />
                        </div>
                    <ul className="list tweets unselectable">
                        {itemsDom}
                        </ul>
                    </div>
                </div>
        )
    }
    private _getDateText(time : number){
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
        
        return  year + "-" + month + "-" + date + " " + hours + ":" + minutes
    }
}

export default { EsSearch }
