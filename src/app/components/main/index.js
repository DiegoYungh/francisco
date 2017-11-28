import Marionette from 'backbone.marionette'

import template from './index.tpl'

import model from './model'

import SocketService from '../socket/socketService'

import Constants from '../constants'

import * as $ from 'jquery'

import * as _ from 'lodash'

/*

  Marionette was used just because it has better template/event support
  The point here was to use Backbone, but this flat model that I used is pretty easy
  to switch to a React/Immutable state, we would get better performance, specially over
  the animations that wouldn't flick anymore because of the rendering process

  Here instead of overwritting the rendering process I just delegated it ot the event system
  and made the rest trigger the target events.

  */

  export default Marionette.View.extend({
    template,
  /*
  
  Initialize the Socket connection, model and bootstrap te user location
  I choose to use the IP locator instead of the intrusive HTML5 geolocation API
  for this case. Less questions to the user and most of the users don't use proxies
  so the IP recognition will work just fine.

  The Throttling on the render function is a small workaround to prevent multipe events 
  spamming the redraw process

  */
  initialize: function(){
    this.socket = new SocketService({ url: 'ws://echo.websocket.org/' });

    this.model = new model();
    this.model.on('change', this.render.bind(this));
    this.model.on('synced', this.onGetTemperature.bind(this));

    this.socket.on('afterResponse', (data) => { this.model.set({ latency: data.seconds }); });

    // Bootstrap application with user aprox location
    this.model.getLocationByIP();
    this.model.set({
      isLoading: true,
      loadingMessage: Constants.MESSAGES.LOADING_APPLICATION
    });

    // Test
    this.render = _.throttle(this.render, 2000, {
      trailing: true
    });
  },
  /*
  
  Map the only interessat DOMNode and Setup rendered items such as the
  Search field and the Animated logo

  */
  onRender: function(){
    this.searchInput = this.$el.find('.ui.search');

    this.setupSearch();

    this.startAnimationLoop();
  },
  /*
  
  Initialize the autocomplete widget
  It is set to use my private server since there are no free
  city/country search on the web, I downloaded a JSON and made
  a small NODEjs API to serve this to us

  You can check it on: https://github.com/DiegoYungh/francisco-country-api
  I will leave it accessible on http://yungh.com.br/search/:city

  */
  setupSearch: function(){
    this.searchInput
    .search({
      searchOnFocus: false,
      maxResults: 7,
      apiSettings: {
        url: Constants.CITIES_API_URL,
        onResponse: function(response){
          // Forcing map here is necessary since for maxResults to work it must be
          // an Array instead of Hash/indexed object
          // Also wrap everything into a "results" key since it seems to be mandatory
          // for this widget to work
          return {results: _.map(response)};
        }
      },
      // Remap the fields of the API
      fields: {
        results: 'results',
        title: 'name',
        description: 'country'
      },
      onSelect: (city) => {
        this.handleCityInput(city);
      }
    });
  },
  /*
  
  Start pulsing the logo very slowly
  Just a small charm

  */
  startAnimationLoop: function(){
    this.$el.find('.weather__logo')
    .transition('set looping')
    .transition({
      animation: 'pulse',
      duration: 5000,
      interval: 200
    })
  },
  /*
  
  Get notified when the Service is done getting the weather info
  This wa we can trigger the Socket emitter

  */
  onGetTemperature: function(data){
    // Send the latest max temperature via socket
    this.socket.sendTemperature(data.temp_max);
  },
  /*

  Every modification to the city input will trigger this function
  Also we can trigger it manually as long as you provide a city object

  city: {name: city-name, country: country-code}

  */
  handleCityInput: function(city){

    if(this.model.get('city') === city.name && this.model.get('country') === city.country){
      return;
    }

    this.model.set({
      isLoading: true,
      loadingMessage: Constants.MESSAGES.LOADING_CITY,
      city: city.name,
      country: city.country
    });
  },
  /*

  Send model custom serialized function isntead of toJSON

  */
  serializeData: function(){
    return this.model.serialize();
  }
})