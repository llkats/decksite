// forked from markdown-it-container 2.0.0 https://github.com//markdown-it/markdown-it-container

'use strict'

module.exports = function containerPlugin (md, name, options) {
  function renderDefault (tokens, idx, _options, env, self) {
    // add a class to the opening tag
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrPush([ 'class', name ])
    }

    // console.log(tokens, 'tokens')

    return self.renderToken(tokens, idx, _options, env, self)
  }

  options = options || {}

  var minMarkers = 3
  var markerStr = options.marker || '-'
  var markerChar = markerStr.charCodeAt(0)
  var markerLen = markerStr.length
  var render = options.render || renderDefault
  var isTop = false

  // called over every line, while state accumulates the changes i guess
  function container (state, startLine, endLine, silent) {
    var position
    var nextLine
    var markerCount
    var markup
    var token
    var oldParent
    var oldLineMax
    var autoClosed = false
    var start = state.bMarks[startLine] + state.tShift[startLine] // the current first character of a line
    var max = state.eMarks[startLine] // the index of the last character of a line

    // if this is the first iteration and the marker is not found, this is the first slide
    if (start === 0) {
      isTop = true
    } else if (markerChar !== state.src.charCodeAt(start)) {
      // otherwise if markerChar is not at the beginning of the line, skip to the next line
      // processes the first slide without an opening marker
      return false
    }

    // if first slide, start the position at the very top
    if (isTop) {
      position = start
    } else {
      // otherwise, look for the marker to start the container
      for (position = start + 1; position <= max; position++) {
        if (markerStr[(position - start) % markerLen] !== state.src[position]) {
          break
        }
      }

      // if a marker is found, find its length
      markerCount = Math.floor((position - start) / markerLen)

      // a marker has to be the right length (`---` not just `-`)
      if (markerCount < minMarkers) {
        return false
      }

      // the line beginnings where the markers occur
      position -= (position - start) % markerLen
    }

    // get all of the markup from the start to the next marker
    markup = state.src.slice(startLine, position)

    console.log(startLine, position, markup)

    // Search for the end of the block
    // nextLine = startLine
    nextLine = position + 1

    for (;;) {
      nextLine++

      start = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      // search for the next marker
      for (position = start + 1; position <= max; position++) {
        if (markerStr[(position - start) % markerLen] !== state.src[position]) {
          break
        }
      }

      // closing code fence must be at least as long as the opening one
      if (Math.floor((position - start) / markerLen) < markerCount) {
        continue
      }

      if (position < max) {
        continue
      }

      // found!
      autoClosed = true
      break
    }

    oldParent = state.parentType
    oldLineMax = state.lineMax
    state.parentType = 'container'

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine

    token = state.push('container_slide_open', 'article', 1)
    token.markup = markup
    token.block = true
    token.info = 'slides'
    token.map = [ startLine, nextLine ]

    state.md.block.tokenize(state, startLine + 1, nextLine)

    token = state.push('container_slide_close', 'article', -1)
    token.markup = state.src.slice(start, position)
    token.block = true

    state.parentType = oldParent
    state.lineMax = oldLineMax
    state.line = nextLine + (autoClosed ? 1 : 0)

    return true
  }

  md.block.ruler.before('hr', 'container_slide', container, {
    alt: [ 'paragraph', 'reference', 'blockquote', 'list' ]
  })
  md.renderer.rules['container_slide_open'] = render
  md.renderer.rules['container_slide_close'] = render
}
