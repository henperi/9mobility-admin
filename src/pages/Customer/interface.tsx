export interface ICustomers {
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
      mobileNumber: string;
      username: string;
      email: string;
      lastName: string;
      firstName: string;
      dateCreated: string;
      isWalletEnabled: boolean;
      registeredThrough: string;
      imageUrl: null | string;
    }[];
  };
}
