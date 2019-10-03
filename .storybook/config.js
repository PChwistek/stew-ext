import { configure } from '@storybook/react'

function loadStories() {
  require('../src/test/stories/index.stories.js')
  require('../src/test/stories/popup.stories.js')
  // You can require as many stories as you need.
}

configure(loadStories, module)