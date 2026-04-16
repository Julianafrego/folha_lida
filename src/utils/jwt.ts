type TokenPayload = {
  userId: string;
  email: string;
  exp: number;
};

export function generateMockToken(payload: { userId: string; email: string }) {
  const tokenPayload: TokenPayload = {
    userId: payload.userId,
    email: payload.email,
    exp: Date.now() + 1000 * 60 * 60 * 24,
  };

  return btoa(JSON.stringify(tokenPayload));
}

export function decodeMockToken(token: string): TokenPayload | null {
  try {
    return JSON.parse(atob(token)) as TokenPayload;
  } catch {
    return null;
  }
}

export function isTokenValid(token: string): boolean {
  const decoded = decodeMockToken(token);

  if (!decoded) return false;

  return decoded.exp > Date.now();
}