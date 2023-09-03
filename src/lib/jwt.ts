import exp from "constants";
import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
  const secret_key = process.env.NEXTAUTH_SECRET;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.NEXTAUTH_SECRET;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
}
 export function isAdminRole(token: string) {
  try {
    const decoded = jwt.decode(token) as {role: string};
    if(decoded.role !== "admin") {
      return false;
    }
    return true
  } catch (error) {
    return null;
  }
}