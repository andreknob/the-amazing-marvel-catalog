import { ResponseData } from '../types/CharacterTypes';
import api from './api';

// @todo lembrar de colocar o theme e substituir onde tem a cor #121214;

class CharactersService {
  static async get(offset = 0) {
    const apikey = '';

    const response = await api.get<ResponseData>(
      // `/characters?nameStartsWith=iron&orderBy=name&apikey=${apikey}`,
      `/characters?offset=${offset}orderBy=name&apikey=${apikey}`,
    );
    return response.data;
  }
}

export default CharactersService;
