import Backbone from 'backbone'

/*

Socket dedicated logic to emit te temperature, reeceive the feedback
and trigger the difference

 */
export default Backbone.Model.extend({
  defaults: {
    url: null,
    seconds: null,
    start: null,
    end: null
  },
  /*
  
  Leave the connection Open

   */
  initialize: function(){
    this.socket = new WebSocket(this.get('url'));
    this.socket.onmessage = this.handleMessage.bind(this);
  },
  /*
  
  We are not sending massages rightaway so there is no need 
  getting the socket object

   */
  handleConnection: function(socket){},
  /*
  
  When we get the echo/feedback
  calculate the Delta time and trigger it to refresh teh UI

   */
  handleMessage: function(message){
    let start = this.get('start');
    let end = new Date();

    this.set({
      seconds: Math.abs((end - start) / 1000),
      end: end
    });

    this.trigger('afterResponse', this.toJSON());
  },
  /*
  
  Send the temperature and capture the first timeStamp

   */
  sendTemperature: function(temperature){
    this.set({
      start: new Date,
      end: null
    });

    this.trigger('beforeSend', this.toJSON());
    this.socket.send(temperature.toString());
  }
})