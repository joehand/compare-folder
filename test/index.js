var fs = require('fs')
var path = require('path')
var test = require('tape')
var hyperdrive = require('hyperdrive')
var ram = require('random-access-memory')
var mirror = require('mirror-folder')
var compare = require('..')

var fixtures = path.join(__dirname, 'fixtures')

test('same - regular fs string', function (t) {
  compare(fixtures, fixtures, function (err, isSame) {
    t.ifError(err)
    t.ok(isSame, 'same dir is same')
    t.end()
  })
})

test('not same - regular fs with string', function (t) {
  var dir = path.join(__dirname)
  compare(fixtures, dir, function (err, isSame) {
    t.ifError(err)
    t.notOk(isSame, 'not the same')
    t.end()
  })
})

test('same - regular fs and name', function (t) {
  compare({fs: fs, name: fixtures}, {fs: fs, name: fixtures}, function (err, isSame) {
    t.ifError(err)
    t.ok(isSame, 'same dir is same')
    t.end()
  })
})

test('not same - regular fs with string', function (t) {
  var dir = path.join(__dirname)
  compare({fs: fs, name: fixtures}, {fs: fs, name: dir}, function (err, isSame) {
    t.ifError(err)
    t.notOk(isSame, 'not the same')
    t.end()
  })
})

test('same - custom fs', function (t) {
  var archive = hyperdrive(ram)
  mirror(fixtures, {fs: archive, name: '/'}, function (err) {
    t.error(err, 'no error')
    compare({fs: archive, name: '/'}, fixtures, function (err, isSame) {
      t.error(err, 'no error')
      t.ok(isSame, 'same dir is same')
      t.end()
    })
  })
})

test('not same - custom fs', function (t) {
  var dir = path.join(__dirname)
  var archive = hyperdrive(ram)
  mirror(fixtures, {fs: archive, name: '/'}, function (err) {
    t.error(err, 'no error')

    compare({fs: archive, name: '/'}, dir, function (err, isSame) {
      t.ifError(err)
      t.notOk(isSame, 'different dir are not same')
      t.end()
    })
  })
})
