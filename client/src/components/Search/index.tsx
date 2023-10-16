import { memo, FocusEvent } from 'react';

import { ReactComponent as SearchIcon } from '../../assets/images/search-icon.svg';
import { ReactComponent as ClearIcon } from '../../assets/images/clear-icon.svg';

import styles from './Search.module.scss';

interface SearchProps {
  searchString: string;
  handleSetSearchString: (value: string) => void;
  eraseResults: () => void;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  showIcon: boolean;
  setSearchString: (value: string) => void;
  autoFocus: boolean;
}

const Search = ({
  searchString,
  handleSetSearchString,
  eraseResults,
  onFocus,
  placeholder,
  showIcon,
  setSearchString,
  autoFocus,
}: SearchProps) => {
  const onBlur = () => {
    !searchString && eraseResults();
  };

  return (
    <div className={styles.root}>
      {showIcon ? <SearchIcon className={styles.icon} /> : null}

      <input
        value={searchString}
        onChange={(e) => handleSetSearchString(e.target.value)}
        className={styles.input}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        name="name"
      />
      {searchString ? (
        <ClearIcon
          onClick={() => {
            eraseResults();
            setSearchString('');
          }}
          className={styles.clearIcon}
        />
      ) : null}
    </div>
  );
};

export default memo(Search);
