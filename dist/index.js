
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./yoco-react.cjs.production.min.js')
} else {
  module.exports = require('./yoco-react.cjs.development.js')
}
