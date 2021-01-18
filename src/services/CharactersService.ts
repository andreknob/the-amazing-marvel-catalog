import { ResponseData } from '../types/CharacterTypes';
import api from './api';

class CharactersService {
  static async get() {
    const apikey = '';

    const response = await api.get<ResponseData>(
      `/characters?nameStartsWith=iron&orderBy=name&apikey=${apikey}`,
    );
    return response.data;
  }
}

export default CharactersService;
