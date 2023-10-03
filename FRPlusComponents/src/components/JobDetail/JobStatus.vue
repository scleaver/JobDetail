<template>
    <div class="card border-0 flex-fill w-100">
        <div class="card-body text-center">
            <div class="row align-items-center h-100">
                <div class="col">
                    <small class="text-secondary">Status</small>

                    <!-- Chart -->
                    <div class="chart-container w-100px h-100px mx-auto mt-3 rounded-circle bg-warning text-white lh-1">
                        <canvas id="profileCompletionChart"></canvas>

                        <!-- Labels -->
                        <div class="position-absolute top-50 start-50 translate-middle text-center">
                            <span class="fs-3">{{ job.jobStatusName }}</span>
                        </div>
                    </div>
                </div>
            </div> <!-- / .row -->
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
