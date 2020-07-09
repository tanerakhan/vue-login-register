<template>
  <b-button class="mb-4" @click="clicked" variant="dark">{{ label }}</b-button>
</template>
<script>
export default {
  name: "Button",
  props: {
    label: String,
    styles: Object,
    clicked: Function
  }
};
</script>
<style scoped lang="scss">
</style>