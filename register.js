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
  static initialState = {
    embedHost: 'storybook',
    // TODO: make this empty by default
    url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    allowFullScreen: true,
  }
  static propTypes = {
    channel: PropTypes.object,
    api: PropTypes.object,
  }
  static defaultProps = {
    channel: {},
    api: {},
  }

  constructor(...args) {
    super(...args)
    this.state = {
      ...FigmaPanel.initialState,
    }
    this.onAddFigma = this.onAddFigma.bind(this)
  }

  componentDidMount() {
    const { channel, api } = this.props
    channel.on(EVENT_ID, this.onAddFigma)

    this.stopListeningOnStory = api.onStory(() => {
      this.onAddFigma({ ...FigmaPanel.initialState })
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

  onAddFigma({
    embedHost,
    url,
    allowFullScreen,
  }) {
    this.setState({
      embedHost,
      url,
      allowFullScreen,
    })
  }

  render() {
    const {
      url,
      allowFullScreen,
      embedHost,
    } = this.state;
    return (
      <iframe
        height="100%"
        width="100%"
        frameBorder="0"
        src={`https://www.figma.com/embed?embed_host=${embedHost}&url=${url}`}
        allowFullScreen={allowFullScreen}
      />
    )
  }
}

addons.register(ADDON_ID, api => {
  addons.addPanel(PANEL_ID, {
    title: 'Figma',
    render: () => <FigmaPanel channel={addons.getChannel()} api={api} />,
  })
})
