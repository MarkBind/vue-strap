<template>
  <div role="dialog"
    v-bind:class="{
    'modal':true,
    'fade':effect === 'fade',
    'zoom':effect === 'zoom'
    }">
    <div v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}" role="document"
      v-bind:style="{width: optionalWidth}">
      <div class="modal-content">
        <slot name="modal-header">
          <div class="modal-header">
            <button type="button" class="close" @click="close"><span>&times;</span></button>
            <h4 class="modal-title">
              <slot name="title">
                {{{titleRendered}}}
              </slot>
            </h4>
          </div>
        </slot>
          <div class="modal-body">
              <slot></slot>
          </div>
        <slot name="modal-footer">
          <div class="modal-footer" v-if="showOkButton">
            <button type="button" class="btn btn-primary" v-if="showOkButton" @click="close">{{ okText }}</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import {coerce, getScrollBarWidth} from './utils/utils.js'
import $ from './utils/NodeList.js'
import md from './utils/markdown.js'

export default {
  props: {
    okText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    show: {
      required: true,
      type: Boolean,
      coerce: coerce.boolean,
      twoWay: true
    },
    width: {
      default: null
    },
    effect: {
      type: String,
      default: 'zoom'
    },
    backdrop: {
      type: Boolean,
      coerce: coerce.boolean,
      default: true
    },
    large: {
      type: Boolean,
      coerce: coerce.boolean,
      default: false
    },
    small: {
      type: Boolean,
      coerce: coerce.boolean,
      default: false
    },
    name: {
      type: String
    },
    id: {
      type: String
    }
  },
  computed: {
    titleRendered () {
      return md.renderInline(this.title);
    },
    optionalWidth () {
      if (this.width === null) {
        return null
      } else if (Number.isInteger(this.width)) {
        return this.width + 'px'
      }
      return this.width
    },
    showOkButton () {
      return this.okText.length !== 0;
    }
  },
  watch: {
    show (val) {
      const el = this.$el
      const body = document.body
      const scrollBarWidth = getScrollBarWidth()
      if (val) {
        $(el).find('.modal-content').focus()
        el.style.display = 'block'
        setTimeout(() => $(el).addClass('in'), 0)
        $(body).addClass('modal-open')
        if (scrollBarWidth !== 0) {
          body.style.paddingRight = scrollBarWidth + 'px'
        }
        if (this.backdrop) {
          $(el).on('click', e => {
            if (e.target === el) this.show = false
          })
        }
      } else {
        body.style.paddingRight = null
        $(body).removeClass('modal-open')
        $(el).removeClass('in').on('transitionend', () => {
          $(el).off('click transitionend')
          el.style.display = 'none'
        })
      }
    }
  },
  events: {
    'modal:show': function (name) {
      if (name === this.name) {
        this.show = true
      }
    },
    'trigger:bind': function (el, id) {
      if (id === this.id) {
        el.setTriggerBy(this)
      }
      return true;
    }
  },
  methods: {
    close () {
      this.show = false
    },
    toggle () {
      this.show = true
    }
  }
}
</script>
<style>
.modal {
  transition: all 0.3s ease;
}
.modal.in {
  background-color: rgba(0,0,0,0.5);
}
.modal.zoom .modal-dialog {
  -webkit-transform: scale(0.1);
  -moz-transform: scale(0.1);
  -ms-transform: scale(0.1);
  transform: scale(0.1);
  top: 300px;
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}
.modal.zoom.in .modal-dialog {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  -webkit-transform: translate3d(0, -300px, 0);
  transform: translate3d(0, -300px, 0);
  opacity: 1;
}
</style>