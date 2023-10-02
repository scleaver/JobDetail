<template>
  <div class="c-job-detail">
    <template v-if="!dataId">
      <div class="error">Error: Job ID is missing!</div>
    </template>
    <template v-else>
      Job ID: {{ dataId }}<br>
      Job name: {{ job?.JobName }}
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import JobService from '@/services/JobService';
import type { Job } from '@/types/Job';

export default defineComponent({
  props: {
    dataId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const job = ref<Job | null>(null);

    onMounted(async () => {
      if (props.dataId) {
        job.value = await JobService.getJob(props.dataId);
      }
    });

    return {
      job,
    };
  },
});
</script>

<style scoped>
/* Add your CSS styling here */

</style>
