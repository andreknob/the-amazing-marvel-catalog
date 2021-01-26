export type ResponseData<T> = {
  attributionText: string;
  code: number;
  data: PageResults<T>;
};

export type Pagination = {
  count: number;
  limit: number;
  offset: number;
  total: number;
};

interface PageResults<T> extends Pagination {
  results: T[];
}

export type Thumbnail = {
  path: string;
  extension: string;
};
