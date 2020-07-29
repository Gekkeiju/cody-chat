import React from 'react'
import axios from 'axios'

import config from '../config'

class Chat extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            session_id: ''
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `${config.DEFAULT_API}/message`
        })
            .then(res => {
                this.setState({
                    messages: res.data
                })
            })
    }

    componentDidUpdate(){
    }

    render() {
        return (
            <ul>
                {
                    this.state.messages.map(msg => <li key={msg._id}>{msg.body}</li>)
                }
            </ul>
        )
    }
}

export default Chat