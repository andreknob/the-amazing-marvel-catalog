import React, { useCallback } from 'react';
import PaginatedList from '../../components/list/PaginatedList';

import Modal from '../../components/modal/Modal';
import CharactersService from '../../services/CharactersService';
import { Character } from '../../types/CharacterTypes';
import CharacterModalContent from './CharacterModalContent';

function CharactersList() {
  const renderModal = useCallback(
    (selectedCharacter, isModalOpen, setIsModalOpen, dataProvider) => {
      return (
        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          {selectedCharacter != null ? (
            <CharacterModalContent
              dataProvider={dataProvider}
              character={selectedCharacter}
            />
          ) : null}
        </Modal>
      );
    },
    [],
  );

  return (
    <>
      <PaginatedList<Character>
        renderModal={renderModal}
        fetchCallback={CharactersService.get}
      />
    </>
  );
}

export default CharactersList;
