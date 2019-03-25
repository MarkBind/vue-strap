<template>
  <nav ref="navbar" :class="['navbar', 'navbar-expand-md',
  {
    'navbar-dark':(type === 'inverse'),
    'navbar-light':(type === 'default'),
    'bg-dark':(type === 'inverse'),
    'bg-light':(type === 'default')
  }, addClass]">
    <div class="container-fluid">
      <div class="navbar-brand"><slot name="brand"></slot></div>
      <button v-if="!slots.collapse" class="navbar-toggler" type="button" aria-expanded="false" aria-label="Toggle navigation" @click="toggleCollapse">
        <span class="navbar-toggler-icon"></span>
        <slot name="collapse"></slot>
      </button>

      <div :class="['navbar-collapse',{collapse:collapsed}]">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <slot></slot>
        </ul>
        <ul v-if="slots.right" class="navbar-nav navbar-right">
          <slot name="right"></slot>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import $ from './utils/NodeList.js'

export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    addClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      id: 'bs-example-navbar-collapse-1',
      collapsed: true,
      styles: {}
    }
  },
  computed: {
    slots () {
      return this.$slots
    }
  },
  methods: {
    toggleCollapse (e) {
      e && e.preventDefault()
      this.collapsed = !this.collapsed
    }
  },
  created () {
    this._navbar = true
  },
  mounted () {
    let $dropdown = $('.dropdown>[data-toggle="dropdown"]',this.$el).parent()
    $dropdown.on('click', '.dropdown-toggle', (e) => {
      e.preventDefault()
      $dropdown.each((content) => {
        if (content.contains(e.target)) content.classList.toggle('open')
      })
    }).on('click', '.dropdown-menu>li>a', (e) => {
      $dropdown.each((content) => {
        if (content.contains(e.target)) content.classList.remove('open')
      })
    }).onBlur((e) => {
      $dropdown.each((content) => {
        if (!content.contains(e.target)) content.classList.remove('open')
      })
    })
    $(this.$el).on('click','li:not(.dropdown)>a', e => {
      setTimeout(() => { this.collapsed = true }, 200)
    }).onBlur(e => {
      if (!this.$el.contains(e.target)) { this.collapsed = true }
    })
    if (this.slots.collapse) $('[data-toggle="collapse"]',this.$el).on('click', (e) => this.toggleCollapse(e))
  },
  beforeDestroy () {
    $('.dropdown',this.$el).off('click').offBlur()
    if (this.slots.collapse) $('[data-toggle="collapse"]',this.$el).off('click')
  }
}
</script>

<style scoped>
@media (max-width: 767px) {
  .navbar-collapse {
    max-height: 80vh !important;
    overflow-x: hidden !important;
    overflow-y: scroll !important;
  }
}
</style>
