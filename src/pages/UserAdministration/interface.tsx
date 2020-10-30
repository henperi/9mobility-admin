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

export interface ISingleUser {
  responseCode: number;
  message: string;
  result: {
    username: string;
    email: string;
    mobileNumber: string;
    lastName: string;
    firstName: string;
    dateOfBirth: string;
    photoUrl: string;
    roleId: number;
    backOfficeUserRoleDetailModels: [
      {
        userId1: number;
        roleId: number;
        id: number;
        roleName: string;
        userName: string;
        isActive: true;
      },
    ];
    isActive: true;
  };
}
