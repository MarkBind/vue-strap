<template>
  <doc-section id="accordion" name="Accordion and Panel">
    <h4>Panel is a flexible container that support collapse and expand its content. It is expandable by default</h4>
    <div class="bs-example">
      <panel header="Header" alt="Alternative Header">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolores excepturi expedita illum impedit ipsa labore qui veniam. Blanditiis exercitationem id ipsum libero molestiae, necessitatibus unde? Amet fugiat fugit molestias?
      </panel>
    </div>
    <doc-code language="markup">
      <panel header="Header" alt="Alternative Header">
        ...
      </panel>
    </doc-code>
    <br>
    <h4>With <code>minimized</code> attribute, panel is minimized into an inline block element.</h4>
    <div class="bs-example">
      <panel header="Header" alt="Alternative Header" minimized>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolores excepturi expedita illum impedit ipsa labore qui veniam. Blanditiis exercitationem id ipsum libero molestiae, necessitatibus unde? Amet fugiat fugit molestias?
      </panel>
    </div>
    <doc-code language="markup">
      <panel header="Header" alt="Alternative Header" minimized>
        ...
      </panel>
    </doc-code>
    <br>
    <h4>With <code>expanded</code> attribute, panel could be expanded by default.</h4>
    <div class="bs-example">
      <panel header="Header" alt="Alternative Header" expanded>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolores excepturi expedita illum impedit ipsa labore qui veniam. Blanditiis exercitationem id ipsum libero molestiae, necessitatibus unde? Amet fugiat fugit molestias?
      </panel>
    </div>
    <doc-code language="markup">
      <panel header="Header" alt="Alternative Header" expanded>
        ...
      </panel>
    </doc-code>
    <br>
    <h4>Panel has many types that change its appearance.</h4>
    <div class="bs-example">
      <h5><code>Primary</code> type</h5>
      <panel header="#### Primary - Click to expand" type="primary">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dignissimos, doloribus dolorum ducimus eius
        eligendi est et excepturi iure iusto laborum, perferendis possimus quod repudiandae sapiente similique tenetur
        ullam voluptates!
      </panel>
      <br>
      <h5><code>Seamless</code> panel type</h5>
      <panel header="#### Seamless - Click to expand" type="seamless">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dignissimos, doloribus dolorum ducimus eius
        eligendi est et excepturi iure iusto laborum, perferendis possimus quod repudiandae sapiente similique tenetur
        ullam voluptates!
      </panel>
    </div>
    <doc-code language="markup">
      <panel header="#### Primary - Click to expand" type="primary">
        ...
      </panel>
      <panel header="#### Seamless - Click to expand" type="seamless">
        ...
      </panel>
    </doc-code>
    <br>
    <h4>Show/Hide buttons using <code>no-switch</code> or <code>no-close</code></h4>
    <div class="bs-example">
      <panel header="Header" no-switch>
      </panel>
      <panel header="Header" no-close>
      </panel>
    </div>
    <doc-code language="markup">
      <panel header="Header" no-switch>
      </panel>
      <panel header="Header" no-close>
      </panel>
    </doc-code>
    <br>
    <h4>Use markdown in the header (only inline level markdown are supported)</h4>
    <div class="bs-example">
      <panel header="**haha** :rocket: ![](https://vuejs.org/images/logo.png =25x25)" expandable type="seamless">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequatur consequuntur culpa enim, explicabo impedit iure maxime omnis quas recusandae sint suscipit? Accusamus cumque facere laboriosam magnam magni numquam reprehenderit.
      </panel>
    </div>
    <doc-code language="markup">
      <panel header="**haha** :rocket: ![](https://vuejs.org/images/logo.png =25x25)" type="seamless">
        ...
      </panel>

    </doc-code>
    <br>
    <h4>If <code>src</code> attribute is provided, the panel content is loaded dynamically from src.</h4>
    <div class="bs-example">
      <panel header="Dynamic Loading" src="docs/loadContent.html#fragment" minimized></panel>
    </div>
    <doc-code language="markup">
      <panel header="Dynamic Loading" src="docs/loadContent.html#fragment" minimized></panel>
    </doc-code>

    <h4>Accordion could group panels together to provide better control</h4>
    <div class="bs-example">
      <checkbox :checked.sync="checked" type="primary">Open only one at a time.</checkbox>
      <p><v-select :options="types" clear-button :value.sync="selected" placeholder="Global type"></v-select></p>
      <p><v-select :options="types" clear-button :value.sync="first" placeholder="First element type"></v-select></p>
      <accordion :one-at-atime="checked" :type="selected">
        <panel is-open :type="first=='panel'?null:first">
          <strong slot="header"><u>[20 minutes] Part 1 - Software engineering rocks! : Introduction to Software Engineering</u></strong>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
        <panel header="Panel #2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
        <panel header="Panel #3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
        <panel header="Panel #4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
        <panel header="[20 minutes] Part 1 - Software engineering rocks! : Introduction to Software Engineering">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
      </accordion>

      Panel with Expand Switch

      <panel header="Parent" expandable ctrl-lvl="-1">
        <panel header="Child1" expandable>
          <panel header="Child2">
            <panel header="Child3" expandable>
              Parent 1
            </panel>
          </panel>
        </panel>
      </panel>
    </div>
    <doc-code language="markup">
      <accordion :one-at-atime="checked" type="info">
        <panel is-open type="primary">
          <strong slot="header"><u>Panel #1</u></strong>
          ...
        </panel>
        <panel header="Panel #2">
          ...
        </panel>
        <panel header="Panel #3">
          ...
        </panel>
        <panel header="Panel #4">
          ...
        </panel>
      </accordion>
    </doc-code>

    <doc-table>
      <div>
        <p>type</p>
        <p><code>String</code></p>
        <p><code>null</code></p>
        <p>Define the type of color for the tabs (global).</p>
      </div>
      <div>
        <p>one-at-time</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Control whether expanding an item will cause the other items to close.</p>
      </div>
    </doc-table>
    <doc-table name="Panel">
      <div>
        <p>header</p>
        <p><code>String</code></p>
        <p></p>
        <p>The clickable text on the group's header. You need one to be able to click on the header for toggling.</p>
      </div>
      <div>
        <p>expandable</p>
        <p><code>Boolean</code></p>
        <p><code>true</code></p>
        <p>Whether Panel is expandable.</p>
      </div>
      <div>
        <p>expanded</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Whether Panel is expanded or collapsed.</p>
      </div>
      <div>
        <p>minimized</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Whether Panel is minimized.</p>
      </div>
      <div>
        <p>no-close</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Whether to show the close button.</p>
      </div>
      <div>
        <p>no-switch</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Whether to show the expand switch.</p>
      </div>
      <div>
        <p>bottom-switch</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Whether to show an expand switch at the bottom of the panel. Independent of no-switch.</p>
      </div>
      <div>
        <p>url</p>
        <p><code>String</code></p>
        <p></p>
        <p>The url to the remote page to be loaded as the content of the panel.</p>
      </div>
      <div>
        <p>type</p>
        <p><code>String</code></p>
        <p><code>null</code></p>
        <p>
          The type of color for the tab (single).<br>
          Support: <code>default</code>, <code>primary</code>, <code>info</code>, <code>success</code>,
          <code>warning</code>, <code>danger</code>, <code>seamless</code>
        </p>
      </div>
    </doc-table>
    <p>If you want to personalize your header with some html, you can use the slot instead of header attribute (panel&nbsp;#1 in the example).</p>
  </doc-section>
</template>

<script>
import docSection from './docSection.vue'
import docTable from './docTable.vue'
import docCode from './docCode.vue'
import accordion from 'src/Accordion.vue'
import checkbox from 'src/Checkbox.vue'
import panel from 'src/Panel.vue'
import vSelect from 'src/Select.vue'
import question from 'src/Question.vue'

export default {
  components: {
    docSection,
    docTable,
    docCode,
    accordion,
    checkbox,
    panel,
    vSelect,
    question
  },
  data () {
    return {
      checked: true,
      selected: 'info',
      first: 'primary',
      types: ['default', 'primary', 'info', 'success', 'warning', 'danger']
    }
  }
}
</script>
