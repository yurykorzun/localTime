# Local time based on location
React Native Expo app that shows local time based on longitude and latitude

## How to run locally
1. Set up the machine for React Native development [RN Docs](https://reactnative.dev/docs/environment-setup)
2. Set up Expo [Expo Docs](https://docs.expo.dev/get-started/installation/)
2. Clone this repository
3. In the root of this repo, execute `yarn install`
4. Create timezonedb API Key [Timezonedb](https://timezonedb.com/)
5. In `.env` configuration file set timezonedb API Key to `API_KEY`
6. Run `expo start`

## TODO
- Fix Typescript errors and warnings
- Add unit tests and snapshot tests
- Improve input validation and error handling
- Add linting
- Add map to display the current location
- Improve styling