<script>
    import Typeahead from './Typeahead.vue'
    export default {
        extends: Typeahead,
        filters: {
            highlightAndExtract (value, phrase) {
                var words = value.split(',').map(value => value.trim());
                return words.reduce((pre, next) => {
                    var regex = new RegExp('(' + phrase + ')', 'gi');
                    var isMatch = next.match(regex);
                    return pre + (isMatch? next.replace(regex, '<mark>$1</mark>') + ' ': '');
                }, '');
            }
        }
    }
</script>