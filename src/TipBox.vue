<template>
    <div class="alert container" :class="[boxStyle, addClass, lightStyle]" :style="customStyle">
        <div v-if="!isDefault" class="icon-wrapper">
            <span v-html="iconType"></span>
        </div>
        <div class="contents" :class="fontBlack">
            <h6 v-if="heading" class="heading">{{ heading }}</h6>
            <button v-if="dismissible" type="button" class="close dismiss-button" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <slot></slot>
        </div>

    </div>
</template>

<script>
  import md from './utils/markdown.js'

  export default {
    props: {
      dismissible: {
        type: Boolean,
        default: false
      },
      backgroundColor: {
        type: String,
        default: null
      },
      borderColor: {
        type: String,
        default: null
      },
      borderLeftColor: {
        type: String,
        default: null
      },
      color: {
        type: String,
        default: null
      },
      icon: {
        type: String,
        default: null
      },
      type: {
        type: String,
        default: 'none'
      },
      addClass: {
        type: String,
        default: ''
      },
      heading: {
        type: String,
        default: null,
      }, 
      light: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      isDefault() {
        return this.type === 'none'
      },
      boxStyle() {
        switch (this.type) {
          case 'warning':
            return 'alert-warning'
          case 'info':
          case 'definition':
            return 'alert-info'
          case 'success':
          case 'tip':
            return 'alert-success'
          case 'important':
          case 'wrong':
            return 'alert-danger'
          default:
            return 'alert-default'
        }
      },
      lightStyle() {
        if (this.light) {
            switch (this.type) {
            case 'warning':
                return 'border-warning text-warning alert-border-left';
            case 'info':
            case 'definition':
                return 'border-info text-info alert-border-left';
            case 'success':
            case 'tip':
                return 'border-sucess text-success alert-border-left';
            case 'important':
            case 'wrong':
                return 'border-danger text-danger alert-border-left';
            default:
                return '';
            }
        }
        return '';
      },
      customStyle() {
        var style = {};
        if (this.backgroundColor) {
          style.backgroundColor = this.backgroundColor;
          style.borderColor = this.backgroundColor;
        }
        if (this.borderColor) {
          style.borderColor = this.borderColor;
        }
        if (this.borderLeftColor) {
          style.borderLeft = `5px solid ${this.borderLeftColor}`;
        }
        if (this.color) {
          style.color = this.color;
        }
        return style;
      },
      fontBlack() {
        if (this.light) {
          return 'font-black';
        }
        return '';
      },
      iconType() {
        if (this.icon) {
          return md.renderInline(this.icon);
        }
        switch (this.type) {
          case 'wrong':
            return '<i class="fas fa-times"></i>';
          case 'warning':
            return '<i class="fas fa-exclamation"></i>';
          case 'info':
            return '<i class="fas fa-info"></i>';
          case 'success':
            return '<i class="fas fa-check"></i>';
          case 'important':
            return '<i class="fas fa-flag"></i>';
          case 'tip':
            return '<i class="fas fa-lightbulb"></i>';
          case 'definition':
            return '<i class="fas fa-atlas"></i>';
          default:
            return '<i class="fas fa-exclamation"></i>';
        }
      }
    }
  }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-radius: 6px;
    }

    .heading {
        display: inline;
        float: right;
        font-weight: normal;
        color: inherit;
        background-color: rgba(240, 240, 240, 0.6);
        width: auto;
        padding: 3px 5px 4px 5px;
        border-width: 0;
        border-radius: 0 6px 0 6px;
        margin: -13px -27px 0 15px;
    }

    .dismiss-button {
        position: relative;
        top: -2px;
        clear: right;
        color: inherit;
        height: 100%;
        margin-right: -6px;
        margin-left: 21px;
    }

    .icon-wrapper {
        display: flex;
        margin-right: .5em;
        width: 22px;
        height: 22px;
    }

    .contents {
        padding: 0 6px;
        width: 100%;
    }

    .alert-default {
        color: #24292e;
        background-color: #f6f8fa;
        border-color: #e8ebef;
    }
    
    .alert-border-left {
        background-color: #f9f8f8;
        border-left: solid;
        border-width: 0px 0px 0px 5px;
    }
        
    .font-black {
        color: #24292e;
    }
</style>
