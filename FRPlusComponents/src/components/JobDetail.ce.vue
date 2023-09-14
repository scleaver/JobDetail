<template>
  <div>
    <h2>{{ jobTitle }}</h2>
    <p>{{ jobDescription }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const jobTitle = ref("Software Engineer");
    const jobDescription = ref("Develop and maintain software applications.");

    return {
      jobTitle,
      jobDescription
    };
  },
});
</script>

<style scoped>
/* Add your CSS styling here */

</style>
