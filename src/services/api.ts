import _chunk from "lodash.chunk";
import database from "./database";
import { SerializedLink } from "./models";
import { validURL } from "../utils";
import { VoteType } from "../helpers";

interface CreateLinkParam {
  name: string;
  url: string;
}

export type SortByType = "score" | "date";
export type OrderType = "asc" | "desc";

interface GetLinksParam {
  page: number;
  sortBy: SortByType;
  order: "asc" | "desc";
}

type PaginationResponse = {
  page: number;
  pageCount: number;
  values: SerializedLink[];
};

const LIMIT = 5;

type VoteParam = {
  id: string;
  type: VoteType;
};

// NOTE Link kontrolü ve eklemek.
export async function createLink({ name, url }: CreateLinkParam): Promise<SerializedLink> {
  if (!validURL(url)) {
    throw new Error("This URL is not valid. Please enter a valid URL.");
  }

  const prevLinks = database.getAllLinks();
  const hasLinkInDatabase = prevLinks.findIndex((prev) => prev.url === url) > -1;

  if (hasLinkInDatabase) {
    throw new Error("This link is available, please enter a different url.");
  }

  const newLink = database.createLink({
    name,
    url,
  });

  return newLink;
}

// NOTE Linkleri çekmek ve page kontrolü
export async function getLinks({ order, page, sortBy }: GetLinksParam): Promise<PaginationResponse> {
  if (page < 1) {
    throw new Error("page must be greater than 0.");
  }

  const links = database
    .getAllLinks()
    .map((i) => ({ ...i, score: Math.floor(i.score) }))
    .sort(sortAlgorithm(sortBy, order));

  const pages = _chunk(links, LIMIT).map((values, index) => ({
    values,
    page: index + 1,
  }));

  if (pages.length < page) {
    return {
      page,
      values: [],
      pageCount: pages.length,
    };
  }

  return {
    ...pages[page - 1],
    pageCount: pages.length,
  };
}

// NOTE Oy verme kontrolü ve oy verme fonksiyonları
export async function vote({ id, type }: VoteParam) {
  const link = database.getAllLinks().find((l) => l.id === id);

  if (!link) {
    throw new Error("Link not found.");
  }

  database.updateLink(id, {
    ...link,
    score: link.score + (type === "upvote" ? 1 : -1),
  });
}

// NOTE Link silme fonksiyonu
export async function deleteLink(id: string) {
  database.deleteLink(id);
}

// NOTE Sıralama fonksiyonu
export function sortAlgorithm(sortBy: SortByType, order: OrderType) {
  return (a: SerializedLink, b: SerializedLink) => {
    if (sortBy === "score") {
      const response = a.score - b.score;
      if (response === 0) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return response * (order === "asc" ? 1 : -1);
    }

    const response = a.createdAt.getTime() - b.createdAt.getTime();
    if (response === 0) {
      return b.score - a.score;
    }
    return response * (order === "asc" ? 1 : -1);
  };
}
