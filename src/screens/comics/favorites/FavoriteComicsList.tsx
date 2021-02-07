import React, { useCallback } from 'react';

import Modal from '../../../components/modal/Modal';
import ComicModalContent from '../ComicModalContent';
import { Comic } from '../../../types/ComicTypes';
import FavoritesList from '../../favorites/FavoritesList';

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
