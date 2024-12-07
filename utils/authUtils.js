export function setTokenInCookie(token) {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 60); // Cookie expiration set to 1 hour

  // Set cookie without HttpOnly flag (this will allow client-side access)
  document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
}
