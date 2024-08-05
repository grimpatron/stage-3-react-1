const API_URL = 'https://swapi.dev/api/';
const API_CATEGORY = 'people';

interface ApiResponse {
  results: string[];
}

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error('Error receiving data:', response.status);
      return false;
    }

    const data = (await response.json()) as ApiResponse;
    // console.log(data.results);
    return data;
  } catch (error) {
    console.error('Error receiving data:', error);
    return false;
  }
};

// fetchData(API_URL + API_CATEGORY).then(body => console.log(body));

(async () => {
  const body = await fetchData(API_URL + API_CATEGORY);
  console.log('body', body);
})();