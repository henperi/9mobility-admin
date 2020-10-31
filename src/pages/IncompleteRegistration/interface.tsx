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
      mobileNumber: string;
      dateRegistered: string;
      otp: string;
      status: string;
    }[];
  };
}
