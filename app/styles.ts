import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },  logoutButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  filterText: {
    padding: 5,
    color: '#555',
  },
  selectedFilter: {
    padding: 5,
    color: 'blue',
    fontWeight: 'bold',
  },
  carousel: {
    paddingVertical: 0,
    height:'100%'
  },
  masonryGrid: {
    paddingHorizontal: 10,
    gap: 10, // Add spacing between items
  },
  masonryGridWithFlexGrow: {
    paddingHorizontal: 10,
    gap: 10,
    flexGrow: 1,
  },
  masonryItem: {
    flex: 1,
    marginBottom: 10, // Add spacing between rows
    borderRadius: 10,
    overflow: 'hidden', // Ensure content stays within the card
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  // 🔹 Styles for MovieCard
  movieCard: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  featuredMovieCard: {
    width: 200,
    marginRight: 10,
    position: 'relative', // Ensure the overlay is positioned relative to the card
  },
  poster: {
    width: '100%', // Use percentage width
    aspectRatio: 2 / 3, // Maintain aspect ratio (e.g., 2:3 for movie posters)
    borderRadius: 8,
    resizeMode: 'cover', // Ensure the image scales properly
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    padding: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  featuredMovieTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  movieTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  movieYear: {
    color: '#555',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
  movieInfoContainer: {
    alignItems: 'center', // Center the title and year horizontally
    justifyContent: 'center', // Optional: Center the content vertically
  },

  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  yearInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
    width: 80,
    textAlign: 'center',
  },
});

export default styles;
