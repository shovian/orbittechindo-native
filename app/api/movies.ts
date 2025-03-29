export const fetchMovies = async ({
  search,
  type='movie',
  startYear,
  endYear,
}: {
  search: string;
  type: string;
  startYear?: string;
  endYear?: string;
}) => {
  const params = new URLSearchParams({
    query: search,
    type,
  });

  // Append startYear and endYear if they exist
  if (startYear&&endYear) {
    params.append('startYear', startYear);
    params.append('endYear', endYear);
  }
  console.log(params.toString());

  const response = await fetch(`https://websitenet-eight.vercel.app/api/movies?${params.toString()}`, {
    credentials: 'include',
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
    
  }

  return data;
};