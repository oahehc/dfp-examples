<template>
  <div :id="id"></div>
</template>

<script>
export default {
  name: "DfpSlot",
  props: {
    size: Array,
    path: String,
    id: String
  },
  beforeCreate() {
    window.googletag.cmd.push(() => {
      window.googletag.destroySlots();
    });
  },
  mounted() {
    const { path, size, id } = this;
    window.googletag.cmd.push(() => {
      window.googletag
        .defineSlot(path, size, id)
        .addService(window.googletag.pubads());
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
      window.googletag.display(id);
    });
  }
};
</script>

<style scoped>
div {
  width: 320px;
  height: 100px;
}
</style>
