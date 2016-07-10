var decksite = require('../decksite')

module.exports = function (argv, callback) {
  var command = argv._[0]
  var second = argv._[1]

  // --silent or --quiet or -q
  argv.silent = argv.silent || argv.quiet || argv.q
  // --verbose or -v
  argv.verbose = argv.verbose || argv.v

  if (command === 'run') {
    decksite.run(second)
  }

  // if (argv.verbose) {
  //   decksite.on('log', function (message) {
  //     console.log(message)
  //   })

  //   decksite.on('warn', function (message) {
  //     console.warn(message)
  //   })

  //   decksite.on('error', function (message) {
  //     console.error(message)
  //     process.exit(1)
  //   })
  // }
}
