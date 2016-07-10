// test/hello-world.js
var tap = require('tap')
var cli = require('../lib/cli')

tap.test('this is a test testing test', function (t) {
  t.plan(1)

  t.ok('this is fine')
})

// read in markdown file
  // get file name from command line
  // read file

tap.test('using a real filename should return true', function (t) {
  t.ok(cli.argv({ _: ['run', '../test.md'] }))
  t.end()
})

// parse file
// create structure
// output .html

