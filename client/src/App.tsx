import { FC, MouseEvent, useEffect, useState } from 'react';

import { AutoCompleteInput, DataItem } from './components/AutoCompleteInput';

import { getCountriesSuggest } from './api/getCountriesSuggest';

import './scss/app.scss';

const App: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState<DataItem[]>([]);

  const formSubmit = (e: MouseEvent) => {
    e.preventDefault();

    console.log('SUBMIT');
  };

  const getResults = async (keyword: string) => {
    const resp = await getCountriesSuggest(keyword);
    const data = resp.data.map(({ name, id }) => ({ name, id }));

    setData(data);
  };

  useEffect(() => {
    if (searchValue.length) {
      getResults(searchValue);
    } else {
      setData([]);
    }
  }, [searchValue]);

  return (
    <div className="app-wrapper">
      <form>
        <AutoCompleteInput
          placeholder={'Поиск...'}
          data={data}
          onSearch={setSearchValue}
          inputSearchString={searchValue}
          inputDebounce={1200}
        />

        <button type="submit" onClick={formSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
