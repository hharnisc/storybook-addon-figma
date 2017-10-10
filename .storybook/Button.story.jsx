import React from 'react'
import { storiesOf } from '@storybook/react'
import { WithFigma } from '../src/index'

const style = {
      margin: 0,
      padding: '0.7rem 1.5rem',
      background: '#168eea',
      color: 'white',
      border: 0,
      borderRadius: '2rem',
      cursor: 'pointer',
    };

storiesOf('Button')
  .add('With Figma', () => (
    <WithFigma
      url={'https://www.figma.com/file/LbcvMJxDtshDmYtdyfJfkA72/Button-Primary'}
    >
      <button
        style={style}
      >
        Button Primary
      </button>
    </WithFigma>
  ))
  .add('With Figma No Fullscreen Option', () => (
    <WithFigma
      url={'https://www.figma.com/file/LbcvMJxDtshDmYtdyfJfkA72/Button-Primary'}
      allowFullScreen={false}
    >
      <button
        style={style}
      >
        Button Primary
      </button>
    </WithFigma>
  ))
  .add('Without Figma', () => (
    <button
      style={style}
    >
      Button Primary
    </button>
  ))
