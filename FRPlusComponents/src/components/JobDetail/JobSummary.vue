<template>
    <div class="card border-0 mb-md-0">
        <div class="card-header border-0">
            <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-end">
                <h2 class="card-header-title h4 text-uppercase">Job information</h2>
            </div>
        </div>
        <div class="card-body pt-0">
            <dl class="c-key-value mb-0">
                <div>
                    <dt>
                        <template v-if="job.jobStatus != 7">
                            FirstRate5 ID
                        </template>
                        <template v-else>Certificate ID</template></dt>
                    <dd>
                        {{ job.publicId }}
                    </dd>
                </div>
                <div>
                    <dt>Certificate issued</dt>
                    <dd>
                        <template v-if="job.certificateIssuedDateUtc">
                            {{ formatDate(job.certificateIssuedDateUtc) }}
                        </template>
                        <span v-else class="text-muted">Certificate not issued.</span>
                    </dd>
                </div>
                <div>
                    <dt>Job name</dt>
                    <dd>
                        {{ job.jobName }}
                        <button type="button" title="Edit job name" class="btn btn-sm btn--icon-only">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil" viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z">
                                </path>
                            </svg><span class="visually-hidden">Edit</span>
                        </button>
                    </dd>
                </div>
                <div>
                    <dt>Project filename</dt>
                    <dd>{{ job.filename }}</dd>
                </div>
                <div>
                    <dt>Assessed address</dt>
                    <dd>{{ job.address }}</dd>
                </div>
                <div>
                    <dt>Assessed postcode</dt>
                    <dd>{{ job.postcode }}</dd>
                </div>
                <div>
                    <dt>Property type</dt>
                    <dd>{{ job.propertyType }}</dd>
                </div>
                <div>
                    <dt>NatHERS climate zone</dt>
                    <dd>{{ job.climateZone.fullName }}</dd>
                </div>
                <div>
                    <dt>Assessor accrediation no.</dt>
                    <dd>{{ job.accreditationNumber }}</dd>
                </div>
                <div>
                    <dt>Assessor reference</dt>
                    <dd>
                        <template v-if="job.assessorReference">
                            {{ job.assessorReference }}
                        </template>
                        <span v-else class="text-muted">No reference.</span>
                    </dd>
                </div>
                <div>
                    <dt>Created</dt>
                    <dd>{{ formatDate(job.createdDateUtc) }}</dd>
                </div>
                <div>
                    <dt>Comments</dt>
                    <dd><template v-if="job.comment">
                            {{ job.comment }}
                        </template>
                        <span v-else class="text-muted">No comments.</span>
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { formatDate } from '@/utils/dateUtils';
import type { Job } from '@/types/Job';

export default defineComponent({
    props: {
        job: {
            type: Object as PropType<Job>,
            required: true,
        },
    },
    methods: {
        formatDate,
    },
});
</script>
  
<style scoped>
/* Your CSS here */
</style>