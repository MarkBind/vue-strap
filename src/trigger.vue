<template>
    <span v-el:trigger><slot></slot></span>
</template>

<script>
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
      }
    },
    attached () {
      let events = {contextmenu: 'contextmenu', hover: 'mouseleave mouseenter', focus: 'blur focus'}
      jQuery(this.$el).on(events[this.trigger] || 'click', (e) => {
        if (e && this.trigger === 'contextmenu') e.preventDefault()
        if (!this._triggerBy) {
          this.$dispatch('trigger:register', this, this.for)
        }
        this._triggerBy && this._triggerBy.toggle(e)
      })

      if (this.trigger === 'click') {
        this.$els.trigger.style['cursor'] = 'pointer'
        this.$els.trigger.style['-webkit-text-decoration'] = 'underline dashed';
        this.$els.trigger.style['text-decoration'] = 'underline dashed';
      } else {
        this.$els.trigger.style['-webkit-text-decoration'] = 'underline dotted';
        this.$els.trigger.style['text-decoration'] = 'underline dotted'
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
