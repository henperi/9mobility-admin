export interface IAirtimePurchase {
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
      voucherPIN: string;
      createdDate: string;
      transactionStatus: number;
      transactionStatusName: string;
      beneficiaryType: number;
      beneficiaryTypeName: string;
      reference: string;
      responseMessage: string;
    }[];
  };
}
export interface IAirtimeTransfer {
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
