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
      client.get_dcommits();
    })

    subscribe('get_dcommits' , (({msg_id, method, args, response}) => {
      this.setState({
        date: response
      })
    }))
  }

  render() {
    console.log("commits answer!!! ", this.state.date)
    // const data = this.state.date.map(({dcommit}) => ({dcommits: dcommit}))
    const data = this.state.date
    const columns = [{
      Header: 'dcommit',
      accessor: 'dcommit',
      Cell: props => {
        return <Link to={'/commit-page/' + Base64.encode(props.value)}>{props.value}</Link>
      }
    },{
      Header: '# dcallables',
      accessor: '# dcallables',

    }, {
      Header: 'imageid',
      accessor: 'imageid',
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
