import { configure } from '@storybook/react'

const loadStories = () => require('./Button.story.jsx')

configure(loadStories, module)
