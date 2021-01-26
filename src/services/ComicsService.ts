import { Comic } from '../types/ComicTypes';
import { ResponseData } from '../types/CommonTypes';
import api from './api';

// @todo lembrar de colocar o theme e substituir onde tem a cor #121214;

class ComicsService {
  static async get(offset = 0, searchTerm: string | null) {
    const apikey = '';
    const titleStartsWith = searchTerm
      ? `titleStartsWith=${encodeURIComponent(searchTerm)}&`
      : '';

    const response = await api.get<ResponseData<Comic>>(
      `/comics?${titleStartsWith}offset=${offset}&orderBy=title&apikey=${apikey}`,
    );
    return response.data;
  }
}

export default ComicsService;
