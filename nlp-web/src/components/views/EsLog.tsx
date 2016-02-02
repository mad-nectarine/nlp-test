import * as React from 'react'
// == import application modules ==
import * as EsLogActions from '../../actions/EsLogActions'
import { MessageArea } from './MessageArea'
import nlpData from 'nlp-data'

export interface EsLogProps extends EsLogActions.EsLogActionApi {
    log: {
        fileName: string,
        data : Array<string>
    }
    children?
    pushState
}

export class EsLog extends React.Component<EsLogProps, any> {

    private _handleReload(event){
        this.props.load()
    }
    
    componentDidMount(){
        this.props.load()
    }
    
    render() {
        //get values from props
        const { log } = this.props
        return (
            <div className="eslog">       
                <div className="log-container">
                    <h3>{log == null ? "" : log.fileName == null ? "" : log.fileName}</h3>
                    <div className="list-operations">
                        <input type="button" value="Reload" onClick={this._handleReload.bind(this)} />
                        </div>
                    {this._getItemsDom()}
                    </div>
                </div>
        )
    }
    private _getItemsDom(){
        const { log } = this.props
        let dom = null;
        
        if(log && log.data && log.data.length){
            dom = log.data.map((item,index) =>{
                return (
                    <li key={index}>{item}</li>
                )})
        } else{
            dom =(
                <li>no items</li>
            )
        }
        return (
            <ul className="list unSelectable">
                {dom}
                </ul>
        )
    }
}

export default { EsLog }
