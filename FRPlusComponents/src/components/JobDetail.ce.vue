<template>
  <div class="c-job-detail">
    <template v-if="isLoading">
      <div>Loading...</div>
    </template>
    <template v-else-if="errorMessage">
      <div class="error">{{ errorMessage }}</div>
    </template>
    <template v-else-if="job">
      <JobSummary :job="job" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import JobService from '@/services/JobService';
import JobSummary from '@/components/JobSummary.vue';  // Import JobSummary
import type { Job } from '@/types/Job';

export default defineComponent({
  components: {
    JobSummary,  // Register JobSummary
  },
  props: {
    dataId: String,
  },
  setup(props) {
    const job = ref<Job | null>(null);
    const isLoading = ref(true);
    const errorMessage = ref<string | null>(null);

    onMounted(async () => {
      try {
        if (props.dataId) {
          job.value = await JobService.getJob(props.dataId);
          if (!job.value) {
            errorMessage.value = 'Job not found';
          }
        } else {
          errorMessage.value = 'Job ID is missing';
        }
      } catch (error: any) {
        errorMessage.value = 'An error occurred while fetching data';
      } finally {
        isLoading.value = false;
      }
    });

    return {
      job,
      isLoading,
      errorMessage,
    };
  },
});
</script>

<style scoped>
@import url(https://local.fr5.com.au/Frontend-Assembly/Telerik.Sitefinity.Frontend/dist/assets/css/theme.bundle.css?package=FirstRatePlus);
/* Your CSS here */
</style>