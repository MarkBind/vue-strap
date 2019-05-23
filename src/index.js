import affix from './Affix.vue'
import closeable from './directives/Closeable'
import dropdown from './Dropdown.vue'
import modal from './Modal.vue'
import navbar from './Navbar.vue'
import panel from './Panel.vue'
import pic from './Pic.vue'
import popover from './Popover.vue'
import question from './Question.vue'
import retriever from './Retriever.vue'
import searchbar from './Searchbar.vue'
import tab from './Tab.vue'
import tabGroup from './TabGroup.vue'
import tabset from './Tabset.vue'
import thumbnail from './Thumbnail.vue'
import tipBox from './TipBox.vue'
import tooltip from './Tooltip.vue'
import trigger from './trigger.vue'
import typeahead from './Typeahead.vue'

const components = {
  affix,
  box: tipBox,
  dropdown,
  modal,
  navbar,
  panel,
  pic,
  popover,
  question,
  retriever,
  searchbar,
  tab,
  tabGroup,
  tabs: tabset,
  thumbnail,
  tipBox,
  tooltip,
  trigger,
  typeahead,
}

const directives = {
  closeable,
}

function install (Vue) {
  if (install.installed) return
  install.installed = true

  Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key])
  })
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}

const VueStrap = {
  install,
  components: {}
}

Object.keys(components).forEach((key) => {
  VueStrap.components[key] = components[key]
})

module.exports = VueStrap
