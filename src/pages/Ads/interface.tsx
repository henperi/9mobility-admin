export interface IAds {
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
      name: string;
      description: string;
      imageUrl: string;
      createdDate: string;
      createdBy: string;
      pageId: number;
      isActive: boolean;
    }[];
  };
}
