export interface IError {
  responseCode: number;
  message: string;
}

export interface Response {
  responseCode: number;
  message: string;
  result: {
    id: number;
    lastName: string;
    firstName: string;
    photoUrl: string;
    isActive: boolean;
  };
}

export const emptyError = {
  responseCode: 0,
  message: '',
};
