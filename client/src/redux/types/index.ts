export type IRegisterData = {
  name: string;
  email: string;
  password: string;
};

export type ILoginCredential = {
  email: string;
  password: string;
};

export type IInitialState = {
  user: {
    _id: string;
    name: string;
    email: string;
  } | null;
  token: string;
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
};
