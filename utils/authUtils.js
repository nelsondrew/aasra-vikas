export function setTokenInCookie(token) {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 60); // Cookie expiration set to 1 hour

  // Set cookie without HttpOnly flag (this will allow client-side access)
  document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
}


export const clearTokenCookie = () => {
  // Remove the 'token' cookie by setting it with an expired date
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};