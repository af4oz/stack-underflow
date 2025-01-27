import { PrismaClient } from "@prisma/client";
import { ResolverContext } from "./apollo";

export interface Context extends ResolverContext {
  prisma: PrismaClient;
}
