import React from 'react'
import PropTypes from 'prop-types'
import addons from '@storybook/addons'
import {
  ADDON_ID,
  PANEL_ID,
  EVENT_ID,
} from './shared'

export class FigmaPanel extends React.Component {
  static initialState = {
    embedHost: 'storybook',
    url: null,
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
    url,
    embedHost=FigmaPanel.initialState.embedHost,
    allowFullScreen=FigmaPanel.initialState.allowFullScreen,
  }) {
    this.setState({
      url,
      embedHost,
      allowFullScreen,
    })
  }

  render() {
    const {
      url,
      allowFullScreen,
      embedHost,
    } = this.state

    const { active } = this.props;

    if (!url) {
      return (
        <div
          style={{
            margin: '1rem',
            fontFamily: 'Arial',
            fontSize: '1rem',
            color: '#444',
            width: '100%',
            overflow: 'auto',
            display: active ? 'block' : 'none'
          }}
        >
          <strong>Oh Hey! 👋 Add a Figma design to your story:</strong>
          <pre>
          {`
          import React from 'react'
          import { storiesOf } from '@storybook/react'
          import { WithFigma } from 'storybook-addon-figma'

          storiesOf('Button', module)
            .add('default', () => (
              <WithFigma
                url={'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File'}
              >
                <button>Hello</button>
              </WithFigma>
            ))`}
          </pre>
        </div>
      )
    }
    return (
      <iframe
        height="100%"
        width="100%"
        // hide but save in memory
        style={{display: active ? 'block' : 'none'}}
        frameBorder="0"
        src={`https://www.figma.com/embed?embed_host=${embedHost}&url=${url}`}
        allowFullScreen={allowFullScreen}
      />
    )
  }
}

addons.register(ADDON_ID, api => {
  addons.addPanel(PANEL_ID, {
    title: "Figma",
    render: ({ active, key }) => (
      <FigmaPanel key={key} active={active} channel={addons.getChannel()} api={api} />
    )
  });
})
