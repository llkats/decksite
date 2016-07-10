# decksite

Convert your Deckset markdown file into a little responsive site with your notes next to the slides.

## based on `markdown-it`

- using `markdown-it` to parse the markdown into HTML
- starting with surrounding each slide with an `<article>` element

### deckset markdown

Slides in Deckset are separated by newlines and an `<hr>` tag: `---`

So a markdown file containing the following structure:

```markdown
  # the first slide

  this is the first slide

  ^ here are some notes

  ---

  # the second slide

  this is the second slide

  ^ here are some more notes

  ---

  # the third slide

  hi i am a third slide

  ^ whoa even more notes
```

should output the following markup

```html
  <article class="slides">
    <p>this is the first slide</p>
    <p>^ here are some notes</p>
  </article>
  <article class="slides">
    <h1>the second slide</h1>
    <p>this is the second slide</p>
    <p>^ here are some more notes</p>
  </article>
  <article class="slides">
    <h1>the third slide</h1>
    <p>hi i am a third slide</p>
    <p>^ whoa even more notes</p>
  </article>
```
