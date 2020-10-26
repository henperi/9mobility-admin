export interface IRegNotcomplete {
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
      id: number;
      dateCreated: string;
      username: string;
      email: string;
      mobileNumber: string;
      lastName: string;
      firstName: string;
    }[];
  };
}
