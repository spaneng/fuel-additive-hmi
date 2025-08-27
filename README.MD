# Fuel Additive HMI

A remote component for Zamil's fuel additive system Human Machine Interface (HMI). This component provides real-time monitoring and display of fuel injection parameters and statistics.

## Features

- **Real-time Process Monitoring**: Displays current fuel injection settings and statistics
- **Injector Data**: Shows per-injection volume, injection rate intervals, and cumulative totals
- **Header Data**: Monitors header interval, total, and daily totals
- **Responsive Design**: Built with Material-UI for a modern, responsive interface
- **Doover Integration**: Extends Doover's RemoteAccess for seamless integration

## Installation

```bash
npm install
```

## Development

### Start Development Server
```bash
npm start
```
This will build the component and serve it on port 8002.

### Watch Mode
```bash
npm run watch
```
Builds the component in development mode with file watching enabled.

### Build for Production
```bash
npm run build
```

## Usage

This component is designed to be integrated into the Doover platform and displays:

- **Volume Per Injection**: Current injection volume settings
- **Injection Rate Interval**: Timing between injections
- **Injector Statistics**: Per-injection, total, and daily totals for injector operations
- **Header Statistics**: Interval, total, and daily totals for header operations

## Technology Stack

- React 18
- Material-UI (MUI)
- Webpack
- Doover Remote Components Framework

## Author

Jarrod Jackson

## License

ISC