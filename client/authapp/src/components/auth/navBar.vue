

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<script>
export default {
    data: () => ({
        drawer: false,
        group: null,
    }),
}
</script>

<style scoped></style>
