export function getSearchUrl(params: { [key: string]: string }): string {
  const query = new URLSearchParams();

  for (const key in params) {
    const value = params[key]?.trim();
    if (value) {
      query.set(key, value);
    }
  }

  return `/search?${query.toString()}`;
}
