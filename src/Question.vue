<template>
    <div class="question-wrapper">
        <div class="body-wrapper">
            <!-- Default slot is question body -->
            <slot></slot>
            <div v-if="hasInput" class="textarea-container">
                <textarea class="form-control question-input" rows="3" placeholder="write your answer here..."></textarea>
            </div>
        </div>
        <accordion>
            <panel v-show="hasHintSlot" header="Hint" expandable no-close>
                <slot name="hint">
                    No hint is available for this question.
                </slot>
            </panel>
            <panel v-show="hasAnswerSlot" header="Answer" expandable no-close>
                <slot name="answer"></slot>
            </panel>
        </accordion>
    </div>
</template>

<script>
  import {coerce} from './utils/utils.js'
  import morph from './Morph.vue'
  import accordion from './Accordion.vue'
  import panel from './Panel.vue'

  export default {
    components: {
      panel,
      morph,
      accordion
    },
    props: {
      hasInput: {
        type: Boolean,
        coerce: coerce.boolean,
        default: false
      }
    },
    data () {
      return {
        hasAnswerSlot: true,
        hasHintSlot: true
      }
    },
    attached() {
      let hasAnswerSlot = !!this.$el.querySelector('[slot="answer"]');
      this.hasAnswerSlot = hasAnswerSlot
      let hasHintSlot = !!this.$el.querySelector('[slot="hint"]');
      this.hasHintSlot = hasHintSlot
    }
  }
</script>

<style>
    .body-wrapper {
        padding-bottom: 10px;
    }
    .question-wrapper > .panel-group > .panel-container + .panel-container {
        display: block;
        margin-top: 5px;
    }
    .textarea-container {
        margin: 8px 0;
    }
    .textarea-container > textarea {
        margin: 4px 0;
    }
</style>
