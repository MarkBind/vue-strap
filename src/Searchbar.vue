<script>
import typeahead from './Typeahead.vue';

export default {
  extends: typeahead,
  computed: {
    primitiveData() {
      function getTotalMatches(searchTarget, regexes) {
        return regexes.reduce((total, regex) => (regex.test(searchTarget) ? total + 1 : total), 0);
      }

      if (this.value.length < 2) {
        return [];
      }
      if (!this.data) {
        return undefined;
      }
      const matches = [];
      const regexes = this.value.split(' ')
        .filter(searchKeyword => searchKeyword !== '')
        .map(searchKeyword => searchKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .map(searchKeyword => new RegExp(searchKeyword, 'i'));
      this.data.forEach((entry) => {
        const { headings, src, title } = entry;
        const keywords = entry.keywords || '';
        let searchTarget = [title].concat(keywords).concat(Object.values(headings)).join(' ');
        let totalMatches = getTotalMatches(searchTarget, regexes);
        if (totalMatches > 0) {
          searchTarget = [title].concat(keywords).join(' ');
          const isMatchingPage = getTotalMatches(searchTarget, regexes) === totalMatches;
          if (isMatchingPage) {
            matches.push(Object.assign(entry, { totalMatches }));
          }
          Object.entries(headings).forEach(([id, text]) => {
            if (regexes.some(regex => regex.test(text))) {
              searchTarget = [title].concat(keywords).concat(text).join(' ');
              totalMatches = getTotalMatches(searchTarget, regexes);
              matches.push({
                heading: { id, text },
                keywords,
                src,
                title,
                totalMatches,
              });
            }
          });
        }
      });
      return matches.sort((a, b) => b.totalMatches - a.totalMatches);
    },
    entryTemplate() {
      return 'searchbarTemplate';
    },
  },
  methods: {
    down() {
      if (this.current < this.items.length - 1) {
        this.current += 1;
        this.scrollListView();
      }
    },
    up() {
      if (this.current > 0) {
        this.current -= 1;
        this.scrollListView();
      }
    },
    scrollListView() {
      const { dropdown } = this.$refs;
      const currentEntry = dropdown.children[this.current];
      const upperBound = dropdown.scrollTop;
      const lowerBound = upperBound + dropdown.clientHeight;
      const currentEntryOffsetBottom = currentEntry.offsetTop + currentEntry.offsetHeight;
      if (currentEntry.offsetTop < upperBound) {
        dropdown.scrollTop = currentEntry.offsetTop;
      } else if (currentEntryOffsetBottom > lowerBound) {
        dropdown.scrollTop = currentEntryOffsetBottom - dropdown.clientHeight;
      }
    },
  },
  components: {
    searchbarTemplate: {
      props: ['item', 'value'],
      template: '<div><span v-html="highlight(item.title, value)"></span>'
      + '<br v-if="item.keywords" />'
      + '<small v-if="item.keywords" v-html="highlight(item.keywords, value)"></small>'
      + '<br v-if="item.heading" />'
      + '<small v-if="item.heading" v-html="highlight(item.heading.text, value)"></small></div>',
      methods: {
        highlight(value, phrase) {
          function getMatchIntervals() {
            const regexes = phrase.split(' ')
              .filter(searchKeyword => searchKeyword !== '')
              .map(searchKeyword => searchKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
              .map(searchKeyword => new RegExp(`(${searchKeyword})`, 'gi'));
            const matchIntervals = [];
            regexes.forEach((regex) => {
              let match = regex.exec(value);
              while (match !== null) {
                if (match.index === regex.lastIndex) {
                  break;
                }
                matchIntervals.push({ start: match.index, end: regex.lastIndex });
                match = regex.exec(value);
              }
            });
            return matchIntervals;
          }
          // https://www.geeksforgeeks.org/merging-intervals/
          function mergeOverlappingIntervals(intervals) {
            if (intervals.length <= 1) {
              return intervals;
            }
            return intervals
              .sort((a, b) => a.start - b.start)
              .reduce((stack, current) => {
                const top = stack[stack.length - 1];
                if (!top || top.end < current.start) {
                  stack.push(current);
                } else if (top.end < current.end) {
                  top.end = current.end;
                }
                return stack;
              }, []);
          }
          const matchIntervals = mergeOverlappingIntervals(getMatchIntervals());
          let highlightedValue = value;
          // Traverse from back to front to avoid the positioning going out of sync
          for (let i = matchIntervals.length - 1; i >= 0; i -= 1) {
            highlightedValue = `${highlightedValue.slice(0, matchIntervals[i].start)}<mark>`
              + `${highlightedValue.slice(matchIntervals[i].start, matchIntervals[i].end)}</mark>`
              + `${highlightedValue.slice(matchIntervals[i].end)}`;
          }
          return highlightedValue;
        },
      },
    },
  },
};
</script>

<style>
.search-dropdown-menu {
  max-height: 30em;
  overflow-y: scroll;
}
</style>
