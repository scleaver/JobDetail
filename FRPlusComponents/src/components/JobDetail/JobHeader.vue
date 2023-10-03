<template>
    <div class="card border-0 flex-fill w-100">
        <div class="card-body p-7">
            <div class="row align-items-center h-100">
                <div class="col me-auto">
                    <div>
                        <h3 class="mb-0">{{ job.jobName }}</h3>
                    </div>
                    <span class="small text-secondary fw-bold d-block mb-4">{{ job.publicId }}</span>

                    <div class="d-flex align-items-center flex-wrap ">
                        <button type="button" class="btn btn-primary me-2 mb-1" data-bs-toggle="modal"
                            data-bs-target="#purchaseCertWoH">Purchase certificate</button>
                        <form action="/job-details-admin/CreateWoh" method="POST" name="JobDetails"> <input type="hidden"
                                name="JobId" value="KMD3ZRDT0P">
                            <input type="hidden" name="UserId" value="bfe6f8d4-e059-60ae-978d-ff00001648e5">
                            <button type="submit" class="btn btn-sm btn-outline-primary me-2 mb-1">New WoH
                                assessment</button>
                        </form>
                        <div class="dropdown">
                            <button class="btn btn-sm btn-outline-primary me-2 mb-1 dropdown-toggle" id="dropdownDownloads"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Downloads</button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownDownloads">
                                <li><a class="dropdown-item" href="/api/files/downloadfile/KMD3ZRDT0P/PreviewCertificate"
                                        download="">Certificate preview</a></li>
                                <li><a class="dropdown-item" href="/api/files/downloadfile/KMD3ZRDT0P/ProjectFile"
                                        download="">Project file</a></li>
                            </ul>
                        </div>
                        <div class="dropdown" data-bs-toggle="tooltip" data-bs-original-title="Actions">
                            <button class="dropdown-toggle no-arrow btn btn-sm mb-1 btn--icon-only" type="button"
                                id="dropdownActions" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16.5" width="16.5">
                                    <g>
                                        <circle cx="3.25" cy="12" r="3.25" style="fill: currentColor"></circle>
                                        <circle cx="12" cy="12" r="3.25" style="fill: currentColor"></circle>
                                        <circle cx="20.75" cy="12" r="3.25" style="fill: currentColor"></circle>
                                    </g>
                                </svg>
                                <span class="visually-hidden">Actions</span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownActions">
                                <li><a class="dropdown-item" href="#" download="">Delete</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-auto ms-auto text-center mt-8 mt-md-0">
                    <dl class="hstack d-inline-flex gap-6">
                        <div class="d-flex flex-column">
                            <dt class="text-secondary mb-0 order-1">Thermal rating</dt>
                            <dd class="h2 mb-0">{{ job.rating }}</dd>
                        </div>
                        <div class="vr"></div>
                        <div class="d-flex flex-column">
                            <dt class="text-secondary mb-0 order-1">WoH rating</dt>
                            <dd class="h2 mb-0">N/A</dd>
                        </div>
                    </dl>
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
