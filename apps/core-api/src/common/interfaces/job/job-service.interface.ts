export interface JobService {
  createJob(job: any): Promise<void>;
  updateJobStatus(jobId: string, status: string): Promise<void>;
  findJobById(jobId: string): Promise<any | null>;
}