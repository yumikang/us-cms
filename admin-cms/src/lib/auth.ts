import jwt from 'jsonwebtoken';

export interface JWTPayload {
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Get environment variables (lazy loading)
function getConfig() {
  return {
    JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123!@#'
  };
}

// Verify admin credentials
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const config = getConfig();

  if (username !== config.ADMIN_USERNAME) {
    return false;
  }

  // For simplicity in development, just compare plain text
  // In production, you should use proper hashing
  return password === config.ADMIN_PASSWORD;
}

// Generate JWT token
export function generateToken(username: string): string {
  const config = getConfig();
  const payload: JWTPayload = {
    username,
    role: 'admin'
  };

  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: '24h' // Token expires in 24 hours
  });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    const config = getConfig();
    const decoded = jwt.verify(token, config.JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

// Extract token from Authorization header
export function extractToken(authorization: string | null): string | null {
  if (!authorization) return null;

  const parts = authorization.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

// Middleware to check authentication
export async function isAuthenticated(authorization: string | null): Promise<boolean> {
  const token = extractToken(authorization);

  if (!token) {
    return false;
  }

  const payload = verifyToken(token);
  return payload !== null;
}