import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import {subscribe, client, onOpenPromise} from './PubSub';
import ReactTable from "react-table";
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';

export class CommitsPage extends Component {

  state = {
    date: []
  }


  componentDidMount(){
    onOpenPromise.then(() => {
      client.get_nodes();
    })

    subscribe('get_nodes' , (({msg_id, method, args, response}) => {
      this.setState({
        date: response
      })
    }))
  }

  render() {
    console.log("nodes table", this.state.date)
    const data = this.state.date.map(({id}) => ({id: id}))
    const columns = [{
      Header: 'id',
      accessor: 'id',
      Cell: props => {
        console.log("props", props)
        return <Link to={'/node/' + Base64.encode(props.value)}>{props.value}</Link>
      }
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
