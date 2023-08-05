import ActivityPubService, { ActivityPubServiceOptions } from '$activityPub/ActivityPubService';
import { Application, Token } from '$activityPub/MastodonService.types';

type MastodonServiceOptions = ActivityPubServiceOptions;

class MastodonService extends ActivityPubService {
  constructor({ baseUrl }: MastodonServiceOptions) {
    super({ baseUrl });
  }

  static REDIRECT_URL_FOR_CODE = 'urn:ietf:wg:oauth:2.0:oob';

  // https://docs.joinmastodon.org/methods/apps/#create
  public async postApps({
    clientName,
    redirectUris,
    scopes,
    website,
  }: {
    clientName: string;
    redirectUris?: string[];
    scopes?: string[];
    website?: string;
  }) {
    return this.fetcher<Application>('/api/v1/apps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_name: clientName,
        redirect_uris: redirectUris?.join(' '),
        scopes: scopes?.join(' '),
        website,
      }),
    });
  }

  // https://docs.joinmastodon.org/methods/oauth/#token
  public async postToken({
    clientId,
    clientSecret,
    grantType,
    code,
    redirectUri,
    scopes,
  }: {
    grantType: 'client_credentials' | 'authorization_code';
    code?: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scopes?: string[];
  }) {
    return this.fetcher<Token>('/oauth/token', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: grantType,
        redirect_uri: redirectUri,
        code,
        scopes: scopes?.join(' '),
      }),
    });
  }

  public getAuthorizeUrl({
    responseType,
    clientId,
    redirectUri,
    scope,
    forceLogin,
    lang,
  }: {
    responseType: string;
    clientId: string;
    redirectUri: string;
    scope?: string;
    forceLogin?: boolean;
    lang?: string;
  }) {
    const searchParams = new URLSearchParams();
    searchParams.append('response_type', responseType);
    searchParams.append('client_id', clientId);
    searchParams.append('redirect_uri', redirectUri);
    scope && searchParams.append('scope', scope);
    forceLogin && searchParams.append('force_login', forceLogin.toString());
    lang && searchParams.append('lang', lang);
    return this.getUrl(`/oauth/authorize?${searchParams.toString()}`);
  }
}

export default MastodonService;
