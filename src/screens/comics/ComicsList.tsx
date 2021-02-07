import React, { useCallback } from 'react';

import Modal from '../../components/modal/Modal';
import ComicsService from '../../services/ComicsService';
import { Comic } from '../../types/ComicTypes';
import ComicModalContent from './ComicModalContent';
import PaginatedList from '../../components/list/PaginatedList';

function ComicsList() {
  const renderModal = useCallback(
    (selectedComic, isModalOpen, setIsModalOpen, dataProvider) => {
      return (
        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          {selectedComic != null ? (
            <ComicModalContent
              dataProvider={dataProvider}
              comic={selectedComic}
            />
          ) : null}
        </Modal>
      );
    },
    [],
  );

  return (
    <>
      <PaginatedList<Comic>
        renderModal={renderModal}
        fetchCallback={ComicsService.get}
        displayProp="title"
      />
    </>
  );
}

export default ComicsList;
