import {coerce} from './utils.js'
import $ from './NodeList.js'
import md from './markdown.js'

export default {
  props: {
    trigger: {
      type: String
    },
    effect: {
      type: String,
      default: 'fade'
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    header: {
      type: Boolean,
      coerce: coerce.boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'top'
    },
    id: {
      type: String
    }
  },
  data () {
    return {
      position: {
        top: 0,
        left: 0
      },
      show: false
    }
  },
  computed: {
    contentRendered () {
      return md.renderInline(this.content)
    },
    titleRendered () {
      return md.renderInline(this.title)
    }
  },
  methods: {
    /**
     * Reset the trigger element
     * @param el a Vue instance
     */
    setTrigger (el) {
      this.trigger = el.trigger // trigger event
      this._trigger = el.$el
    },
    toggle (e) {
      if (e && this.trigger === 'contextmenu') e.preventDefault()
      if (!(this.show = !this.show)) {
        return
      }
      let trigger = this._trigger.children.length === 0 ? this._trigger : this._trigger.children[0]
      if (e) {
        let target = e.target
        if (trigger != e.target) {
          // Multiple triggers share this popover
          trigger = target.children.length === 0 ? target : target.children[0]
        }
      }
      setTimeout(() => {
        const popover = this.$els.popover
        this.calculateOffset(trigger, popover)
        this.updateOffsetForMargins()
        this.applyOffset()

        setTimeout(() => {
          // Recomputes in case the popover gets resized when placed in the current position
          let actualWidth  = popover.offsetWidth
          let actualHeight = popover.offsetHeight
          this.calculateOffset(trigger, popover)
          this.updateOffsetForMargins()
          let delta = this.getViewportAdjustedDelta(this.position, actualWidth, actualHeight)
          if (delta.left) this.position.left += delta.left
          else this.position.top += delta.top
          this.applyOffset()

          if (this.$els.arrow) {
            let isVertical = /top|bottom/.test(this.placement)
            let arrowDelta = isVertical ? delta.left * 2 : delta.top * 2;
            let arrowOffsetPosition = isVertical ? popover.offsetWidth : popover.offsetHeight
            this.adjustArrow(arrowDelta, arrowOffsetPosition, isVertical)
          }
        }, 0)
      }, 0)
    },
    calculateOffset (trigger, popover) {
      const triggerDimensions = this.getDimensions(trigger)

      switch (this.placement) {
        case 'top':
          this.position.left = triggerDimensions.left - popover.offsetWidth / 2 + triggerDimensions.width / 2
          this.position.top = triggerDimensions.top - popover.offsetHeight
          break
        case 'left':
          this.position.left = triggerDimensions.left - popover.offsetWidth
          this.position.top = triggerDimensions.top + triggerDimensions.height / 2 - popover.offsetHeight / 2
          break
        case 'right':
          this.position.left = triggerDimensions.left + triggerDimensions.width
          this.position.top = triggerDimensions.top + triggerDimensions.height / 2 - popover.offsetHeight / 2
          break
        case 'bottom':
          this.position.left = triggerDimensions.left - popover.offsetWidth / 2 + triggerDimensions.width / 2
          this.position.top = triggerDimensions.top + triggerDimensions.height
          break
        default:
          console.warn('Wrong placement prop')
      }
    },
    updateOffsetForMargins () {
      const margins = this.getPopoverMargins()
      this.position.top += margins.top
      this.position.left += margins.left
    },
    getDimensions (element) {
      const $element = jQuery(element)
      return jQuery.extend({}, element.getBoundingClientRect(), $element.offset())
    },
    getViewportAdjustedDelta (pos, actualWidth, actualHeight) {
      var delta = { top: 0, left: 0 };
      let vpRect = this._viewport.getBoundingClientRect();
      let vpOffset = { top: 0, left: 0 };
      let scroll = {scroll: document.documentElement.scrollTop || document.body.scrollTop}
      let outerDims = { width: jQuery(window).width(), height: jQuery(window).height() };
      let viewportDimensions = Object.assign({}, vpRect, scroll, outerDims, vpOffset)

      if (/right|left/.test(this.placement)) {
        var topEdgeOffset    = pos.top - scroll
        var bottomEdgeOffset = pos.top - scroll + actualHeight
        if (topEdgeOffset < viewportDimensions.top) { // top overflow
          delta.top = viewportDimensions.top - topEdgeOffset
        } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
          delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
        }
      } else {
        var leftEdgeOffset  = pos.left
        var rightEdgeOffset = pos.left + actualWidth
        if (leftEdgeOffset < viewportDimensions.left) { // left overflow
          delta.left = viewportDimensions.left - leftEdgeOffset
        } else if (rightEdgeOffset > viewportDimensions.left + viewportDimensions.width) { // right overflow
          delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
        }
      }
      return delta
    },
    getPopoverMargins () {
      const $popover = jQuery(this.$els.popover)
      return {
        top: parseInt($popover.css('margin-top'), 10) || 0,
        left: parseInt($popover.css('margin-left'), 10) || 0
      }
    },
    applyOffset () {
      const popover = this.$els.popover
      jQuery(popover).offset(this.position)
    },
    adjustArrow (delta, dimension, isVertical) {
      this.$els.arrow.style[isVertical ? 'left' : 'top'] = 50 * (1 - delta / dimension) + '%'
      this.$els.arrow.style[isVertical ? 'top' : 'left'] = ''
    }
  },
  ready () {
    let trigger = this.$els.trigger
    this._viewport = document.body
    if (!trigger) return
    if (this.trigger === 'focus' && !~trigger.tabIndex) {
      trigger = $('a,input,select,textarea,button', trigger)
      if (!trigger.length) {
        trigger = null
      }
    }
    if (trigger) {
      let events = {contextmenu: 'contextmenu', hover: 'mouseleave mouseenter', focus: 'blur focus'}
      $(trigger).on(events[this.trigger] || 'click', this.toggle)
      this._trigger = trigger
    }
  },
  beforeDestroy () {
    if (this._trigger) $(this._trigger).off()
  }
}
