```markdown
# Movie Explorer App

## Overview
The **Movie Explorer App** is a React Native application designed to help users search for movies and TV series, view detailed information about them, and manage their favorite movies. It integrates with external APIs to fetch movie data and provides a smooth user experience with features like authentication, search filters, and a favorites list.

## Features
- **User Authentication**: 
  - Register and log in securely using email and password.
  - Automatically log in users after registration.
  - Logout functionality.

- **Movie Search**:
  - Search for movies and TV series by title.
  - Filter results by type (movie or series) and release year range.
  - Display featured movies on the home screen.

- **Movie Details**:
  - View detailed information about a selected movie, including title, year, genre, director, actors, ratings, and more.
  - Interactive ratings chart for visualizing movie ratings.

- **Favorites Management**:
  - Add movies to a favorites list.
  - Remove movies from the favorites list.
  - View all favorited movies in a dedicated screen.

- **Responsive UI**:
  - Optimized for both iOS and Android platforms.
  - Light and dark mode support.

## Tech Stack
- **Frontend**:
  - [React Native](https://reactnative.dev/): For building the mobile application.
  - [Expo](https://expo.dev/): For simplifying the development process and providing native capabilities.
  - [React Navigation](https://reactnavigation.org/): For handling navigation between screens.
  - [React Query](https://tanstack.com/query): For managing server state and API calls.
  - [Zustand](https://zustand-demo.pmnd.rs/): For managing global state (e.g., authentication and favorites).

- **APIs**:
  - [OMDb API](https://www.omdbapi.com/): For fetching movie and TV series data.
  - Custom backend API hosted on Vercel for authentication and additional movie-related operations.

- **UI Components**:
  - [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/): For animations.
  - [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit): For displaying movie ratings in a chart.

- **Utilities**:
  - [Zod](https://zod.dev/): For input validation.
  - [Async Storage](https://react-native-async-storage.github.io/async-storage/): For persisting user data locally.

- **Testing**:
  - [Jest](https://jestjs.io/): For unit testing components and logic.

## How to Run
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```
4. Run the app on your desired platform:
   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

## Folder Structure
- **`app/`**: Contains all the screens and navigation logic.
- **`components/`**: Reusable UI components.
- **`store/`**: Global state management using Zustand.
- **`hooks/`**: Custom hooks for theme and color scheme management.
- **`utils/`**: Utility functions (e.g., authentication helpers).
- **`constants/`**: App-wide constants like colors.
- **`assets/`**: Fonts and images used in the app.

## Future Enhancements
- Add support for user profiles.
- Implement push notifications for updates.
- Enhance the UI with more animations and transitions.
- Add offline support for viewing favorited movies.

## License
This project is licensed under the MIT License.
```