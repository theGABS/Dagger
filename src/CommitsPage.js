import React, { Component } from 'react';
import {subscribe, client, onOpenPromise} from './PubSub';
import ReactTable from "react-table";
import 'react-table/react-table.css';

export class CommitsPage extends Component {

  state = {
    date: []
  }


  componentDidMount(){
    onOpenPromise.then(() => {
      client.get_dcommitsets();
    })

    subscribe('get_dcommitsets' , (({msg_id, method, args, response}) => {
      this.setState({
        date: response
      })
    }))
  }

  render() {

    const data = this.state.date.map(({dcommitset, buildtime}) => ({dcommitset: dcommitset, buildtime: buildtime}))
    const columns = [{
      Header: 'dcommitset',
      accessor: 'dcommitset'
    }, {
      Header: 'Build Time',
      accessor: 'buildtime',
    }]
    return (
      <div className="App">
        <ReactTable
          data={data}
          columns={columns}
        />
      </div>
    );
  }
}

export default (CommitsPage);
