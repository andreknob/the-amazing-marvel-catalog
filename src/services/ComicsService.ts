import { Comic } from '../types/ComicTypes';
import { ResponseData } from '../types/CommonTypes';
import api from './api';

class ComicsService {
  static async get(offset = 0, searchTerm: string | null) {
    const publicApikey = '';
    const titleStartsWith = searchTerm
      ? `titleStartsWith=${encodeURIComponent(searchTerm)}&`
      : '';

    const response = await api.get<ResponseData<Comic>>(
      `/comics?${titleStartsWith}offset=${offset}&orderBy=title&apikey=${publicApikey}`,
    );
    return response.data;
  }
}

export default ComicsService;
