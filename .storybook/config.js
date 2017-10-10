import { configure } from '@storybook/react'

const loadStories = () => {
  require('./Button.story.jsx')
  require('./App.story.jsx')
}

configure(loadStories, module)
