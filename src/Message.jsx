import React, {Component} from 'react';

class Message extends Component {

  constructor(props){
   super(props);
  }
  messageDisplay = props => {
    const userColor = {
      color: this.props.color
    }
    return this.props.messages.map((listItem) =>{
      if(listItem.type === 'incomingMessage'){
        if(listItem.username !== 'Anonymous'){
          return (
            <div className='message' key={listItem.id}>
              <span className='message-username' style={userColor}>{listItem.username}</span>
              <span className='message-content'>{listItem.content}</span>
            </div>
          )
        } else {
          return (
            <div className='message' key={listItem.id}>
              <span className='message-username' style={userColor}>{listItem.username} {listItem.id}</span>
              <span className='message-content'>{listItem.content}</span>
            </div>
          )
        }
      } else if (listItem.type === 'systemNotification'){
        return (
          <div className='system message' key={listItem.id}>
            <span>User <b>{listItem.old}</b> changes name as <b>{listItem.new}</b></span>
          </div>
        )
      }
    })
  }

  render() {
    console.log(this.props.messages)

    return (<div> { this.messageDisplay() } </div>)
  }
}

export default Message;