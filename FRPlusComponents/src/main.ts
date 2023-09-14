import { defineCustomElement } from 'vue';
import JobDetail from './components/JobDetail.ce.vue';

const jobDetail = defineCustomElement(JobDetail);

customElements.define("job-detail", jobDetail);
