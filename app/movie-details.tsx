import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Rating } from './(tabs)/types';
import { BarChart } from 'react-native-chart-kit';

const MovieDetailsScreen: React.FC = () => {
  const { movie } = useLocalSearchParams();
  const movieData = JSON.parse(movie as string);
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://websitenet-eight.vercel.app/api/movie?id=${movieData.imdbID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieData.imdbID]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Movie details not found</Text>
      </View>
    );
  }

  // Prepare data for the chart
  const ratingsData = movieDetails.Ratings?.map((rating: Rating) => {
    const value = rating.Value.includes('/10')&&!rating.Value.includes('/100')
      ? parseFloat(rating.Value.split('/')[0])*10 // Convert percentage to numeric
      : parseFloat(rating.Value.split('/')[0]) || 0; // Extract numeric value for other formats
    return {
      source: rating.Source,
      value,
    };
  }) || [];

  const chartLabels = ratingsData.map((rating: { source: any; }) => rating.source);
  const chartValues = ratingsData.map((rating: { value: any; }) => rating.value);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={{ uri: movieDetails.Poster }} style={styles.poster} />
      <Text style={styles.title}>{movieDetails.Title}</Text>
      <Text style={styles.year}>Year: {movieDetails.Year}</Text>
      <Text style={styles.genre}>Genre: {movieDetails.Genre}</Text>
      <Text style={styles.director}>Director: {movieDetails.Director}</Text>
      <Text style={styles.writer}>Writer: {movieDetails.Writer}</Text>
      <Text style={styles.actors}>Actors: {movieDetails.Actors}</Text>
      <Text style={styles.language}>Language: {movieDetails.Language}</Text>
      <Text style={styles.country}>Country: {movieDetails.Country}</Text>
      <Text style={styles.released}>Released: {movieDetails.Released}</Text>
      <Text style={styles.runtime}>Runtime: {movieDetails.Runtime}</Text>
      <Text style={styles.rated}>Rated: {movieDetails.Rated}</Text>
      <Text style={styles.awards}>Awards: {movieDetails.Awards}</Text>
      <Text style={styles.boxOffice}>Box Office: {movieDetails.BoxOffice}</Text>
      <Text style={styles.production}>Production: {movieDetails.Production}</Text>
      <Text style={styles.website}>Website: {movieDetails.Website}</Text>
      <Text style={styles.plot}>{movieDetails.Plot}</Text>

      {ratingsData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.ratingsTitle}>Ratings Chart:</Text>
          <BarChart
          fromZero
            data={{
              labels: chartLabels,
              datasets: [
                {
                  data: chartValues,
                },
              ],
            }}
            width={Dimensions.get('window').width - 32} // Full width minus padding
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 1, // Optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  year: {
    fontSize: 18,
    marginBottom: 4,
  },
  genre: {
    fontSize: 18,
    marginBottom: 4,
  },
  director: {
    fontSize: 18,
    marginBottom: 4,
  },
  writer: {
    fontSize: 18,
    marginBottom: 4,
  },
  actors: {
    fontSize: 18,
    marginBottom: 4,
  },
  language: {
    fontSize: 18,
    marginBottom: 4,
  },
  country: {
    fontSize: 18,
    marginBottom: 4,
  },
  released: {
    fontSize: 18,
    marginBottom: 4,
  },
  runtime: {
    fontSize: 18,
    marginBottom: 4,
  },
  rated: {
    fontSize: 18,
    marginBottom: 4,
  },
  awards: {
    fontSize: 18,
    marginBottom: 4,
  },
  boxOffice: {
    fontSize: 18,
    marginBottom: 4,
  },
  production: {
    fontSize: 18,
    marginBottom: 4,
  },
  website: {
    fontSize: 18,
    marginBottom: 4,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  plot: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  chartContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  ratingsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default MovieDetailsScreen;