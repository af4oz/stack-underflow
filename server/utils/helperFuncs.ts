import { PageLimit } from "server/types";

export const paginateResults = (
  page: number,
  limit: number,
  docCount: number
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let results: { next?: PageLimit; previous?: PageLimit } = {};

  if (endIndex < docCount) {
    results.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }

  return {
    startIndex,
    endIndex,
    results,
  };
};
