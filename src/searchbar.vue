<script>
    import Typeahead from './Typeahead.vue'
    export default {
      extends: Typeahead,
      computed: {
        primitiveData() {
          if (this.data) {
            var matches = []
            this.data.map((value) => {
              const query = new RegExp(this.value, 'i')
              let hasMatchingHeading = false
              const { title, headings, src } = value
              const keywords = value.keywords || ''
              if (Object.keys(headings).length !== 0) {
                for (const key in headings) {
                  const heading = headings[key]
                  if (heading.search(query) !== -1) {
                    hasMatchingHeading = true
                    matches.push({title: title,
                                  keywords: keywords,
                                  src: src,
                                  heading: {id: key, value: headings[key]}
                                 })
                  }
                }
                if (!hasMatchingHeading) {
                  const words = keywords ? keywords + title : title
                  if (words.search(query) !== -1) {
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
            return pre + (isMatch ? next.replace(regex, '<mark>$1</mark>') + ' ' : '')
          }, '')
        }
      }
    }
</script>
