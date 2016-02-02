// == import installed modules ==
import * as React from 'react'
import { Link } from 'react-router';

export interface EsAppContainerProps {
    pushState?
    children?
}

export class EsAppContainer extends React.Component<EsAppContainerProps, any> {

    render() {

        let selectedViewName = ""
        if (this.props.children && this.props.children.props.location) {
            let path = this.props.children.props.location.pathname as string
            selectedViewName = path.split("/").slice(-1)[0]
        }

        return (
            <div>
                <ul className="tabs" ref="tabs">
                    {this._createLinkItem("search", selectedViewName) }
                    {this._createLinkItem("state", selectedViewName, "Status") }
                    {this._createLinkItem("conf", selectedViewName) }
                    {this._createLinkItem("log", selectedViewName) }
                    </ul>
                <div className="main-contents">
                    <section>
                        {this.props.children}
                        </section>
                    </div>
                </div>
        )
    }
    private _createLinkItem(viewName: string, selectedViewName: string, displayName?: string) {
        let className = viewName == selectedViewName ? "selected" : ""
        if (displayName == null) {
            displayName = viewName.slice(0, 1).toUpperCase() + viewName.slice(1)
        }
        return (
            <li className={className}><Link to={"/es/view/" + viewName}>{displayName}</Link></li>
        )

    }
}

module.exports = { EsAppContainer }