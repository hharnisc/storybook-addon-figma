import React from 'react'
import { storiesOf } from '@storybook/react'
import { WithFigma } from '../index'

storiesOf('Button')
  .add('With Figma', () => (
    <WithFigma
      url={'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File'}
    >
      <button>Hi 👋</button>
    </WithFigma>
  ))
  .add('With Figma No Fullscreen Option', () => (
    <WithFigma
      url={'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File'}
      allowFullScreen={false}
    >
      <button>Hi 👋</button>
    </WithFigma>
  ))
  .add('Without Figma', () => (
    <button>Hi 👋</button>
  ))
