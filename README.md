# Electron Calculator

A modern, responsive calculator application built with Electron, React, and Vite. Features a clean UI with light/dark mode support and smooth animations.

## Features

- 🧮 Basic arithmetic operations (addition, subtraction, multiplication, division)
- 💫 Smooth animations and transitions
- 🌓 Automatic light/dark mode support
- 🎯 Responsive design
- ⚡ Fast performance with Vite
- 🔒 Secure Electron configuration
- 🎨 Modern UI with CSS variables

## Project Structure

```
├── src/                    # React application source
│   ├── components/         # React components
│   │   └── Calculator/     # Calculator component
│   │       ├── Calculator.jsx
│   │       ├── CalculatorButton.jsx
│   │       └── Calculator.css
│   ├── hooks/             # Custom React hooks
│   │   └── useCalculator.js
│   ├── utils/             # Utility functions
│   │   └── calculator.js
│   ├── App.jsx            # Main React component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── electron/              # Electron main process
│   └── main.js           # Electron entry point
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
└── package.json          # Project configuration
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd electron-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm run electron:dev
```

This command:
1. Starts the Vite development server
2. Waits for the server to be ready
3. Launches the Electron application
4. Opens DevTools automatically

## Building for Production

To create a production build:

```bash
npm run electron:build
```

This will:
1. Build the React application
2. Package it with Electron
3. Create distributable packages in the `release` directory

## Project Architecture

### 1. React Components

- **Calculator.jsx**: Main calculator component
  - Manages the calculator layout
  - Uses the `useCalculator` hook for state management
  - Renders calculator buttons and display

- **CalculatorButton.jsx**: Reusable button component
  - Memoized for performance
  - Handles button styling and interactions
  - Supports different button types (numbers, operators)

### 2. Custom Hooks

- **useCalculator.js**: Calculator logic hook
  - Manages calculator state
  - Handles number input
  - Processes operations
  - Formats display values

### 3. Utility Functions

- **calculator.js**: Core calculator functions
  - Performs arithmetic operations
  - Handles number formatting
  - Manages error cases

### 4. Electron Main Process

- **main.js**: Electron application setup
  - Creates application window
  - Manages development/production modes
  - Handles window events
  - Implements security features

## Styling

The application uses CSS variables for theming:

```css
:root {
  --calculator-bg: #1a1a1a;
  --display-bg: #2d2d2d;
  --button-bg: #333;
  /* ... more variables ... */
}
```

Light/dark mode is handled automatically using `prefers-color-scheme` media queries.

## Performance Optimizations

1. **React Optimizations**
   - Memoized components
   - Optimized re-renders
   - Efficient state management

2. **Build Optimizations**
   - Code splitting
   - Tree shaking
   - Production minification
   - Console removal in production

3. **Electron Optimizations**
   - Secure context isolation
   - Efficient window management
   - Proper error handling

## Error Handling

The application includes comprehensive error handling:

1. **Calculator Errors**
   - Division by zero
   - Invalid operations
   - Number formatting errors

2. **Electron Errors**
   - Window creation failures
   - Process crashes
   - Uncaught exceptions

## Development Workflow

1. **Starting Development**
   ```bash
   npm run electron:dev
   ```
   - Starts Vite dev server
   - Launches Electron app
   - Enables hot reloading

2. **Building for Production**
   ```bash
   npm run electron:build
   ```
   - Creates optimized build
   - Packages for distribution
   - Generates installers

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 