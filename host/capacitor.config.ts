import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Host App',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    // Federated Capacitor configuration
    FederatedCapacitor: {
      shell: {
        name: 'host',
      },
      apps: [
        {
          name: 'about',
          webDir: '../about/dist',
        },
        {
          name: 'list',
          webDir: '../list/dist',
        },
      ],
    },
  },
};

export default config;
