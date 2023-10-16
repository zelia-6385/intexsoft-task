import { memo } from 'react';

import { DataItem } from '../AutoCompleteInput';

import styles from './SearchResults.module.scss';

interface SearchBlockProps {
  results: DataItem[];
  onClick: (value: DataItem) => void;
  setSearchString: (value: string) => void;
  showNoResultsFlag: boolean;
  showNoResultsText: string;
  maxResults: number;
}

const SearchBlock = ({
  results,
  onClick,
  setSearchString,
  showNoResultsFlag,
  showNoResultsText,
  maxResults,
}: SearchBlockProps) => {
  const handleClick = (result: DataItem) => {
    onClick(result);
    setSearchString(result.name);
  };

  if (showNoResultsFlag) {
    return (
      <div className={styles.root}>
        <li>
          <div className="list-element">{showNoResultsText}</div>
        </li>
      </div>
    );
  }

  if (results?.length === 0 && !showNoResultsFlag) {
    return null;
  }

  return (
    <div className={styles.root}>
      {results
        ? results.slice(0, maxResults).map((result) => (
            <li key={result.id} onClick={() => handleClick(result)} className={styles.element}>
              <div className="list-element">{result.name}</div>
            </li>
          ))
        : null}
    </div>
  );
};

export default memo(SearchBlock);
