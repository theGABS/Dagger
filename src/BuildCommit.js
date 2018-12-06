import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import {subscribe, client, onOpenPromise} from './PubSub';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  inputField: {
    margin: theme.spacing.unit,
  }
});

export class BuildCommit extends Component {

  state = {
    date: [],
    inputValue: '',
    loading: false
  }


  componentDidMount(){

    subscribe('build' , (({msg_id, method, args, response}) => {
      console.log("Response Build", msg_id, method, args, response);
      this.setState({
        date: response,
        loading: false
      })
    }))
  }

  InputValueOnChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  OnSubmit = () => {
    onOpenPromise.then(() => {
      client.build(this.state.inputValue)
    })
    this.setState({
      loading: true
    })
  }


  render() {
    const { classes } = this.props;
    return (
      <div className="App-commit">
        <div className="response">{JSON.stringify(this.state.date)}</div>
        <div className="commit-form">
          <div className="commit-text">Build new commit</div>
          <Input
            placeholder="Commit"
            value={this.state.inputValue}
            onChange={this.InputValueOnChange}
            className={classes.inputField}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          {this.state.loading ? <CircularProgress disableShrink /> : <Button variant="outlined" className={classes.button} onClick={this.OnSubmit}>
            OK
          </Button>}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BuildCommit);
