# Tangelo

## Getting Started

- Clone the repo
- In the project directory, run the `yarn` command
- Install the React Native CLI if you haven't yet done so

## Steps to run on android

- Make sure Android Studio is installed and updated
- Run `npx react-native run-android --variant=release`
- For best results, generate an android release apk (`cd android` && `./gradlew bundleRelease`) and test on an actual device. If running on an android emulator, I recommend running the release variant (`npx react-native run-android --variant=release`) as performance is a lot better.

## Steps to run on iOS

- Make sure xCode is installed
- in the `ios` folder, run `pod install`
- Open the project in xCode, making sure to use `tangelo.xcworkspace` as the entry file
- Build & run
