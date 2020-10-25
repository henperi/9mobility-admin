export interface IAudit {
  result: {
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
    nextPageUrl: string;
    prevPageUrl: string | null;
    responseCode: number;
    message: string;
    results: {
      isActive: boolean;
      backOfficeUserRoleDetailModels: null;
      username: string;
      email: string;
      mobileNumber: string;
      lastName: string;
      firstName: string;
      dateOfBirth: string;
      photoUrl: string;
    }[];
  };
}
