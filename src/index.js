import accordion from './Accordion.vue'
import affix from './Affix.vue'
import alert from './Alert.vue'
import aside from './Aside.vue'
import carousel from './Carousel.vue'
import checkbox from './Checkbox.vue'
import dropdown from './Dropdown.vue'
import dynamicPanel from './DynamicPanel.vue'
import input from './Input.vue'
import modal from './Modal.vue'
import morph from './Morph.vue'
import navbar from './Navbar.vue'
import question from './Question.vue'
import panel from './Panel.vue'
import popover from './Popover.vue'
import retriever from './Retriever.vue'
import select from './Select.vue'
import tab from './Tab.vue'
import tabGroup from './TabGroup.vue'
import tabset from './Tabset.vue'
import tooltip from './Tooltip.vue'
import closeable from './directives/Closeable'
import showModal from './directives/ShowModal'
import pic from './Pic.vue'
import tipBox from './TipBox.vue'
import trigger from './trigger.vue'
import typeahead from './Typeahead.vue'
import searchbar from './Searchbar.vue'

const components = {
  accordion,
  affix,
  aside,
  checkbox,
  dropdown,
  dynamicPanel,
  modal,
  morph,
  navbar,
  question,
  panel,
  popover,
  retriever,
  select,
  tab,
  tabGroup,
  tabs: tabset,
  tipBox,
  tooltip,
  pic,
  trigger,
  typeahead,
  searchbar
}

const directives = {
  closeable,
  showModal
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

function installEvents (vm) {
  vm.$on('modal:shouldShow', function (name) {
    this.$broadcast('modal:show', name)
  })
  vm.$on('retriever:fetched', function (el) {
    vm.$compile(el);
  })
  vm.$on('trigger:register', function (el, name) {
    this.$broadcast('trigger:bind', el, name)
  })
}

const VueStrap = {
  install,
  installEvents,
  components: {}
}

Object.keys(components).forEach((key) => {
  VueStrap.components[key] = components[key]
})

module.exports = VueStrap
