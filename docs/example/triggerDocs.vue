<template>
    <doc-section id="triggerDocs" name="Trigger">
        <p>
            Trigger provides more flexibility in triggering contextual overlay via Tooltip, Popover or Modal.
        </p>
        <p>
            You could embed a Trigger within the text, and define the Tooltip, Popover or Modal at a separate location, which allows for a cleaner authoring flow.
        </p>
            Specify the <code>id</code> attribute on the Tooltip, Popover or Modal component, and use the same <code>id</code> in the <code>for</code> attribute of the Trigger
            to allow the Trigger to invoke the specific overlay elements.
        </p>
        <p>
            Additionally, multiple Triggers could share the same overlay by providing them with the same <code>id</code>.
        </p>
        <br>
        <h4>Using trigger for Tooltip</h4>
        <div class="bs-example">
            More about <trigger for="tt:trigger">trigger</trigger>.
            <tooltip id="tt:trigger" content="This tooltip triggered by a trigger"></tooltip>
            <br>
            This is the same <trigger for="tt:trigger">trigger</trigger> as last one.
        </div>
        <doc-code language="markup">
            More about <trigger for="tt:trigger_id">trigger</trigger>.
            <tooltip id="tt:trigger_id" content="This tooltip triggered by a trigger"></tooltip>
            <br>
            This is the same <trigger for="tt:trigger_id">trigger</trigger> as last one.
        </doc-code>
        <h4>Using trigger for Popover</h4>
        <div class="bs-example">
            More about <trigger for="pop:trigger">trigger</trigger>.
            <popover id="pop:trigger" content="This popover is triggered by a trigger"></popover>
            <br>
            This is the same <trigger for="pop:trigger">trigger</trigger> as last one.
        </div>
        <doc-code language="markup">
            More about <trigger for="pop:trigger_id">trigger</trigger>.
            <popover id="pop:trigger_id" content="This popover is triggered by a trigger"></popover>
            <br>
            This is the same <trigger for="pop:trigger_id">trigger</trigger> as last one.
        </doc-code>
        <h4>Using trigger for Modal</h4>
        <div class="bs-example">
            More about <trigger for="modal:trigger">trigger</trigger>.
            <modal title="**Modal title** :rocket:" id="modal:trigger">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </modal>
            <br>
            This is the same <trigger for="modal:trigger">trigger</trigger> as last one.
        </div>
        <doc-code language="markup">
            More about <trigger for="modal:trigger_id">trigger</trigger>.
            <modal title="**Modal title** :rocket:" id="modal:trigger_id">
                ...
            </modal>
            <br>
            This is the same <trigger for="modal:trigger_id">trigger</trigger> as last one.
        </doc-code>
        <br>
        <h4>Trigger's <code>trigger</code> attribute (which defaults to <code>hover</code>) is independent of the target's.</h4>
        <div class="bs-example">
            This is a hover <trigger for="pop:xp-user-stories">trigger</trigger>.
            <br>
            This is a click
            <popover id="pop:xp-user-stories" trigger="click">
              popover
              <div slot="content">
                User stories...
              </div>
            </popover>.
        </div>
        <doc-code language="markup">
            This is a hover <trigger for="pop:xp-user-stories">trigger</trigger>.
            <br>
            This is a click
            <popover id="pop:xp-user-stories" trigger="click">
              popover
              <div slot="content">
                User stories...
              </div>
            </popover>.
        </doc-code>
        <doc-table>
            <div>
                <p>trigger</p>
                <p><code>String</code>, one of <code>click</code> <code>focus</code> <code>hover</code> <code>contextmenu</code></p>
                <p><code>hover</code></p>
                <p>How its overlay view is triggered.</p>
            </div>
            <div>
                <p>for</p>
                <p><code>String</code>, the id for the overlay view to be shown</p>
                <p></p>
                <p></p>
            </div>
        </doc-table>
    </doc-section>
</template>

<script>
  import docSection from './docSection.vue'
  import docTable from './docTable.vue'
  import docCode from './docCode.vue'
  import trigger from 'src/trigger.vue'
  import tooltip from 'src/Tooltip.vue'

  export default {
    components: {
      docSection,
      docTable,
      docCode,
      trigger,
      tooltip
    },
    created() {

    }
  }
</script>
