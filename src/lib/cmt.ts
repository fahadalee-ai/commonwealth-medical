export const CMT = {
  name: "Commonwealth Medical Transportation, LLC",
  short: "CMT",
  tagline: "Safe Transportation. Trusted Care.",
  values: "Safe. Reliable. Compassionate.",
  phone: "(774) 622-3789",
  phoneTel: "+17746223789",
  email: "info@ridewithcmt.com",
  address: "116 Wilson Ave, Spencer, MA 01562",
} as const;

export const AUTH_KEYS = {
  onboarded: "cmt_onboarded",
  session: "cmt_session",
  firstName: "cmt_first_name",
} as const;

export function markOnboarded() {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEYS.onboarded, "1");
}

export function markSignedIn(firstName = "Alex") {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEYS.onboarded, "1");
  localStorage.setItem(AUTH_KEYS.session, "1");
  localStorage.setItem(AUTH_KEYS.firstName, firstName);
}

export function signOut() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEYS.session);
}

export function getFirstName() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(AUTH_KEYS.firstName) ?? "";
}
