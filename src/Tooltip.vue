<template>
  <span :class="[addClass]">
    <span ref="trigger"><slot></slot></span><!--
    --><transition :name="effect">
      <div ref="popover" v-if="show" style="display:block;"
        :class="['tooltip', tooltipPlacementClass, 'show']"
      >
        <div class="arrow" ref="arrow"></div>
        <div class="tooltip-inner">
          <span name="content" v-html="contentRendered"></span>
       </div>
      </div>
    </transition><!--
  --></span>
</template>

<script>
import PopoverMixin from './utils/popoverMixins.js'
import md from './utils/markdown.js'

export default {
  mixins: [PopoverMixin],
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    effect: {
      type: String,
      default: 'scale'
    },
    placement: {
      type: String,
      default: 'top'
    },
    addClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    tooltipPlacementClass ()  {
      return `bs-tooltip-${this.placement}`;
    }
  },
  mounted () {
    if (this.$refs.trigger) {
      this.$refs.trigger.style['border-bottom'] = '1px dashed currentColor'
    }
  }
}
</script>

<style>
.scale-enter-active {
  animation:scale-in 0.15s ease-in;
}
.scale-leave-active {
  animation:scale-out 0.15s ease-out;
}

.tooltip.top,
.tooltip.left,
.tooltip.right,
.tooltip.bottom {
  opacity: .9
}
</style>
