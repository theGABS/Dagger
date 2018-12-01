import React, { Component } from 'react';
import {subscribe, client, onOpenPromise} from './PubSub';

export class CommitsPage extends Component {

  state = {

  }


  componentDidMount(){
    onOpenPromise.then(() => {
      // client.get_dcommitsets();
    })
  }

  render() {
    return (
      <div className="App">
        hello

      </div>
    );
  }
}

export default (CommitsPage);
