export type Application = {
  name: string;
  website?: string;
  redirect_uri: string;
  vapid_key: string;
  client_id?: string;
  client_secret?: string;
};

export type Token = {
  access_token: string;
  token_type: string;
  scope: string;
  created_at: number;
};
