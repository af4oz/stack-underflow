// import { AuthenticationError } from "apollo-server";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { TContext } from "../types";
import { JWT_SECRET } from "./config";
import { Context } from "lib/context";

const authChecker = (context?: Context) => {
  try {
    const token = context.req.headers.authorization;
    if (!token) {
      throw new Error("No auth token found. Authorization denied.");
    }

    if (!JWT_SECRET) throw new Error("please provide valid jwt token!");
    const decodedUser = jwt.verify(token, JWT_SECRET);
    return decodedUser as JwtPayload;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      // throw new AuthenticationError(JSON.stringify(err));
      throw new Error(JSON.stringify(err));
    }
  }
};
export default authChecker;
