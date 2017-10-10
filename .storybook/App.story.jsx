import React from 'react'
import { storiesOf } from '@storybook/react'
import figmaDecorator from '../index'

storiesOf('App')
  .addDecorator(figmaDecorator({
    url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    allowFullScreen: true
  }))
  .add('default', () => (
    <button>Hi 👋</button>
  ))
  .add('another default', () => (
    <button>Hello! 👋</button>
  ))
