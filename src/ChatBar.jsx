import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      id: '',
      username: '',
      content: ''
    }

    // this.handleMessageChange = this.handleMessageChange.bind(this)
  }

  generateId = () => {
    return Math.floor(Math.random() * 10000)
  }

  handleKeydown = event => {

    event.preventDefault;

    if(event.key === 'Enter'){
      if(this.state.content === ''){
         alert('Message Area cannot be EMPTY!');
      } else if(this.state.username === ''){
        this.setState({type: 'incomingMessage',
                       id: this.generateId(),
                       username: 'Anonymous'},()=>{
          console.log('username', this.state)
          this.handleMessageSubmit();
        })
      }else{
        this.setState({type: 'incomingMessage',
                       id: this.generateId()},() =>{
          this.handleMessageSubmit();
        })
      }
      event.target.value = '';
    }
  }

  handleUsernameKeyDown = event => {
    event.preventDefault;
    if(event.key === 'Enter'){
      if(event.target.value === ''){
        alert('Please enter a Vaild username');
      } else {

        this.props.updateNewUsername(event.target.value);

      }
    }
  }

  handleUsernameBlur = event => {
    if(event.target.value === ''){
      alert('Please enter a Vaild username');
    } else if(this.props.currentUser.name !== event.target.value){
      console.log('CURRENT USER:',this.props.currentUser)
      console.log('event.target.value:', event.target.value)
      this.props.updateNewUsername(event.target.value);

    }
  }


  handleChange = (key) => (event) => {
    this.setState({[key]: event.target.value})
  }


  handleMessageSubmit =() => {
    this.props.updateMessage(this.state);


    this.setState({
      type: '',
      id: '',
      content: ''
    })
  }

  render() {
    return (
      <footer className='chatbar'>
        <input type="text" className='chatbar-username' placeholder='Your Name (Optional)' defaultValue={this.props.currentUser.name} onChange={this.handleChange('username')} onKeyDown={this.handleUsernameKeyDown} onBlur={this.handleUsernameBlur}/>
        <input type="text" className='chatbar-message' placeholder="Type a message and hit ENTER" onChange={this.handleChange('content')} onKeyDown={this.handleKeydown} />
      </footer>
    )
  }
}



export default ChatBar;