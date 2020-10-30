export interface IRoaming {
  result: {
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
    nextPageUrl: string;
    prevPageUrl: null;
    results: [
      {
        id: number;
        callRateWithinLocation: string;
        callRateToNigeria: string;
        receivingCallRate: string;
        smsRate: string;
        gprsRate: string;
        operator: string;
        country: string;
      },
    ];
  };
}
