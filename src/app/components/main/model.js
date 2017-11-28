import Backbone from 'backbone'

import _ from 'lodash'

import xss from 'xss'

import Constants from '../constants'

export default Backbone.Model.extend({
  defaults: {
    // Input
    city: null,
    country: null,
    // Temperatures
    temp_min: null,
    temp_max: null,
    mode: Constants.MODE.CELSIUS,
    // Socket
    latency: null,
    // Preloader
    isLoading: false,
    loadingMessage: null,
    // State
    error: null,
    errorMessage: null
  },

  initialize: function(){
    this.on('change:city change:country', this.getTemperature, this);
  },
  /*
  
  Quick and simple function that will already return the correct Promise system

   */
  getJSON: function(url) {
    let promise = new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*;');
      xhr.setRequestHeader('Content-Type', 'text/plain');

      xhr.onload = () => {
        if(xhr.status === 200){
          resolve(JSON.parse(xhr.responseText));
        } else if(xhr.status === 400 || xhr.status === 404) {
          reject(JSON.parse(xhr.responseText));
        } else {
          reject(xhr)
        }
      };

      xhr.send();
    });

    return promise;
  },
  /*
  
  Clear everything except for the User input

   */
  reset: function(){
    let data = this.toJSON();

    // Clear model before getting new data
    this.clear({ silent: true });
    this.set(_.defaults({
      city: data.city,
      country: data.country,
    }, this.defaults), { silent: true });
  },
  /*
  
  Remove only the loading state

   */
  free: function(){
    this.set({
      isLoading: false
    }, { silent: true });
  },
  /*
  
  Clear only the error box

   */
  clear: function(){
    this.set({
      error: false
    }, { silent: true });
  },
  /*
  
  Fetch the temperature from the target WEATHER API

   */
  getTemperature: function() {
    this.clear();

    let city = this.get('city');
    let country = this.get('country');

    /*
    
    Just a small protection
    This replaces all special signs such as àáãâ and leaving only the plain 'a' behind
    Since the weather API does not support such characters

    Also applied a small XSS function to prevent injections on the querystring
    The same was done on the NODEjs end

     */
    let query = `${city},${country}`.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    return this.getJSON(Constants.WEATHER_API_URL + '?q='+ xss(query) +'&appid=' + Constants.WEATHER_API_KEY)
    .then((data) => {
      this.free();
      this.set({
        'temp_min': data.main.temp_min,
        'temp_max': data.main.temp_max
      });

      this.trigger('synced', this.toJSON());
    }, (error) => {
      this.reset();
      this.set({
        error: true,
        errorMessage: Constants.MESSAGES.CITY_ERROR
      });

      this.trigger('error', error);
    });
  },
  /*
  
  Helper function to fetch the USER info from the IP API

   */
  getLocationByIP: function() {
    this.clear();

    return this.getJSON('https://ipinfo.io')
    .then((data) => {
      this.free();
      this.set({
        'city': data.city,
        'country': data.country
      });
    }, () => {
      this.set({
        error: true,
        errorMessage: Constants.MESSAGES.LOCATION_ERROR
      });
    });
  },
  /*
  
  The weather system only works with Kelvin and I could not find
  any querystring param to set it to C or F

   */
  parseKelvinToCelsius: function(temperature){
    return temperature - 273.15;
  },
  /*
  
  Custom serialize to take into consideration the MDOE
  for now it will only Convert or not to Celsius
  The property is on the Model, you can bind it to a Checkbox and
  make the view change in real time between C <-> K

   */
  serialize: function(){
    let data = this.toJSON();
    let mode = Constants.MODE.KELVIN;

    if(data.temp_min !== null && data.temp_max !== null){

      if(this.get('mode') === Constants.MODE.CELSIUS){
        mode = Constants.MODE.CELSIUS;
        /*
        
        Precision 3 to keep only 2 houses after comma

         */
        data.temp_min = this.parseKelvinToCelsius(data.temp_min).toPrecision(3);
        data.temp_max = this.parseKelvinToCelsius(data.temp_max).toPrecision(3);
      }

      data.temp_min = data.temp_min + ' ' + mode;
      data.temp_max = data.temp_max + ' ' + mode;
    }

    return data;
  }
})