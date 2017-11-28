# Chico Weather Utility

Sample prototype to demonstrate the simplicity of Backbone to consume a REST API and emit Socket information.
development. ES6, css-next, eslint, Backbone, Lodash, Marionette, Handlebars, Semantic-UI.


### Getting Started

Just [clone](github-windows://openRepo/https://github.com/DiegoYungh/francisco) or [fork](https://github.com/DiegoYungh/francisco/fork) the repo and start messing around:

```shell
$ yarn install
$ cp .env.example .env
```

### Development
Uses webpack-dev-server with HMR to serve your app:

```shell
$ yarn dev
```

### Note on css
This project uses postcss with a few plugins in order to provide a modern approach
to dealing with css. It runs autoprefixer by default, supports nested classes,
imports and everything else that [css-next](http://cssnext.io/) has to offer.

### Production build
This will build a minified version of the app and will output everything into
the `public/` folder:

```shell
$ yarn build
```

If you wanna serve the production app you can do so by running:

```shell
$ yarn start
```

### A Note on ES Classes
ES2015 Classes do *not* work well with Backbone or Marionette at time of writing. See https://github.com/jashkenas/backbone/issues/3560. Use Backbone's built in extend functions to get around this for the time being.


### Learn More

 * [jQuery](https://jquery.com/)
 * [Lodash](https://lodash.com/)
 * [Handlebars](http://handlebarsjs.com/)
 * [Backbone.js](http://backbonejs.org/)
 * [Marionette.js](http://marionettejs.com/)
 * [Webpack](https://webpack.js.org/)
 * [Babel](https://babeljs.io/)
 * [css-next](http://cssnext.io/)
 * [eslint](http://eslint.org/)

### Support

Have feedback, feature request or need help? Create an issue !

## License

This was made using a boilerplate project from [Ignacio Rivas](https://github.com/sabarasaba)

The MIT License (MIT)

Copyright (c) 2017 [Ignacio Rivas](https://github.com/sabarasaba)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
