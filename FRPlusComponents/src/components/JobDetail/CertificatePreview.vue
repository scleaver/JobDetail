<template>
    <div class="card border-0 h-100">
        <div class="card-header border-0">
            <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-end">
                <h2 class="card-header-title h4 text-uppercase">Certificate preview</h2>
                <a class="btn btn-sm btn-outline-primary ms-md-auto"
                    :href="job.previewUrl" download>Download</a>
            </div>
        </div>
        <div class="card-body p-0 h-100">
            <div id="cert-view" class="h-100"></div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Job } from '@/types/Job';

export default defineComponent({
    props: {
        job: {
            type: Object as PropType<Job>,
            required: true,
        },
    },
    // methods, computed properties, etc.
});
</script>
