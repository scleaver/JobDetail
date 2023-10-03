export interface Job {
    id: string;
    publicId: string;
    userId: string;
    calculationStatus: number;
    calculationStatusName: string;
    jobName: string;
    filename: string;
    projectFileReleaseNumber: number;
    executeReleaseNumber: null | number;
    postcode: string;
    previewUrl: string;
    previewFilename: string;
    address: string;
    jobStatus: number;
    jobStatusName: string;
    climateZone: {
      fullName: string;
      name: string;
      value: number;
    };
    createdDateUtc: string;  // You can also use Date if you're parsing this field
    certificateIssuedDateUtc: null | string;  // You can also use Date if you're parsing this field
    accreditationNumber: string;
    assessorReference: string;
    propertyType: string;
    rating: number;
    comment: string;
  }
  