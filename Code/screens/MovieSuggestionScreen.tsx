import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

const RAPIDAPI_KEY = 'ff5040409amsh37fb40244508660p142dadjsnd08fafad83a3';
const RAPIDAPI_HOST = 'advanced-movie-search.p.rapidapi.com';
const BASE_URL = `https://${RAPIDAPI_HOST}`;

const genreMap: Record<string, number[]> = {
  Action: [28],
  Adventure: [12],
  Animation: [16],
  Comedy: [35],
  Crime: [80],
  Documentary: [99],
  Drama: [18],
  Family: [10751],
  Fantasy: [14],
  History: [36],
  Horror: [27],
  Music: [10402],
  Mystery: [9648],
  Romance: [10749],
  SciFi: [878],
  TVMovie: [10770],
  Thriller: [53],
  War: [10752],
  Western: [37],
};

export default function MovieSuggestionScreen() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchMovieByGenre = async (genre: string, surprise = false) => {
    setLoading(true);
    setMovie(null);
    setSelectedGenre(surprise ? 'Surprise' : genre);

    try {
      const page = Math.floor(Math.random() * 5) + 1;
      const genreParam = surprise ? '' : `with_genres=${genreMap[genre].join(',')}&`;

      const url = `${BASE_URL}/discover/movie?${genreParam}sort_by=popularity.desc&language=en-US&page=${page}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
      });

      const data = await response.json();
      const results = data.results;

      if (!results || results.length === 0) {
        Alert.alert('No movies found.');
        return;
      }

      const randomMovie = results[Math.floor(Math.random() * results.length)];
      setMovie(randomMovie);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch movie.');
    } finally {
      setLoading(false);
    }
  };

  const GenreButton = ({ genre }: { genre: string }) => (
    <TouchableOpacity
      style={[
        styles.genreButton,
        selectedGenre === genre && styles.selectedButton,
      ]}
      onPress={() => fetchMovieByGenre(genre)}
    >
      <Text style={styles.genreButtonText}>
        {genre === 'SciFi' ? 'Sci-Fi' : genre === 'TVMovie' ? 'TV Movie' : genre}
      </Text>
    </TouchableOpacity>
  );

  const SurpriseButton = () => (
    <TouchableOpacity style={styles.surpriseButton} onPress={() => fetchMovieByGenre('', true)}>
      <Text style={styles.surpriseText}>🎲 Surprise Me</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pick a Genre 🎬</Text>

      <View style={styles.genreContainer}>
        {Object.keys(genreMap).map((genre) => (
          <GenreButton key={genre} genre={genre} />
        ))}
      </View>

      <View style={styles.surpriseWrapper}>
        <SurpriseButton />
      </View>

      {loading && <ActivityIndicator color="#fff" size="large" style={{ marginTop: 20 }} />}

      {movie && (
        <View style={styles.movieCard}>
          {movie.poster_path && (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.poster}
            />
          )}
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 20,
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreButton: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    margin: 6,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  genreButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  surpriseWrapper: {
    marginTop: 20,
    marginBottom: 10,
  },
  surpriseButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  surpriseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  movieCard: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    marginTop: 30,
  },
  poster: {
    height: 400,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rating: {
    color: '#ccc',
    marginBottom: 8,
  },
  overview: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 20,
  },
});
