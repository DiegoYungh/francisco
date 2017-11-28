import $ from 'jquery'

import Backbone from 'backbone'

import Main from 'app/components/main/index'

/*
  Nothing special here, just a dummy file to render the only module
  If we were going to support state such as /:city/:firecast-type
  Then we would made better use of the Router
 */

export default Backbone.Router.extend({
  routes: {
    '': 'home'
  },

  home() {
    const dashboard = new Main().render()

    $('#root').empty().append(dashboard.$el)
  }
})

