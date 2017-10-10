import React from 'react'
import { storiesOf } from '@storybook/react'
import figmaDecorator from '../src/index'

storiesOf('App')
  .addDecorator(figmaDecorator({
    url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    allowFullScreen: true
  }))
  .add('My App', () => (
    <div
      style={{
        background: 'black',
        color: 'white',
        height: 640,
        width: 320,
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          padding: '1rem 0',
          textAlign: 'center'
        }}
      >
        @Khloe
      </div>
      <div
        style={{
          padding: '1rem 0',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            background: 'white',
            height: '5rem',
            width: '5rem',
            borderRadius: '10rem',
            display: 'inline-block'
          }}
        />
      </div>
    </div>
  ))
