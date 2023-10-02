export interface Job {
    Id: string;
    JobId: string;
    UserId: string;
    CertificateState: string;
    JobName: string;
    Filename: string;
    ProjectFileReleaseNumber: number;
    Postcode: string;
    PreviewUrl: string;
    PreviewFilename: string;
    Address: string;
    JobStatus: string;  // Replace with the actual type
    ClimateZone: number;
    ClimateZoneName: string;
    CreatedDateUtc: string;
    IssuedDateUtc: string | null;
    Accreditation: string;
    AssessorReference: string;
    PropertyType: string;
    Rating: number | null;
    Comments: string;
    OwnerUsername: string;
    OwnerName: string;
    OwnerEmail: string;
  }