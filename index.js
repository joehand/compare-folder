var assert = require('assert')
var fs = require('fs')
var path = require('path')
var countFiles = require('count-files')

module.exports = compare

function compare (dir1, dir2, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }
  assert.ok(dir1 && dir2, 'compare-folder: two directories required')
  assert.ok(cb, 'compare-folder: callback required')
  if (!opts) opts = {}

  var one = parse(dir1)
  var two = parse(dir2)
  var pending = 2

  var countOne = countFiles(one, opts, done)
  var countTwo = countFiles(two, opts, done)

  function done (err) {
    if (err) return cb(err)
    if (--pending) return

    if (countOne.files !== countTwo.files) return cb(null, false)
    if (countOne.bytes !== countTwo.bytes) return cb(null, false)
    if (countOne.dirs !== countTwo.dirs) return cb(null, false)
    return cb(null, true)
  }

  function parse (name) {
    if (typeof name === 'string') return {name: path.resolve(name), fs: fs}
    name.name = path.resolve(name.name)
    if (!name.fs) name.fs = fs
    return name
  }
}
