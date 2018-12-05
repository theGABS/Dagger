import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import {subscribe, client, onOpenPromise} from './PubSub';

export class CommitPage extends Component {

  state = {
    date: []
  }


  componentDidMount(){
    onOpenPromise.then(() => {
      client.get_dcommit(Base64.decode(this.props.match.params.id))
    })

    subscribe('get_dcommit' , (({msg_id, method, args, response}) => {
      this.setState({
        date: response
      })
    }))
  }

  render() {
    console.log("NEW ANSWER HERE! ", this.state.date)
    return (
      <div className="App">
        {JSON.stringify(this.state.date)}
      </div>
    );
  }
}

export default (CommitPage);
