<template>
  <div class="c-job-detail mt-6">
    <template v-if="isLoading">
      <div>Loading...</div>
    </template>
    <template v-else-if="errorMessage">
      <div class="error">{{ errorMessage }}</div>
    </template>
    <template v-else-if="job">
      <div class="row">
        <div class="col-xl-9 d-flex">
          <JobHeader :job="job" />
        </div>
        <div class="col-xl-3 d-flex">
          <JobStatus :job="job" />
        </div>
      </div>
      <div class="row mb-6">
        <div class="col-xl-6">
          <JobSummary :job="job" />
        </div>
        <div class="col">
          <CertificatePreview :job="job" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import JobService from '@/services/JobService';
import JobSummary from './JobSummary.vue';
import JobStatus from './JobStatus.vue';
import JobHeader from './JobHeader.vue';
import CertificatePreview from './CertificatePreview.vue';
import type { Job } from '@/types/Job';


export default defineComponent({
  components: {
    JobSummary,
    JobStatus,
    JobHeader,
    CertificatePreview
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