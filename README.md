# Date Picker Project

## Overview

This project is a sophisticated date picker component built with Next.js and React. It offers a user-friendly interface for selecting dates and setting up recurring events with various options.

## Features

- Interactive calendar for date selection
- Start and end date inputs
- Recurrence options (daily, weekly, monthly, yearly)
- Preview of upcoming occurrences

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- date-fns (for date manipulation)
- Jest and React Testing Library (for testing)
- React Context API for state management

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/date-picker-project.git
   ```

2. Navigate to the project directory:
   ```bash
   cd date-picker-project
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Running the Development Server

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/components/DatePicker`: Contains the main DatePicker component and its subcomponents
- `src/contexts`: Includes the DatePickerContext for state management
- `tests`: Contains test files for components

## Testing

To run the tests:

```
npm test
```
or
```
yarn test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
