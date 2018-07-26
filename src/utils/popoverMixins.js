import {toBoolean} from './utils.js'
import $ from './NodeList.js'
import {globalEventBus} from '../GlobalEventBus.js'
import md from './markdown.js'

function getFirst(nodeList) {
  return nodeList && (nodeList.length ? nodeList[0] : nodeList)
}

function getFirstChild(node) {
  return node && (node.children.length ? node.children[0] : node)
}

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
      isPopover: false,
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
    bindTrigger (trigger, popover) {
      if (popover === this.id) {
        trigger.setTriggerBy(this)
      }
    },
    toggle (e) {
      let trigger = getFirstChild(this.$refs.trigger)
      if (e && this.trigger === 'contextmenu' && trigger === e.target) e.preventDefault()
      if (!(this.show = !this.show)) {
        return
      }
      if (e) {
        let target = e.target
        if (trigger !== target && getFirst(this._trigger) !== target) {
          // Multiple triggers share this popover
          trigger = getFirstChild(target)
        }
      }
      setTimeout(() => {
        const popover = this.$refs.popover

        this.isPopover = Array.some(popover.classList, classname => classname === 'popover');
        let finalPosition = this.calculateOffset(trigger, popover)
        if (this.$refs.arrow) {
          let delta = this.getViewportAdjustedDelta(finalPosition);
          if (delta.left) finalPosition.left += delta.left
          else finalPosition.top += delta.top
          let isVertical = /top|bottom/.test(this.placement)
          let arrowDelta = isVertical ? delta.left * 2 : delta.top * 2;
          let arrowOffsetPosition = isVertical ? popover.offsetWidth : popover.offsetHeight
          this.adjustArrow(arrowDelta, arrowOffsetPosition, isVertical)
        }
        popover.style.top = finalPosition.top + 'px';
        popover.style.left = finalPosition.left + 'px';
      }, 20)
    },
    getBoundingBoxRelativeToDocument(element) {
      const boundingClientRect = element.getBoundingClientRect();
      const boundingBox = {
        left: boundingClientRect.left + (window.pageXOffset || document.documentElement.scrollLeft),
        top: boundingClientRect.top + (window.pageYOffset || document.documentElement.scrollTop),
        width: boundingClientRect.width,
        height: boundingClientRect.height
      };
      return boundingBox;
    },
    calculateOffset (trigger, popover) {
      const finalPosition = {
        top: 0, left: 0, width: popover.offsetWidth, height: popover.offsetHeight
      };
      const triggerBoundingBox = this.getBoundingBoxRelativeToDocument(trigger);

      switch (this.placement) {
        case 'top' :
          finalPosition.left = triggerBoundingBox.left + (triggerBoundingBox.width - popover.offsetWidth) / 2;
          finalPosition.top = triggerBoundingBox.top - popover.offsetHeight;
          if (this.isPopover) {
            finalPosition.top -= this.$refs.arrow.offsetHeight;
          }
          break;
        case 'left':
          finalPosition.left = triggerBoundingBox.left - popover.offsetWidth;
          finalPosition.top = triggerBoundingBox.top + (triggerBoundingBox.height - popover.offsetHeight) / 2;
          if (this.isPopover) {
            finalPosition.left -= this.$refs.arrow.offsetWidth;
          }
          break;
        case 'right':
          finalPosition.left = triggerBoundingBox.left + triggerBoundingBox.width;
          finalPosition.top = triggerBoundingBox.top + (triggerBoundingBox.height - popover.offsetHeight) / 2;
          break;
        case 'bottom':
          finalPosition.left = triggerBoundingBox.left + (triggerBoundingBox.width - popover.offsetWidth) / 2;
          finalPosition.top = triggerBoundingBox.top + triggerBoundingBox.height;
          break;
        default:
          console.warn('Wrong placement prop');
      }

      return finalPosition;
    },
    getViewportAdjustedDelta (pos) {
      var delta = { top: 0, left: 0 };
      let vpRect = this._viewport.getBoundingClientRect();
      let vpOffset = { top: 0, left: 0 };
      let scroll = {scroll: document.documentElement.scrollTop || document.body.scrollTop}
      let outerDims = { width: jQuery(window).width(), height: jQuery(window).height() };
      let viewportDimensions = Object.assign({}, vpRect, scroll, outerDims, vpOffset)

      if (/right|left/.test(this.placement)) {
        var topEdgeOffset    = pos.top - scroll
        var bottomEdgeOffset = pos.top - scroll + pos.height;
        if (topEdgeOffset < viewportDimensions.top) { // top overflow
          delta.top = viewportDimensions.top - topEdgeOffset
        } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
          delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
        }
      } else {
        var leftEdgeOffset  = pos.left
        var rightEdgeOffset = pos.left + pos.width;
        if (leftEdgeOffset < viewportDimensions.left) { // left overflow
          delta.left = viewportDimensions.left - leftEdgeOffset
        } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
          delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
        }
      }
      return delta
    },
    adjustArrow (delta, dimension, isVertical) {
      this.$refs.arrow.style[isVertical ? 'left' : 'top'] = 50 * (1 - delta / dimension) + '%'
      this.$refs.arrow.style[isVertical ? 'top' : 'left'] = ''
      let translateLeft = 0;
      let translateTop = 0;
      if (this.placement === 'left' || this.placement === 'right') {
        translateTop = this.isPopover ? -75 : -50;
      }
      if (this.placement === 'top' || this.placement === 'bottom') {
        translateLeft = this.isPopover ? -100 : -50;
      }
      this.$refs.arrow.style['transform'] = `translate(${translateLeft}%, ${translateTop}%)`;
    }
  },
  created () {
    globalEventBus.$on('trigger:bind', this.bindTrigger)
  },
  mounted () {
    let trigger = this.$refs.trigger
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
    globalEventBus.$off('trigger:bind', this.bindTrigger)
  }
}
