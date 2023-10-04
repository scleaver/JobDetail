<template>
    <div class="card border-0 h-100">
        <div class="card-header border-0">
            <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-end">
                <h2 class="card-header-title h4 text-uppercase">Certificate preview</h2>
                <a class="btn btn-sm btn-outline-primary ms-md-auto" :href="job.previewUrl" download>Download</a>
            </div>
        </div>
        <div class="card-body p-0 h-100">
            {{ adobeApiReady }}
            <div v-if="job.calculationStatus !== 7">
                Loading: {{ job.calculationStatusName }}
            </div>
            <div v-else ref="certContainer" class="h-100"></div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref, defineComponent, watch, type PropType, onMounted } from 'vue';
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
        const certContainer = ref<HTMLElement | null>(null);

        const loadAdobeSdk = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://documentservices.adobe.com/view-sdk/viewer.js';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const renderPdf = (url: string, fileName: string) => {
            if (!adobeApiReady.value) return;

            const previewConfig = {
                defaultViewMode: 'FIT_WIDTH',
                showAnnotationTools: false,
            };

            if (certContainer.value) {
                certContainer.value.innerHTML = '';
            }

            const viewer = document.createElement('div');
            viewer.id = 'viewer';

            if (certContainer.value) {
                certContainer.value.appendChild(viewer);
            }

            const adobeDCView = new AdobeDC.View({
                clientId: '9b98e1fecda342f38c1d6c8568021afe',
                divId: 'viewer',
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
            document.addEventListener('adobe_dc_view_sdk.ready', () => {
                adobeApiReady.value = true;
                if (props.job.previewUrl && props.job.calculationStatus == 7) {
                    const fullPreviewUrl = `https://local.fr5.com.au${props.job.previewUrl}`;
                    renderPdf(fullPreviewUrl, props.job.previewFilename);
                }
            })
        });

        watch(
            () => [props.job.previewUrl, props.job.calculationStatus, props.job.previewFilename],
            ([previewUrl, calculationStatus, previewFilename]) => {
                console.log("loading");
                if (previewUrl && calculationStatus == 7 && previewFilename) {
                    const fullPreviewUrl = `https://local.fr5.com.au${previewUrl}`;
                    renderPdf(fullPreviewUrl, previewFilename);
                }
            }
        );

        return {
            adobeApiReady,
            previewFilePromise,
            certContainer,
            renderPdf,
        };
    }
});
</script>
