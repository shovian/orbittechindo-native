const API_URL = 'https://www.omdbapi.com/';

// Function to fetch movies from OMDb API
export const fetchMovies = async ({
  apiKey,
  search = '',
  type = '',
  startYear='',
  endYear=''
}: {
  apiKey: string;
  search?: string;
  type?: 'movie' | 'series' | '';
  startYear?: string;
  endYear?: string;
}) => {
  try {
    if (!apiKey) throw new Error('API Key is required');

    const response = await fetch(
      `${API_URL}?apikey=${apiKey}&s=${search}&type=${type}`
    );

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Failed to fetch movies');
    }

    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
