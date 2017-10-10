import React from 'react'
import PropTypes from 'prop-types'
import addons from '@storybook/addons'
import {
  ADDON_ID,
  PANEL_ID,
  EVENT_ID,
} from './shared'

const styles = {
  notesPanel: {
    margin: 10,
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#444',
    width: '100%',
    overflow: 'auto',
  },
}

export class FigmaPanel extends React.Component {
  static defaultProps = {
    embedHost: 'storybook',
    // TODO: make this empty by default
    url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    allowFullscreen: true,
  }

  constructor(...args) {
    super(...args)
    this.state = {
      embedHost: 'storybook',
      url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
      allowFullscreen: true,
    }
    this.onAddFigma = this.onAddFigma.bind(this)
  }

  componentDidMount() {
    const { channel, api } = this.props
    channel.on(EVENT_ID, this.onAddFigma)

    this.stopListeningOnStory = api.onStory(() => {
      this.onAddFigma('')
    })
  }

  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory()
    }

    this.unmounted = true
    const { channel } = this.props
    channel.removeListener(EVENT_ID, this.onAddFigma)
  }

  onAddFigma(text) {
    this.setState({ text })
  }

  render() {
    const {
      url,
      allowFullscreen,
      embedHost,
    } = this.state;
    return (
      <iframe
        height="100%"
        width="100%"
        frameBorder="0"
        src={`https://www.figma.com/embed?embed_host=${embedHost}&url=${url}`}
        allowfullscreen={allowFullscreen}
      />
    )
  }
}

FigmaPanel.propTypes = {
  channel: PropTypes.object,
  api: PropTypes.object,
}
FigmaPanel.defaultProps = {
  channel: {},
  api: {},
}

addons.register(ADDON_ID, api => {
  addons.addPanel(PANEL_ID, {
    title: 'Figma',
    render: () => <FigmaPanel channel={addons.getChannel()} api={api} />,
  })
})
