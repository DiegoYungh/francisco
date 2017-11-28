<div class="dashboard ui raised very padded text container segment">

  <% if(isLoading){ %>
  <div class="ui dimmer active">
    <div class="ui indeterminate text loader"></div>
  </div>
  <%}%>

  <div class="weather_title">Chico<br>Weather</div>
  <img class="ui small image weather__logo" src="/static/logo.png" alt="Francisco Weather Utility">

  <div class="ui form" >
    <div class="ui search fluid">
      <div class="ui icon input fluid">
        <input class="prompt search__city" type="text" placeholder="Try searching for a city..." value="<%= city %>">
        <i class="search icon"></i>
      </div>
      <div class="results"></div>
    </div>
  </div>
  
  <% if(latency){ %>
  <p class="socket__message">Websocket took <strong><%= latency %></strong> seconds to return message</p>
  <% } %>

  <% if(error){ %>
  <div class="ui error message" data-transition="fade left in">
    <p><%= errorMessage %></p>
  </div>
  <% } else { %>

  <% if(temp_max && temp_min){ %>
  <div class="temperature__message">
    <div class="temperature__city"><%= city %></div>
    <div class="temperature__max">has high of <span><%= temp_max %></span></div>
    <div class="temperature__min">and low of <span><%= temp_min %></span></div>
  </div>
  <% } %>
  <% } %>
</div>
