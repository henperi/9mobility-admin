export interface IDataPurchase {
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
      channel?: string;
    }[];
  };
}
export interface IDataTransfer {
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
      sourceMobileNumber: string;
      recipientMobileNumber: string;
      createdDate: string;
      transactionStatus: number;
      transactionStatusName: string;
      reference: string;
      responseMessage: string;
    }[];
  };
}
