import { Character } from './CharacterTypes';
import { Comic } from './ComicTypes';

export function determineIfIsComic(
  toBeDetermined: Comic | Character,
): toBeDetermined is Comic {
  if ((toBeDetermined as Comic).title) {
    return true;
  }
  return false;
}

export function determineIfIsCharacter(
  toBeDetermined: Comic | Character,
): toBeDetermined is Character {
  if ((toBeDetermined as Character).name) {
    return true;
  }
  return false;
}
