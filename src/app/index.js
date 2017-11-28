import 'babel-polyfill'

import 'isomorphic-fetch'

import 'normalize.css'

import 'flexboxgrid/dist/flexboxgrid.min.css'
// This is required in order to use Semantic-UI since it does not support modules yet
window.$ = window.jQuery = require('jquery')

import Backbone from 'backbone'

import '../styles/index.css'
// Must be required to get into the same context as jQuery
require('semantic-ui-css/semantic.css')
require('semantic-ui-css/semantic.js')

import Router from './router'

// eslint-disable-next-line
new Router()

Backbone.history.start()