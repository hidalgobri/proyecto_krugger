export type LoginMutationData = {
  login: {
    token: string;
  };
};

export type LoginMutationVars = {
  username: string;
  password: string;
};