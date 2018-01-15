import React, {Component} from 'react';
import Message from './Message.jsx'


class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className='messages'>
        <Message messages={this.props.messages} color={this.props.color}/>

      </main>
      )
  }
}

export default MessageList;



////////


