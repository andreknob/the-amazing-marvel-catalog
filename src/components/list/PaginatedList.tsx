import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Favorite as FavoriteIcon } from '@material-ui/icons';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import Button, { ButtonContainer } from '../button/Button';
import LetterFilterBar from '../letter-filter-bar/LetterFilterBar';
import PaginationBar from '../pagination-bar/PaginationBar';
import { Character } from '../../types/CharacterTypes';
import { Comic } from '../../types/ComicTypes';
import { Pagination, ResponseData } from '../../types/CommonTypes';
import useQuery from '../../hooks/useQuery';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import ListItem, { DisplayPropEnum } from './ListItem';

const PAGE_SIZE = 20;

const Container = styled.div`
  width: 70%;
  margin: 32px auto 0 auto;
`;

const Items = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledButtonContainer = styled(ButtonContainer)`
  margin-right: 8px;
`;

const StyledLink = styled(Link)`
  padding: 8px 16px;
  color: ${(props) => props.theme.primary};
  text-decoration: none;

  display: flex;
  align-items: center;
`;

const FavoriteLabel = styled.span`
  margin-left: 8px;
`;

interface Props<Item> {
  renderModal: (
    selectedItem: Item | null,
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void,
    dataProvider: string,
  ) => void;
  fetchCallback: (
    offset: number,
    searchTerm: string | null,
  ) => Promise<ResponseData<Item>>;
  displayProp?: keyof typeof DisplayPropEnum;
}

function PaginatedList<Item extends Character | Comic>({
  renderModal,
  fetchCallback,
  displayProp = 'name',
}: Props<Item>) {
  const location = useLocation();
  const query = useQuery(location.search);

  const [pagination, setPagination] = useState<Pagination>();
  const [dataProvider, setDataProvider] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const searchTerm = query.get('search');
    const page = query.get('page') ?? 1;

    const offset = (Number(page) - 1) * PAGE_SIZE;
    const { data, attributionText } = await fetchCallback(offset, searchTerm);
    const { results, ...paginationData } = data;

    setItems(results);
    setDataProvider(attributionText);
    setPagination(paginationData);
    setIsLoading(false);
  }, [setItems, setDataProvider, setPagination, query, fetchCallback]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleItemClick = useCallback(
    (index) => {
      setIsModalOpen(true);
      setSelectedIndex(index);
    },
    [setIsModalOpen, setSelectedIndex],
  );

  const selectedItem = useMemo(
    () => (selectedIndex != null ? items[selectedIndex] : null),
    [items, selectedIndex],
  );

  const LetterFilterBarElement = <LetterFilterBar query={query} />;
  const PaginationBarElement = pagination != null && (
    <PaginationBar pagination={pagination} query={query} />
  );

  return (
    <>
      <Container>
        {LetterFilterBarElement}
        {PaginationBarElement}
        <StyledButtonContainer>
          <Button secondaryborder={false}>
            <StyledLink to={`${location.pathname}/favorites`}>
              <>
                <FavoriteIcon />
                <FavoriteLabel>See favorites</FavoriteLabel>
              </>
            </StyledLink>
          </Button>
        </StyledButtonContainer>
        <Items>
          {items?.map((item, index) => (
            <ListItem<Item>
              key={item.id}
              onClick={() => handleItemClick(index)}
              item={item}
              displayProp={displayProp}
            />
          ))}
        </Items>

        {PaginationBarElement}
        {LetterFilterBarElement}
      </Container>

      {renderModal(selectedItem, isModalOpen, setIsModalOpen, dataProvider)}

      <LoadingSpinner isLoading={isLoading} />
    </>
  );
}

export default PaginatedList;
