var fs = require('fs')
var path = require('path')
var MarkdownIt = require('markdown-it')
var md = new MarkdownIt()

// this isn't exactly what i need
// but i could probably fork mdcontainer or just go off of how it parses/transforms

md.use(require('../../markdown-it-decksetter.js'), 'slides', {

  marker: '-'

  // validate: function (params) {
  //   console.log(params, 'hi')
  //   return params.trim().match(/^this\s+(.*)$/)
  // },

  // render: function (tokens, idx) {
  //   var m = tokens[idx].info.trim().match(/^this\s+(.*)$/)
  //   console.log('render', tokens, idx)

  //   if (tokens[idx].nesting === 1 && m && m[1]) {
  //     // opening tag
  //     return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n'
  //   } else {
  //     // closing tag
  //     return '</details>\n'
  //   }
  // }
})

var decker = {}

decker.run = function (filename) {
  if (!fs.existsSync(filename)) {
    return false
  }
  var template = path.resolve(__dirname, '../templates/template.html')

  fs.readFile(template, 'utf8', function (err, templatedata) {
    if (err) {
      console.log(err)
      return false
    }

    fs.readFile(filename, 'utf8', function (err, markdowndata) {
      if (err) {
        console.log(err)
        return false
      }

      // console.log(markdowndata)

      return console.log(md.render(markdowndata))
      // return console.log(templatedata + md.render(markdowndata))
      // return templatedata + md.render(markdowndata)
      // return md.render(markdowndata)
    })
  })
}

module.exports = decker
