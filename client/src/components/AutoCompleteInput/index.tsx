import { useState, useCallback, useEffect, FocusEventHandler, FocusEvent } from 'react';

import Search from '../Search';
import SearchResults from '../SearchResults';

import { debounce } from '../../utils/utils';

export const DEFAULT_INPUT_DEBOUNCE = 400;
export const MAX_RESULTS = 5;

export type DataItem = {
  id: string | number;
  name: string;
};

interface AutoCompleteInputProps {
  data: DataItem[];
  inputDebounce?: number;
  onSearch: (keyword: string) => void;
  onSelect: (result: string) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  showIcon?: boolean;
  maxResults?: number;
  placeholder?: string;
  autoFocus?: boolean;
  inputSearchString?: string;
  showNoResults?: boolean;
  showNoResultsText?: string;
}

export const AutoCompleteInput = ({
  data,
  inputSearchString = '',
  showNoResults = true,
  showNoResultsText = 'No results',
  inputDebounce = DEFAULT_INPUT_DEBOUNCE,
  maxResults = MAX_RESULTS,
  onSearch = () => {},
  onFocus = () => {},
  onSelect = () => {},
  placeholder = '',
  autoFocus = false,
  showIcon = true,
}: AutoCompleteInputProps) => {
  const [searchString, setSearchString] = useState(inputSearchString);
  const [results, setResults] = useState(data);
  const [isTyping, setIsTyping] = useState(false);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [showNoResultsFlag, setShowNoResultsFlag] = useState(false);

  useEffect(() => {
    setSearchString(inputSearchString);

    const timeoutId = setTimeout(
      () => setResults(inputSearchString ? results.concat([inputSearchString as never]) : []),
      0,
    );

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearchString]);

  useEffect(() => {
    if (results) {
      onSearch(searchString);
      setIsTyping(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  useEffect(() => {
    if (searchString && !isSearchComplete && !isTyping) {
      setResults(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  useEffect(() => {
    if (
      showNoResults &&
      searchString.length > 0 &&
      !isTyping &&
      data.length === 0 &&
      !isSearchComplete
    ) {
      setShowNoResultsFlag(true);
    } else {
      setShowNoResultsFlag(false);
    }
  }, [isTyping, showNoResults, isSearchComplete, searchString, data]);

  const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus(event);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOnSearch = useCallback(
    inputDebounce > 0
      ? debounce((keyword: string) => onSearch(keyword), inputDebounce)
      : (keyword: string) => onSearch(keyword),
    [results],
  );

  const handleSetSearchString = (value: string) => {
    setSearchString(value);
    handleOnSearch(value);
    setIsTyping(true);

    if (isSearchComplete) {
      setIsSearchComplete(false);
    }
  };

  const eraseResults = () => {
    setResults([]);
    setIsSearchComplete(true);
  };

  const handleOnClick = (result: DataItem) => {
    onSelect(result.name);
    setSearchString(result.name);
    eraseResults();
  };

  return (
    <div>
      <Search
        searchString={searchString}
        setSearchString={setSearchString}
        handleSetSearchString={handleSetSearchString}
        onFocus={handleOnFocus}
        eraseResults={eraseResults}
        placeholder={placeholder}
        showIcon={showIcon}
        autoFocus={autoFocus}
      />
      <SearchResults
        onClick={handleOnClick}
        setSearchString={setSearchString}
        showNoResultsFlag={showNoResultsFlag}
        results={!isSearchComplete ? data : []}
        maxResults={maxResults}
        showNoResultsText={showNoResultsText}
      />
    </div>
  );
};
