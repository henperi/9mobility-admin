export interface IPaymentHistory {
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
      transactionAmount: string;
      createdDate: string;
      dateCreated: string;
      timeCreated: string;
      transactionType: number;
      transactionSource: number;
      transactionTypeName: string;
      transactionSourceName: string;
      userId: number;
      mobileNumber: number;
      status: string;
      channel?: string;
    }[];
  };
}
