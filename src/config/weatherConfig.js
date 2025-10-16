// Weather App Configuration
// Your Vercel Weather App Integration

export const WEATHER_APP_CONFIG = {
  // Your Vercel weather app URL
  url: 'https://weather-app-five-mu-20.vercel.app/',
  
  // You can enable/disable the weather feature
  enabled: true,
  
  // Display settings
  openInNewTab: true, // Open weather app in new tab
  
  // Button text
  buttonText: '🌤️ Check Weather',
  
  // Where to show the weather button
  showInNavbar: true,
  showInSidebar: true,
  showInTripCards: false, // Set to true if you want it in each trip card
};

export default WEATHER_APP_CONFIG;

