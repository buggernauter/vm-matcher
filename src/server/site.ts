const DEFAULT_SITE_URL = "http://localhost:3000";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const normalizeSiteUrl = (value?: string) => {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return DEFAULT_SITE_URL;
  }

  const candidate = /^https?:\/\//i.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;

  try {
    return trimTrailingSlash(new URL(candidate).toString());
  } catch {
    return DEFAULT_SITE_URL;
  }
};

export const getSiteUrl = () =>
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const getMetadataBase = () => new URL(getSiteUrl());

export const getAbsoluteUrl = (pathname: string) =>
  new URL(pathname, `${getSiteUrl()}/`).toString();
