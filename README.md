# AIMATERNITY

AIMATERNITY is a mobile app designed to support mothers during maternity and parenting. It features AI-powered assistance, a supportive community forum, and health tracking tools.

## Features
- **AI Agent:** Chat with an AI assistant for maternity and parenting support.
- **Community Forum:** Connect, share, and get advice from other mothers and experts.
- **BPM Tracker:** Log and track heart rate (BPM) for both mother and baby.
- **Health Check & Resources:** Access health tools and educational resources.
- **Personalized Experience:** Responsive, mobile-first design for all devices.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
- [EAS CLI](https://docs.expo.dev/eas/): `npm install -g eas-cli`
- [Git](https://git-scm.com/)
- [Java JDK (for Android builds)](https://adoptopenjdk.net/) (includes `keytool`)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   expo start
   ```

### Building the App
#### Android
- Make sure you have `keytool` installed (comes with Java JDK).
- To build for Android:
  ```sh
  eas build -p android
  ```
- If prompted, you can let EAS generate a keystore or provide your own.

#### iOS
- To build for iOS:
  ```sh
  eas build -p ios
  ```
- Requires an Apple Developer account.

## Project Structure
- `app/` — Main app screens and navigation
- `app/(app)/` — Authenticated app screens (home, chat, schedule, etc.)
- `app/community.tsx` — Community forum
- `app/bpm.tsx` — BPM tracker
- `styles/` — Theme and style files

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE) 