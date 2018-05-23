<script>
    import Typeahead from './Typeahead.vue'
    export default {
      extends: Typeahead,
      computed: {
        primitiveData() {
          if (this.data) {
            var matches = []
            var words
            this.data.map(value => {
              var query = this.value.toLowerCase()
              var hasHeadingMatch = false
              var title = value.title.toLowerCase()
              var keywords = value.keywords? value.keywords.toLowerCase(): ""
              var headings = value.headings
              var src = value.src
              if (Object.keys(headings).length !== 0) {
                for (var key in headings) {
                	var heading = headings[key].toLowerCase();
                  if (heading.indexOf(query) !== -1) {
                    hasHeadingMatch = true
                    matches.push({'title': title,
                                  'keywords': keywords,
                                  'src': src,
                                  'heading': {'id': key, 'value': headings[key]}
                                 })
                  }
                }
                if (!hasHeadingMatch) {
                  words = keywords ? keywords + title : title
                  if (words.indexOf(query) !== -1) {
                    matches.push(value)
                  }
                }
              }
            })
            return matches
          }
        }
      },
      filters: {
        highlightAndExtract (value, phrase) {
          var words = value.split(',').map(value => value.trim())
          return words.reduce((pre, next) => {
            var regex = new RegExp('(' + phrase + ')', 'gi')
            var isMatch = next.match(regex)
            return pre + (isMatch? next.replace(regex, '<mark>$1</mark>') + ' ': '')
          }, '')
        }
      }
    }
</script>
