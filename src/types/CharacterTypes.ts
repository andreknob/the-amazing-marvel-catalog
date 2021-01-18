export type ResponseData = {
  attributionText: string;
  code: number;
  data: PageResults;
};

export type Pagination = {
  count: number;
  limit: number;
  offset: number;
  total: number;
};

interface PageResults extends Pagination {
  results: Character[];
}

type Thumbnail = {
  path: string;
  extension: string;
};

type Series = {
  available: number;
};

type Stories = {
  available: number;
};

type Link = {
  type: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  description: string;
  resourceURI: string;
  thumbnail: Thumbnail;
  series: Series;
  stories: Stories;
  urls: Link[];
};
