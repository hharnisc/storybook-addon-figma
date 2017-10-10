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
