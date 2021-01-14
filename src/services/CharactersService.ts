import api from './api';

interface ResponseData {
  attributionText: string;
  code: number;
  data: PageResults;
}

export interface Pagination {
  count: number;
  limit: number;
  offset: number;
  total: number;
}

interface PageResults extends Pagination {
  results: Result[];
}

export interface Result {
  id: number;
  name: string;
  description: string;
  resourceURI: string;
}

class CharactersService {
  static async get(): Promise<ResponseData> {
    //   static get<T, R = AxiosResponse<T>>(): Promise<R> {
    const apikey = '';

    const response = await api.get<ResponseData>(
      `/characters?nameStartsWith=iron&orderBy=name&apikey=${apikey}`,
    );
    return response.data;
  }
}

export default CharactersService;
