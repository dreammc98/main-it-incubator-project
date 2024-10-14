export type FieldErrorType = {
  error: string;
  field: string;
};

export type BaseResponse<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors: FieldErrorType[];
};
