/* eslint-disable */
import _ from 'lodash';

const subscribeObject = {};
export const subscribe = (method, callback) => {
  if (!subscribeObject[method]) {
    subscribeObject[method] = []
  }
  subscribeObject[method].push(callback)
}
let onOpenResolve;
export const onOpenPromise = new Promise ((resolve) => {
  onOpenResolve = resolve;
})

export const client = new Client("35.176.145.209", () => {
    onOpenResolve();
    window.ping_start_times = [];
    window.setInterval(function(){
        var msg_id = client.ping();
        window.ping_start_times[msg_id] = new Date();
    }, 500);
}, (msg_id, method, args, response) => {
    // if(method == "ping" && msg_id in ping_start_times) {
    //     clearTimeout(checkConnection)
    //     checkConnection = setTimeout(() => {this.setState({
    //       connectionLost: true
    //     })}, 1000)
    //     var ping_time = new Date() - ping_start_times[msg_id];
    //     this.setState({
    //       ping: ping_time
    //     })
    //     delete ping_start_times[msg_id];
    //
    // } else {
    //     console.log("Response", msg_id, method, args, response);
    // }

    _.forEach(subscribeObject[method], subscriber => {
      subscriber({msg_id, method, args, response})
    })

    console.log("Response", msg_id, method, args, response);


})

 window.ClientInstance = client // For easy testing in dev tools
