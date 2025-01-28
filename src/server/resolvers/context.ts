import { PrismaClient } from "@prisma/client";
import { ResolverContext } from "../../lib/apollo";

export interface Context extends ResolverContext {
  prisma: PrismaClient;
}
