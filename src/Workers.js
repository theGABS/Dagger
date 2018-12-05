import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import {subscribe, client, onOpenPromise} from './PubSub';
import ReactTable from "react-table";
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';

export class Workers extends Component {

  state = {
    date: []
  }


  componentDidMount(){
    onOpenPromise.then(() => {
      client.get_workers();
    })

    subscribe('get_workers' , (({msg_id, method, args, response}) => {
      this.setState({
        date: response
      })
    }))
  }

  render() {

    const data = this.state.date
    const columns = [{
      Header: 'worker_id',
      accessor: 'worker_id',
      
    }, {
      Header: 'dcommit',
      accessor: 'dcommit',
    }, {
      Header: 'start_time',
      accessor: 'start_time',
    }, {
      Header: 'stop_time',
      accessor: 'stop_time',
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

export default (Workers);
