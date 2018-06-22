<template>
  <div>
    <pre v-if="!language" ref="container"></pre>
    <template v-else>
      <pre v-if="language=='markup'"><code class="language-markup"><script ref="container" type="language-mark-up"></script></code></pre>
      <pre v-else><code :class="getLanguageClass">&lt;script ref="container" :type="getLanguageClass">&lt;/script></code></pre>
    </template>
  </div>
</template>

<script>
import $ from 'src/utils/NodeList.js'

export default {
  props: {
    language: {
      type: String,
      default: 'html'
    }
  },
  computed: {
    getLanguageClass() {
      return `language-${language}`;
    },
  },
  mounted () {
    let content = ''
    $(this.$slots.default.childNodes).each((el) => {
      content += el.outerHTML || el.nodeValue
    })
    if (~['html','markup'].indexOf(this.language)) content = content.replace(/(\w+)=""/g, '$1')
    let matches = content.match(/(\n|\r)[ ]*\S/g)
    if (matches) {
      let values = matches.map((el) => { return el.length - 2 })
      let min = Math.min.apply(Math, values)
      content = content.replace(/(\n|\r)([^\n\S]*)/g, (str, nr, s) => {
        return nr + s.substr(min)
      })
    }
    this.$refs.container.innerHTML = content.replace(/^\s+|\s+$/g,'')
  }
}
</script>
