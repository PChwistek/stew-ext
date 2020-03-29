import { configure } from '@storybook/react'

function loadStories() {
  require('../src/test/stories/button.stories.js')
  require('../src/test/stories/checkbox.stories.js')
  require('../src/test/stories/textfield.stories.js')
  require('../src/test/stories/header.stories.js')
  require('../src/test/stories/search.stories.js')
  require('../src/test/stories/slidein.stories.js')
  require('../src/test/stories/modal.stories.js')
  require('../src/test/stories/login.stories.js')
  require('../src/test/stories/popup.stories.js')
  require('../src/test/stories/menu.stories.js')
  // You can require as many stories as you need.
}

configure(loadStories, module)