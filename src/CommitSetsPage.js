import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import {subscribe, client, onOpenPromise} from './PubSub';
import ReactTable from "react-table";
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';

export class CommitSetsPage extends Component {

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
      accessor: 'dcommitset',
      Cell: props => {
        console.log("props", props)
        return <Link to={'/commitset-page/' + Base64.encode(props.value)}>{props.value}</Link>
      }
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

export default (CommitSetsPage);
