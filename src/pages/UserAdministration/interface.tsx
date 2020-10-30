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
            isActive: boolean;
          },
        ];
        isActive: boolean;
      },
    ];
  };
}

export interface ISingleUser {
  responseCode: 0;
  message: string;
  result: {
    username: string;
    email: string;
    mobileNumber: string;
    lastName: string;
    firstName: string;
    dateOfBirth: string;
    photoUrl: string;
    roleId: 0;
    backOfficeUserRoleDetailModels: [
      {
        userId1: 0;
        roleId: 0;
        id: 0;
        roleName: string;
        userName: string;
        isActive: boolean;
      },
    ];
    isActive: boolean;
  };
}
