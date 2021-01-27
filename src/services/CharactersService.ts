import { Character } from '../types/CharacterTypes';
import { ResponseData } from '../types/CommonTypes';
import api from './api';

class CharactersService {
  static async get(offset = 0, searchTerm: string | null) {
    const publicApikey = '';
    const nameStartsWith = searchTerm
      ? `nameStartsWith=${encodeURIComponent(searchTerm)}&`
      : '';

    const response = await api.get<ResponseData<Character>>(
      `/characters?${nameStartsWith}offset=${offset}&orderBy=name&apikey=${publicApikey}`,
    );
    return response.data;
  }
}

export default CharactersService;
