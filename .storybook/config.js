import { configure } from '@storybook/react'

function loadStories() {
  require('../src/test/stories/button.stories.js')
  require('../src/test/stories/checkbox.stories.js')
  require('../src/test/stories/textfield.stories.js')
  require('../src/test/stories/login.stories.js')
  require('../src/test/stories/popup.stories.js')
  // You can require as many stories as you need.
}

configure(loadStories, module)