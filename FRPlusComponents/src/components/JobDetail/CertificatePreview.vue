<template>
    <div class="card border-0 h-100">
        <div class="card-header border-0">
            <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-end">
                <h2 class="card-header-title h4 text-uppercase">Certificate preview</h2>
                <a class="btn btn-sm btn-outline-primary ms-md-auto" :href="job.previewUrl" download>Download</a>
            </div>
        </div>
        <div class="card-body p-0 h-100">
            <div ref="certView" class="h-100"></div>
            <div v-if="job.calculationStatus !== 7">
                Loading: {{ job.calculationStatusName }}
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref, defineComponent, type PropType, onMounted } from 'vue';
import type { Job } from '@/types/Job';

export default defineComponent({
  props: {
    job: {
      type: Object as PropType<Job>,
      required: true,
    },
  },
  setup(props) {
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

    onMounted(async () => {
      await loadAdobeSdk();
      document.addEventListener("adobe_dc_view_sdk.ready", () => {
        adobeApiReady.value = true;
        const adobeDCView = new AdobeDC.View({ clientId: "9b98e1fecda342f38c1d6c8568021afe", divId: "cert-view" });
        if (props.job.calculationStatus === 7 && props.job.previewUrl) {
          adobeDCView.previewFile({
            content: { location: { url: props.job.previewUrl } },
            metaData: { fileName: props.job.previewFilename }
          }, { embedMode: "SIZED_CONTAINER" });
        }
      });
    });

    return {
      adobeApiReady,
      previewFilePromise,
    };
  }
});
</script>
