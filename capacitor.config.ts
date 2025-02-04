import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nusahealth.app',
  appName: 'NusaHealth',
  webDir: 'dist',
  server: {
    url: 'https://iynarfkdplimjrsvtgyi.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: '#ffffff'
  }
};

export default config;