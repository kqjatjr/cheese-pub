export type ActivityPubServiceOptions = {
  baseUrl: string;
};
class ActivityPubService {
  private baseUrl: string;

  constructor({ baseUrl }: ActivityPubServiceOptions) {
    this.baseUrl = baseUrl;
  }

  protected getUrl(url: string): string {
    return `${this.baseUrl}${url}`;
  }

  protected async fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(this.getUrl(url), {
      ...options,
      headers: {
        ...options.headers,
      },
    });
    return res.json();
  }
}

export default ActivityPubService;
