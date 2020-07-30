import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import config from '../config'

class Chat extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.location.state.user,
            session_id: this.props.location.state.session_id,
            messages: [],
            newMessage: null,
            errorMessage: '',
            isAuthenticated: this.props.location.state.isAuthenticated
        }
    }

    sendMessage = () => {
        const {
            newMessage: body,
            user: { username: sender }
        } = this.state

        axios({
            method: 'post',
            url: `${config.DEFAULT_API}/message`,
            data: {
                body,
                sender
            }
        })
        .then((result) => {
            this.setState(prev => {
                console.log('previos: ', prev)
                const messages = prev.messages
                messages.push(result.data)

                return {
                    newMessage: null,
                    messages
                }
            })
        })
        .catch(er => {
            console.log('ERROR: ', er)
            this.setState({
                errorMessage: er.response.data.message
            })

            console.error(er)
        })
    }

    scrollToBottom = () => {
        const chat = document.getElementById("chats")
        chat.scrollTop = chat.scrollHeight
    }

    handleSubmit = event => {
        event.preventDefault()
        this.sendMessage()
        event.target.reset()
        this.scrollToBottom()
    }

    handleChange = event => {
        this.setState({
            newMessage: event.target.value
        })
    }

    messageListener = () => {
        axios({
            method: 'get',
            url: `${config.DEFAULT_API}/message`
        })
        .then(({ data: messages }) => {
            this.setState({
                messages
            })

            this.scrollToBottom()
        })
    }

    componentDidMount() {
        this.messageListener()
        this.scrollToBottom()
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    render() {
        if(!this.state.isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div className="chatWindow">
                <h1>Chat app</h1>
                <input className="send" type="submit" value="Log out" />
                <hr></hr>
                <ul className="chat" id="chats">
                    {this.state.messages.map(msg => (
                        <div key={msg._id}>
                            <li className={this.state.user.username === msg.sender ? "self" : "other"}>
                                <div className="msg">
                                    <p>{msg && msg.sender ? msg.sender.username: ''}</p>
                                    <div className="message">
                                        {msg.body}        
                                    </div>
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
                <div className="chatInputWrapper">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="textarea input"
                            type="text"
                            placeholder="Start a new message"
                            onChange={this.handleChange}
                        />
                        <input
                            className="send"
                            type="submit"
                            value="send"
                            disabled={this.state.newMessage === null}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default Chat