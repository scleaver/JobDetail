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
          <CertificatePreview :job="job"></CertificatePreview>
          <div class="card border-0 h-100">
            <div class="card-header border-0">
              <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-end">
                <h2 class="card-header-title h4 text-uppercase">Certificate preview</h2>
                <a class="btn btn-sm btn-outline-primary ms-md-auto" :href="job.previewUrl" download>Download</a>
              </div>
            </div>
            <div class="card-body p-0 h-100">
              <div v-if="job.calculationStatus !== 7">
                Loading: {{ job.calculationStatusName }}
              </div>
              <slot v-else name="adobe-viewer"></slot>
              <!-- <div v-else ref="certContainer" class="h-100"></div> -->
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted } from 'vue';
import JobService from '@/services/JobService';
import JobSummary from './JobDetail/JobSummary.vue';
import JobStatus from './JobDetail/JobStatus.vue';
import JobHeader from './JobDetail/JobHeader.vue';
import type { Job } from '@/types/Job';


export default defineComponent({
  components: {
    JobSummary,
    JobStatus,
    JobHeader
  },
  props: {
    dataId: String,
    dataAdobeId: String
  },
  setup(props) {
    const job = ref<Job | null>(null);
    const isLoading = ref(true);
    const errorMessage = ref<string | null>(null);
    const adobeApiReady = ref(false);
    const previewFilePromise = ref(null);

    const loadAdobeSdk = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://documentservices.adobe.com/view-sdk/viewer.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const renderPdf = () => {
      const url = job.value?.previewUrl;
      const fileName = job.value?.previewFilename;

      if (!adobeApiReady.value
        && props.dataAdobeId
        && url
        && job.value?.calculationStatus == 7) return;

      const previewConfig = {
        embedMode: 'SIZED_CONTAINER',
        showAnnotationTools: false,
        showDownloadPDF: false
      };

      const adobeDCView = new AdobeDC.View({
        clientId: props.dataAdobeId,
        divId: 'pdfContainer',
        locale: 'en-AU'
      });

      previewFilePromise.value = adobeDCView.previewFile(
        {
          content: {
            location: {
              url: url,
            },
          },
          metaData: {
            fileName: fileName,
            id: fileName,
          },
        },
        previewConfig
      );
    };

    onMounted(async () => {
      await loadAdobeSdk();

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

        if (window.AdobeDC) {
          adobeApiReady.value = true
        } else {
          document.addEventListener('adobe_dc_view_sdk.ready', () => {
            adobeApiReady.value = true;
            renderPdf();
          })
        }
      }
    });

    watch(
      () => [job.value?.previewUrl, job.value?.calculationStatus, job.value?.previewFilename],
      ([previewUrl, calculationStatus, previewFilename]) => {
        console.log("loading");
        if (previewUrl && calculationStatus == 7 && previewFilename) {
          renderPdf(previewUrl, previewFilename);
        }
      }
    );

    return {
      job,
      isLoading,
      errorMessage,
      adobeApiReady,
      previewFilePromise,
      renderPdf,
    };
  },
});
</script>

<style scoped>
@import url(https://local.fr5.com.au/Frontend-Assembly/Telerik.Sitefinity.Frontend/dist/assets/css/theme.bundle.css?package=FirstRatePlus);
/* Your CSS here */
</style>