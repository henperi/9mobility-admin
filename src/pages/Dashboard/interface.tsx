export interface IUsers {
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
      userId: number;
      amount: number;
      mobileNumber: string;
      recipientMobileNumber: string;
      createdDate: string;
      transactionStatus: number;
      transactionStatusName: string;
      beneficiaryType: number;
      beneficiaryTypeName: string;
      offeringId: string;
      reference: string;
      responseMessage: string;
    }[];
  };
}
