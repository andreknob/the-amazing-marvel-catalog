import { Thumbnail } from './CommonTypes';

type Series = {
  name: string;
};

type Stories = {
  available: number;
};

type Link = {
  type: string;
  url: string;
};

type Creator = {
  name: string;
  role: string;
};

type Creators = {
  items: Creator[];
};

export type Comic = {
  id: number;
  title: string;
  creators: Creators;
  description: string;
  resourceURI: string;
  thumbnail: Thumbnail;
  series: Series;
  stories: Stories;
  urls: Link[];
};
