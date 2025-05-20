# React Native Boilerplate

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

A production-ready, scalable, and feature-rich React Native boilerplate for building cross-platform mobile applications. This boilerplate follows best practices and includes essential tools and configurations to kickstart your React Native project.

## Features

- 🚀 **Modern Stack**: Built with React Native 0.79.2, React 19.0.0, and TypeScript 5.7.3
- 🔐 **Authentication**: JWT-based auth with secure storage
- 📱 **Navigation**: React Navigation with multiple navigation types
- 🔄 **State Management**: Zustand for global state + React Query for server state
- 🎨 **UI Components**: Reusable components with consistent styling
- 📦 **API Integration**: Built-in API client with React Query
- 🔍 **Type Safety**: Full TypeScript support
- 🛠 **Developer Experience**: ESLint, Prettier, Husky, and Commitizen
- 📱 **Cross Platform**: iOS and Android support

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [Navigation](#navigation)
- [API Integration](#api-integration)
- [Error Handling](#error-handling)
- [Important Dependencies](#important-dependencies)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites

- Node.js >= 18 (LTS version recommended)
- Yarn >= 4.6.0
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)
- VS Code (recommended IDE) with extensions:
  - ESLint
  - Prettier
  - React Native Tools
  - TypeScript and JavaScript Language Features
  - GitLens

### Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Install iOS dependencies:

```bash
cd ios
pod install
cd ..
```

### Running the App

- For iOS:

```bash
# First time setup (recommended)
1. Open ios/rnboilerplate.xcworkspace in Xcode
2. Select your target device/simulator
3. Click the Play button or press Cmd + R to run

# Alternative: Using command line
yarn ios
```

- For Android:

```bash
yarn android
```

## Project Structure

```
src/
├── apis/           # API integration and services
├── assets/         # Static assets (images, fonts)
├── components/     # Reusable UI components
├── navigation/     # Navigation configuration
├── query-client/   # React Query configuration
├── screens/        # Screen components
├── theme/          # Theme configuration
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── zustand-store/  # State management
```

## Configuration

### Key Configuration Files

- `babel.config.js` - Babel configuration
- `metro.config.js` - Metro bundler configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.js` - ESLint rules
- `.prettierrc.js` - Prettier formatting rules

## Authentication

The app uses JWT-based authentication with secure storage using `react-native-keychain`. The authentication flow includes:

- Login
- OTP verification
- Token management
- Secure storage of credentials

## Navigation

The app uses React Navigation with the following navigation types:

- Stack Navigation (`@react-navigation/native-stack`)
- Bottom Tab Navigation (`@react-navigation/bottom-tabs`)
- Material Top Tabs (`@react-navigation/material-top-tabs`)

## API Integration

The app uses `@tanstack/react-query` for API integration with the following features:

- Automatic caching
- Background refetching
- Error handling
- Loading states
- Optimistic updates

## Error Handling

The app implements a comprehensive error handling strategy:

- Global error boundary
- API error handling
- Form validation using `yup` and `react-hook-form`
- Toast messages for user feedback
- Network error handling using `@react-native-community/netinfo`

## Important Dependencies

### Core Dependencies

- React Native: 0.79.2
- React: 19.0.0
- TypeScript: 5.7.3

### Navigation

- @react-navigation/native: 7.x
- @react-navigation/native-stack: 7.x
- @react-navigation/bottom-tabs: 7.x
- @react-navigation/material-top-tabs: 7.x

### State Management & Data Fetching

- @tanstack/react-query: 5.66.9
- zustand: 5.0.3

### UI & Forms

- react-hook-form: 7.54.2
- yup: 1.6.1
- react-native-reanimated: 3.17.1
- react-native-gesture-handler: 2.24.0
- react-native-safe-area-context: 5.2.0
- react-native-screens: 4.9.1

### Storage & Security

- @react-native-async-storage/async-storage: 2.1.2
- react-native-keychain: 9.2.3

### Development Tools

- ESLint: 8.19.0
- Prettier: 3.5.2
- Husky: 9.1.7
- Commitizen: 7.4.0

Note: These versions are current as of the last update. Always check package.json for the most up-to-date versions.

## Development Guidelines

### Code Style

- Follow the ESLint and Prettier configurations
- Use TypeScript for all new code
- Use functional components with hooks
- Follow the naming conventions:
  - Components: PascalCase (e.g., `LoginScreen.tsx`)
  - Utilities: camelCase (e.g., `formatDate.ts`)
  - Constants: UPPER_SNAKE_CASE
  - Types/Interfaces: PascalCase with 'I' prefix (e.g., `IUserData`)

### State Management

- Use Zustand for global state management
- Use React Query for server state
- Use local state (useState) for component-specific state

### Git Workflow

```bash
# Check current branch and status
git status

# Create and switch to a new branch (follow naming convention)
git checkout -b your-name/main/your-feature-name
# Example: git checkout -b john/main/add-login-screen

# Pull latest changes from main branch
git checkout main
git pull origin main

# Stage your changes
git add .                    # Stage all changes

# Commit your changes (using commitizen)
yarn cm

# Push your changes
git push origin your-name/main/your-feature-name
```

Note: Always create feature branches from the `main` branch and follow the naming convention: `your-name/main/your-feature-name`

### Code Review Process

1. Create a feature branch
2. Make your changes
3. Create a pull request
4. Get code review
5. Address review comments
6. Merge after approval

## Troubleshooting

### Common Issues

#### iOS

1. Pod Install Issues

```bash
cd ios
pod deintegrate
pod cache clean --all
pod install
```

2. Build Issues

- Clean the build folder in Xcode
- Delete derived data
- Reset iOS simulator

#### Android

1. Build Issues

```bash
cd android
./gradlew clean
```

2. Keystore Issues

- Verify keystore file location
- Check gradle.properties configuration
- Ensure correct keystore password

### Environment Setup Issues

1. Node.js Version Issues

   - Use nvm to manage Node.js versions
   - Ensure you're using the correct Node.js version

2. Yarn Issues

   - Clear yarn cache: `yarn cache clean`
   - Delete node_modules and reinstall

3. Metro Bundler Issues
   - Clear metro cache: `yarn start --reset-cache`
   - Check metro.config.js for correct configuration

## Contributing

We love your input! We want to make contributing to this boilerplate as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

### Development Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

### Pull Request Process

1. Update the README.md with details of changes to the interface, if applicable
2. Update the version numbers in any examples files and the README.md to the new version that this Pull Request would represent
3. The PR will be merged once you have the sign-off of at least one other developer

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all the contributors who have helped shape this boilerplate
- Special thanks to the React Native community for their amazing work
- Inspired by various open source React Native boilerplates
