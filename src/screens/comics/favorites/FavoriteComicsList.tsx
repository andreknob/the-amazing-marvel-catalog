import React, { useCallback } from 'react';

import Modal from '../../../components/modal/Modal';
import FavoritesList from '../../../components/favorites/FavoritesList';
import { Comic } from '../../../types/ComicTypes';
import ComicModalContent from '../ComicModalContent';

function FavoriteComicsList() {
  const renderModal = useCallback(
    (selectedComic, isModalOpen, setIsModalOpen) => {
      return (
        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          {selectedComic != null ? (
            <ComicModalContent
              comic={selectedComic}
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

export default FavoriteComicsList;
