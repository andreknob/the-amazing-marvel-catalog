import React, { useCallback } from 'react';

import Modal from '../../../components/modal/Modal';
import FavoritesList from '../../../components/favorites/FavoritesList';
import { Comic } from '../../../types/ComicTypes';
import CharacterModalContent from '../CharacterModalContent';

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
