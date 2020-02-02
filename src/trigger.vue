<template>
    <span ref="trigger" :class="[addClass]"><slot></slot></span>
</template>

<script>
  import {globalEventBus} from './GlobalEventBus.js'

  export default {
    props: {
      trigger: {
        type: String,
        default: 'hover'
      },
      for: {
        type: String
      },
      _triggerBy: {
        type: Object
      },
      addClass: {
        type: String,
        default: ''
      }
    },
    mounted () {
      let events = {contextmenu: 'contextmenu', hover: 'mouseleave mouseenter', focus: 'blur focus'}
      jQuery(this.$el).on(events[this.trigger] || 'click', (e) => {
        if (e && this.trigger === 'contextmenu') e.preventDefault()
        if (!this._triggerBy) {
          globalEventBus.$emit('trigger:bind', this, this.for)
        }
        this._triggerBy && this._triggerBy.toggle(e)
      })

      if (this.trigger === 'click') {
        this.$refs.trigger.style['cursor'] = 'pointer'
        this.$refs.trigger.style['border-bottom'] = '1px dashed currentColor';
      } else {
        this.$refs.trigger.style['border-bottom'] = '1px dashed currentColor'
      }
    },
    methods: {
      setTriggerBy (vm) {
        this._triggerBy = vm
      }
    }
  }
</script>

<style>

</style>
