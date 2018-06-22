<template>
  <div>
    <link v-if="local" rel="stylesheet" type="text/css" href="node_modules/bootstrap/dist/css/bootstrap.css">
    <link v-else href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw= sha512-nNo+yCHEyn0smMxSswnf/OnX6/KwJuZTlNZBjauKhTK0c+zT+q5JOCx0UFhXQ6rJR9jg6Es8gPuD2uZcYDLqSw==" crossorigin="anonymous">
    <div id="wrapper">
      <div class="bs-docs-header">
        <div class="container">
          <h1>VueStrap - MarkBind</h1>
          <p>Bootstrap components built with <a target="_blank" href="http://vuejs.org/">Vue.js</a>.</p>
          <p>No jQuery, bootstrap.js, or any 3rd party plugins required.</p>
          <p>Modified for supported components in MarkBind.</p>
          <br>
          <p><a class="btn btn-outline-inverse btn-lg" href="https://github.com/MarkBind/vue-strap">Code on GitHub</a></p>
        </div>
      </div>
      <container>
        <div ref="sections" class="col-md-9">
          <question-docs></question-docs>
        </div>
      </container>
    </div>
    <footer class="bs-docs-footer">
      <div class="container">
        <p>Designed and built by <a href="https://github.com/yuche/">yuche</a>.</p>
        <p>
          Using <a href="http://twitter.github.com/bootstrap" target="_blank">Twitter Bootstrap</a>
          and the <a href="css/docs.css" target="_blank">Bootstrap's docs styles</a> designed and built by <a href="http://twitter.com/mdo" target="_blank">@mdo</a>
          and <a href="http://twitter.com/fat" target="_blank">@fat</a>.
        </p>
        <p>
          Code licensed under <a href="//github.com/mgcrea/angular-strap/blob/master/LICENSE.md" target="_blank">The MIT License</a>,
          documentation under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import container from './example/container.vue'
import questionDocs from './example/questionDocs.vue'

export default {
  components: {
    container,
    questionDocs,
  },
  computed: {
    local () { return location.hostname === 'localhost' }
  }
}
</script>
