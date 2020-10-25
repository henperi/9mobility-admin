export interface IAirtimePurchase {
  result: {
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

export const airtimePurchaseMockData = {
  responseCode: 0,
  message: 'string',
  result: [
    {
      id: 0,
      userId: 0,
      amount: 0,
      mobileNumber: 'string',
      recipientMobileNumber: 'string',
      voucherPIN: 'string',
      createdDate: '2020-10-25T12:08:21.612Z',
      transactionStatus: 1,
      transactionStatusName: 'string',
      beneficiaryType: 1,
      beneficiaryTypeName: 'string',
      reference: 'string',
      responseMessage: 'string',
    },
    {
      id: 0,
      userId: 0,
      amount: 0,
      mobileNumber: 'string',
      recipientMobileNumber: 'string',
      voucherPIN: 'string',
      createdDate: '2020-10-25T12:08:21.612Z',
      transactionStatus: 1,
      transactionStatusName: 'string',
      beneficiaryType: 1,
      beneficiaryTypeName: 'string',
      reference: 'string',
      responseMessage: 'string',
    },
    {
      id: 0,
      userId: 0,
      amount: 0,
      mobileNumber: 'string',
      recipientMobileNumber: 'string',
      voucherPIN: 'string',
      createdDate: '2020-10-25T12:08:21.612Z',
      transactionStatus: 1,
      transactionStatusName: 'string',
      beneficiaryType: 1,
      beneficiaryTypeName: 'string',
      reference: 'string',
      responseMessage: 'string',
    },
    {
      id: 0,
      userId: 0,
      amount: 0,
      mobileNumber: 'string',
      recipientMobileNumber: 'string',
      voucherPIN: 'string',
      createdDate: '2020-10-25T12:08:21.612Z',
      transactionStatus: 1,
      transactionStatusName: 'string',
      beneficiaryType: 1,
      beneficiaryTypeName: 'string',
      reference: 'string',
      responseMessage: 'string',
    },
    {
      id: 0,
      userId: 0,
      amount: 0,
      mobileNumber: 'string',
      recipientMobileNumber: 'string',
      voucherPIN: 'string',
      createdDate: '2020-10-25T12:08:21.612Z',
      transactionStatus: 1,
      transactionStatusName: 'string',
      beneficiaryType: 1,
      beneficiaryTypeName: 'string',
      reference: 'string',
      responseMessage: 'string',
    },
  ],
};

export const airtimeTransferMockData = {
  responseCode: 0,
  message: 'string',
  result: [
    {
      id: 0,
      userId: 0,
      amount: 0,
      sourceMobileNumber: 'string',
      recipientMobileNumber: 'string',
      createdDate: '2020-10-25T12:49:35.645Z',
      transactionStatus: 1,
      transactionStatusName: 'string',
      reference: 'string',
      responseMessage: 'string',
    },
    {
      id: 0,
      userId: 0,
      amount: 0,
      sourceMobileNumber: 'string',
      recipientMobileNumber: 'string',
      createdDate: '2020-10-25T12:49:35.645Z',
      transactionStatus: 1,
      transactionStatusName: 'string',
      reference: 'string',
      responseMessage: 'string',
    },
    {
      id: 0,
      userId: 0,
      amount: 0,
      sourceMobileNumber: 'string',
      recipientMobileNumber: 'string',
      createdDate: '2020-10-25T12:49:35.645Z',
      transactionStatus: 1,
      transactionStatusName: 'string',
      reference: 'string',
      responseMessage: 'string',
    },
  ],
};
