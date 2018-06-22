// import accordion from './Accordion.vue'
// import affix from './Affix.vue'
// import alert from './Alert.vue'
// import aside from './Aside.vue'
// import carousel from './Carousel.vue'
// import checkbox from './Checkbox.vue'
// import closeable from './directives/Closeable'
// import dropdown from './Dropdown.vue'
// import input from './Input.vue'
// import modal from './Modal.vue'
// import navbar from './Navbar.vue'
// import panel from './Panel.vue'
// import pic from './Pic.vue'
// import popover from './Popover.vue'
import question from './Question.vue'
// import retriever from './Retriever.vue'
// import searchbar from './Searchbar.vue'
// import select from './Select.vue'
// import showModal from './directives/ShowModal'
// import tab from './Tab.vue'
// import tabGroup from './TabGroup.vue'
// import tabset from './Tabset.vue'
// import tipBox from './TipBox.vue'
// import tooltip from './Tooltip.vue'
// import trigger from './trigger.vue'
// import typeahead from './Typeahead.vue'

const components = {
  // accordion,
  // affix,
  // aside,
  // box: tipBox,
  // checkbox,
  // dropdown,
  // modal,
  // navbar,
  // panel,
  // pic,
  // popover,
  question,
  // retriever,
  // searchbar,
  // select,
  // tab,
  // tabGroup,
  // tabs: tabset,
  // tipBox,
  // tooltip,
  // trigger,
  // typeahead,
}

// const directives = {
//   closeable,
//   showModal
// }

function install (Vue) {
  if (install.installed) return
  install.installed = true

  // Object.keys(directives).forEach((key) => {
  //   Vue.directive(key, directives[key])
  // })
  // Object.keys(components).forEach((key) => {
  //   Vue.component(key, components[key])
  // })
}

function installEvents (vm) {
  // vm.$on('modal:shouldShow', function (name) {
  //   this.$broadcast('modal:show', name)
  // })
  // vm.$on('trigger:register', function (el, name) {
  //   this.$broadcast('trigger:bind', el, name)
  // })
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
