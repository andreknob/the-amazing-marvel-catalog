import { Character } from '../types/CharacterTypes';
import { ResponseData } from '../types/CommonTypes';
import api from './api';

// @todo lembrar de colocar o theme e substituir onde tem a cor #121214;

class CharactersService {
  static async get(offset = 0, searchTerm: string | null) {
    const apikey = '';
    const nameStartsWith = searchTerm
      ? `nameStartsWith=${encodeURIComponent(searchTerm)}&`
      : '';

    const response = await api.get<ResponseData<Character>>(
      // `/characters?nameStartsWith=iron&orderBy=name&apikey=${apikey}`,
      `/characters?${nameStartsWith}offset=${offset}&orderBy=name&apikey=${apikey}`,
    );
    return response.data;
  }
}

export default CharactersService;
