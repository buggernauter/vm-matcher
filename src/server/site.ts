const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_PRODUCTION_SITE_URL = "https://www.vmmatcher.se";

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

const resolveSiteUrl = () => {
  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!configuredSiteUrl) {
    return process.env.NODE_ENV === "production"
      ? DEFAULT_PRODUCTION_SITE_URL
      : DEFAULT_SITE_URL;
  }

  return normalizeSiteUrl(configuredSiteUrl);
};

export const getSiteUrl = () => resolveSiteUrl();

export const getMetadataBase = () => new URL(getSiteUrl());

export const getAbsoluteUrl = (pathname: string) =>
  new URL(pathname, `${getSiteUrl()}/`).toString();
