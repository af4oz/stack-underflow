import jwt, { JwtPayload } from "jsonwebtoken";
// import { TContext } from '../types'
import { JWT_SECRET } from "./config";
import { Context } from "src/server/resolvers/context";

const getUser = (context: Context) => {
  const token = context.req.headers.authorization;

  if (!token) {
    return null;
  }
  if (!JWT_SECRET) throw new Error("please provide valid jwt token!");
  try {
    const decodedUser = jwt.verify(token, JWT_SECRET);
    return decodedUser as JwtPayload;
  } catch (_) {
    return null;
  }
};
export default getUser;
