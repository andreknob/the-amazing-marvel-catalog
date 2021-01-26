import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface SearchTermContextData {
  searchTerm: string | null;
  setSearchTerm: Dispatch<SetStateAction<string | null>>;
}

const SearchTermContext = createContext<SearchTermContextData>(
  {} as SearchTermContextData,
);

interface AuthProviderType {
  children: JSX.Element;
}

export const AuthProvider: React.FC<AuthProviderType> = ({
  children,
}: AuthProviderType) => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  return (
    <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchTermContext.Provider>
  );
};

export function useSearchTerm() {
  const context = useContext(SearchTermContext);

  return context;
}
