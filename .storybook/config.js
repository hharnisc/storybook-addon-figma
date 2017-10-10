import { configure } from '@storybook/react'

function loadStories() {
  require('./Button.story.jsx')
}

configure(loadStories, module)
