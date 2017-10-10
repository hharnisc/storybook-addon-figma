import React from 'react'
import addons from '@storybook/addons'
import { EVENT_ID } from './shared'

export const WithFigma = ({
  children,
  url,
  allowFullScreen,
  embedHost,
}) => {
  addons.getChannel().emit(EVENT_ID, {
    url,
    allowFullScreen,
    embedHost,
  })
  return children
}

export default ({
  url,
  allowFullScreen,
  embedHost,
}) => getStory => {
  addons.getChannel().emit(EVENT_ID, {
    url,
    allowFullScreen,
    embedHost,
  })
  return getStory()
};

function checkA11y(storyFn, context) {
  const channel = addons.getChannel();
  return manager.wrapStory(channel, storyFn, context);
}
