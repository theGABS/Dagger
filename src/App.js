import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import CommitSetsPage from './CommitSetsPage';
import CommitSetPage from './CommitSetPage';
import Workers from './Workers';
import Worker from './Worker';
import Nodes from './Nodes';
import Node from './Node';
import CommitsPage from './CommitsPage';
import CommitPage from './CommitPage';
import BuildCommit from './BuildCommit';
import './App.css';
import {subscribe, client} from './PubSub';
/* eslint-disable */

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  header: {
      width: `calc(100% - 240px)`,
      height: 65,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginLeft: 240
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class App extends Component {

  state = {
    ping: "??",
    connectionLost: false,
    modalIsOpen: false,
    secondModalIsOpen: false
  }

  handleClickOpen = () => {
    this.setState({ modalIsOpen: true });
  };

  handleClose = () => {
    this.setState({ modalIsOpen: false,  secondModalIsOpen: true});
    client.shutdown()
  };

  handleCloseCancel = () => {
    this.setState({ modalIsOpen: false});
  };

  handleSecondClose = () => {
    this.setState({ secondModalIsOpen: false });
  };

  componentDidMount(){


      //const ClientClass = window.Client;
      // eslint-disable-next-line

    let checkConnectionTimerId;

    subscribe('ping' , (({msg_id, method, args, response}) => {
      // console.log("{msg_id, method, args, response}", {msg_id, method, args, response})
      if(msg_id in window.ping_start_times) {
          clearTimeout(checkConnectionTimerId)
          checkConnectionTimerId = setTimeout(() => {this.setState({
            connectionLost: true
          })}, 1000)
          var ping_time = new Date() - ping_start_times[msg_id];
          this.setState({
            ping: ping_time
          })
          delete ping_start_times[msg_id];

      }
    }))

  }

  render() {
   const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static" className={classes.header}>
          <Toolbar className="header-toolbar">
            <div className="Logo">Dagger4</div>
            <div className="connection-info">
              <div className={this.state.connectionLost ? "connection-lost" : "connection-lost hidden"}>connection lost</div>
              <div className="Ping">Ping: {this.state.ping}ms</div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button key='Restart Server'>
            <ListItemText primary='Restart Server' onClick={this.handleClickOpen} />
          </ListItem>
          <ListItem button key='Commitsets'>
            <Link to={'/commitsets-page'}><ListItemText primary='Commitsets' /></Link>
          </ListItem>
          <ListItem button key='Commits'>
            <Link to={'/commits-page'}><ListItemText primary='Commits' /></Link>
          </ListItem>
          <ListItem button key='Build commit'>
            <Link to={'/build_commit'}><ListItemText primary='Build commit' /></Link>
          </ListItem>
          <ListItem button key='Workers'>
            <Link to={'/workers'}><ListItemText primary='Workers' /></Link>
          </ListItem>
          <ListItem button key='Worker'>
            <Link to={'/worker'}><ListItemText primary='Worker Logs' /></Link>
          </ListItem>
          <ListItem button key='Nodes'>
            <Link to={'/nodes'}><ListItemText primary='Nodes'/></Link>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <div className="main-content">
      <Switch>

        <Route path='/commitsets-page' component={CommitSetsPage}/>
        <Route path='/commitset-page/:id' component={CommitSetPage}/>
        <Route path='/workers' component={Workers}/>
        <Route path='/worker' component={Worker}/>
        <Route path='/nodes' component={Nodes}/>
        <Route path='/build_commit' component={BuildCommit}/>
        <Route path='/node/:id' component={Node}/>
        <Route path='/commits-page' component={CommitsPage}/>
        <Route path='/commit-page/:id' component={CommitPage}/>


      </Switch>
      </div>
      <Dialog
          open={this.state.modalIsOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Alert!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to restart the server?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
            open={this.state.secondModalIsOpen}
            onClose={this.handleSecondClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"No probs!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please wait a few seconds and refresh this page
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSecondClose} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>

      </div>
    );
  }
}

export default withStyles(styles)(App);
