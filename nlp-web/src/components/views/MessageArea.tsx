import * as React from 'react'

export interface MessageAreaProps {
    message: {
        text: string,
        type: string
    }
}

export class MessageArea extends React.Component<MessageAreaProps, {}> {
    render() {

        if (this.props.message) {
            return (
                <div className={"message " + this.props.message.type}>
                    {this.props.message.text}
                    </div>
            )
        }
        return <div className="message none"></div>
    }
}

export default { MessageArea }