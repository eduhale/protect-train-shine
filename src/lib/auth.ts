export const AUTH_DOMAIN = "centrotreinamento.app";

/** Username login: auth needs an email, so the username maps to a deterministic synthetic address. */
export function usernameToEmail(username: string) {
  const u = username.trim().toLowerCase();
  if (u.includes("@")) return u;
  return `${u.replace(/[^a-z0-9._-]/g, "")}@${AUTH_DOMAIN}`;
}
