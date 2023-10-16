import axios from 'axios';

interface CountiresSearchResponse {
  name: string;
  id: number;
  country_code: string;
}

export const getCountriesSuggest = async (name: string) => {
  const url = 'http://localhost:9090/api/countries';

  const data = await axios.get<CountiresSearchResponse[]>(url, { params: { name } });

  return data;
};
