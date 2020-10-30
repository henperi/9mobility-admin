export interface IUser {
  responseCode: number;
  message: string;
  result: {
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
    nextPageUrl: string;
    prevPageUrl: string;
    results: [
      {
        id: number;
        username: string;
        email: string;
        mobileNumber: string;
        lastName: string;
        firstName: string;
        dateCreated: string;
        isWalletEnabled: true;
        registeredThrough: string;
        imageUrl: string;
      },
    ];
  };
}
