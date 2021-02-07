import React, { useCallback } from 'react';

import Modal from '../../../components/modal/Modal';
import CharacterModalContent from '../CharacterModalContent';
import { Comic } from '../../../types/ComicTypes';
import FavoritesList from '../../favorites/FavoritesList';

function FavoriteCharactersList() {
  const renderModal = useCallback(
    (selectedCharacter, isModalOpen, setIsModalOpen) => {
      return (
        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          {selectedCharacter != null ? (
            <CharacterModalContent
              character={selectedCharacter}
              dataProvider="Marked as a favorite by the user"
            />
          ) : null}
        </Modal>
      );
    },
    [],
  );

  return <FavoritesList<Comic> renderModal={renderModal} />;
}

export default FavoriteCharactersList;
