import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import {subscribe, client, onOpenPromise} from './PubSub';

export class CommitSetPage extends Component {

  state = {
    date: []
  }


  componentDidMount(){
    onOpenPromise.then(() => {
      client.get_dcommitset(Base64.decode(this.props.match.params.id))
      console.log("this.props.match.params.id", Base64.decode(this.props.match.params.id))
    })

    subscribe('get_dcommitset' , (({msg_id, method, args, response}) => {
      this.setState({
        date: response
      })
    }))
  }

  render() {
    return (
      <div className="App">
        {JSON.stringify(this.state.date)}
      </div>
    );
  }
}

export default (CommitSetPage);
