import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import {subscribe, client, onOpenPromise} from './PubSub';

export class Worker extends Component {

  state = {
    date: []
  }


  componentDidMount(){
    onOpenPromise.then(() => {
      client.get_worker_logs()
    })

    subscribe('get_worker_logs' , (({msg_id, method, args, response}) => {
      this.setState({
        date: response
      })
    }))
  }

  render() {
    console.log("Worker log here! ", this.state.date)
    return (
      <div className="App">
        {JSON.stringify(this.state.date)}
      </div>
    );
  }
}

export default (Worker);
