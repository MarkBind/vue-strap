<template>
    <doc-section id="question" name="Question">
        <h4>
            Question component consists of a question body, a hint and an answer.
        </h4>
        <div class="bs-example">
            <question>
                Body
                <div slot="hint">
                    Hint
                </div>
                <div slot="answer">
                    Answer
                </div>
            </question>
        </div>
        <doc-code language="markup">
            <question>
                Body
                <div slot="hint">
                    Hint
                </div>
                <div slot="answer">
                    Answer
                </div>
            </question>
        </doc-code>
        <br>
        <h4>If no Hint slot is specified, it will not show:</h4>
        <div class="bs-example">
            <question>
                Body
                <div slot="answer">
                    Answer
                </div>
            </question>
        </div>
        <h4>If no Answer slot is specified, it will not show:</h4>
        <div class="bs-example">
            <question>
                Body
            </question>
        </div>
        <doc-code language="markup">
            If no Hint slot is specified, it will not show:
            <question>
                Body
                <div slot="answer">
                    Answer
                </div>
            </question>

            If no Answer slot is specified, it will not show:
            <question>
                Body
            </question>
        </doc-code>
        <br>
        <h4>
            Use <code>has-input</code> attribute to add an input box for users to enter their answer.
        </h4>
        <div class="bs-example">
            <question has-input>
                Body
                <div slot="hint">
                    Hint
                </div>
                <div slot="answer">
                    Answer
                </div>
            </question>
        </div>
        <doc-code language="markup">
            <question has-input>
                Body
                <div slot="hint">
                    Hint
                </div>
                <div slot="answer">
                    Answer
                </div>
            </question>
        </doc-code>
        <br>
        <h4>
            Question component can be used with Panel component to create an inline question group.
        </h4>
        <p>
            It can also be stored in a remote file and loaded when it is to be shown.
        </p>
        <div class="bs-example">
            <panel header="Review question" minimized>
                <question>
                    Body
                    <div slot="hint">
                        Hint
                    </div>
                    <div slot="answer">
                        Answer
                    </div>
                </question>
            </panel>
            <panel header="Remote question" src="docs/question.html" minimized></panel>
        </div>
        <doc-code language="markup">
            Use inline with Panel
            <panel header="Review question" minimized>
                <question>
                    Body
                    <div slot="hint">
                        Hint
                    </div>
                    <div slot="answer">
                        Answer
                    </div>
                </question>
            </panel>

            Use inline with Panel dynamic loading
            <panel header="Remote question" src="docs/question.html" minimized>
            </panel>
        </doc-code>
        <doc-table>
        </doc-table>
    </doc-section>
</template>

<script>
  import docSection from './docSection.vue'
  import docTable from './docTable.vue'
  import docCode from './docCode.vue'
  import question from 'src/Question.vue'
  import panel from 'src/Panel.vue'

  export default {
    components: {
      docSection,
      docTable,
      docCode,
      question,
      panel
    },
    created() {
      this.$on('retriever:fetched', function (el) {
        this.$compile(el);
      });
    }
  }
</script>
