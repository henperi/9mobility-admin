export interface IPrepaidPackage {
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
      amount: null | number;
      name: string;
      description: string;
      icon: string;
      isPrepaidPlan: boolean;
      isRoamingEnabled: boolean;
      frequency: null | string;
    }[];
  };
}
