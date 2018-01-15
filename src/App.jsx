import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      color: '',
      clientsOnline: '',
      currentUser: {name: 'Anonymous'},
      messages:[]
    };

  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    this.ws = new WebSocket('ws://localhost:3001');
    console.log('stateMessage:', this.state.currentUser);
    let concatMessage = this.state.messages;
    this.ws.onmessage = (event) => {
      console.log('data from event:',event.data);
      let readyToUseMessage = JSON.parse(event.data);
      if(readyToUseMessage.type === 'clientNumber'){
        this.setState({clientsOnline: readyToUseMessage.clientsOnline})
      } else if(readyToUseMessage.type === 'color'){
        this.setState({color: readyToUseMessage.colorPicked});
      } else {
        concatMessage = concatMessage.concat(readyToUseMessage)
        console.log('concatMessage:',concatMessage);
        this.setState({
          messages: concatMessage
        })

      }
      console.log('state after concat:', this.state.messages);
    }


  // setTimeout(() => {
  //   console.log("Simulating incoming message");
  //   // Add a new message to the list of messages in the data store
  //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //   const messages = this.state.messages.concat(newMessage)
  //   // Update the state of the app component.
  //   // Calling setState will trigger a call to render() in App and all child components.
  //   this.setState({messages: messages})
  // }, 3000);
  }

  updateNewUsername = (newUsername) => {
    const notification = {
      type: 'systemNotification',
      old: this.state.currentUser.name,
      new: newUsername
    }
    this.ws.send(JSON.stringify(notification))
    this.setState({currentUser: {name: newUsername}});

  }

  updateMessage = (newMessage) => {
    console.log(newMessage);
    console.log(this.state)
    this.ws.send(JSON.stringify(newMessage))
    // const newAllMessage = this.state.messages.concat(newMessage);
    // this.setState({
    //   messages: newAllMessage
    // })
  };

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <div className='onlineNumber'>{this.state.clientsOnline} persons Online</div>
        </nav>
        <MessageList messages={this.state.messages} color={this.state.color}/>
        <ChatBar currentUser={this.state.currentUser} updateMessage={this.updateMessage} updateNewUsername={this.updateNewUsername}/>
      </div>
    );
  }

}
export default App;
