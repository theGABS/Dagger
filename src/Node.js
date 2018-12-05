import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import {subscribe, client, onOpenPromise} from './PubSub';

export class CommitsPage extends Component {

  state = {
    date: []
  }


  componentDidMount(){
    onOpenPromise.then(() => {
      client.get_node(+Base64.decode(this.props.match.params.id))
    })

    subscribe('get_node' , (({msg_id, method, args, response}) => {
      this.setState({
        date: response
      })
    }))
  }

  render() {
    console.log("Base64.decode(this.props.match.params.id) ", Base64.decode(this.props.match.params.id))
    return (
      <div className="App">
        {JSON.stringify(this.state.date)}
      </div>
    );
  }
}

export default (CommitsPage);
