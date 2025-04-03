import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { AIResultsComponent } from 'components/AIResultsComponent.jsx';
import { CameraComponent } from 'components/CameraComponent.jsx';
import { HealthRecordComponent } from 'components/HealthRecordComponent.jsx';
import { LoadingComponent } from 'components/LoadingComponent.jsx';
import { NotificationComponent } from 'components/NotificationComponent.jsx';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store'; // Import the store
import { requestNotificationPermission, getFcmToken, setupPushNotificationListeners } from './utils/firebaseConfig';

// Request notification permissions when the app starts
useEffect(() => {
  const initNotifications = async () => {
    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
      const token = await getFcmToken();
      console.log('FCM Token:', token);

      // Set up listeners to handle incoming notifications
      setupPushNotificationListeners((message) => {
        console.log('Notification received:', message);
        // You can now navigate or show the alert based on the notification
      });
    } else {
      console.log('Notification permission denied');
    }
  };

  initNotifications();
}, []);
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return <AppNavigator />;
};


function App() {
  return (
    <Provider store={store}> {/* Wrap your app with Provider */}
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CameraComponent />} />
            <Route path="/results" element={<AIResultsComponent />} />
            <Route path="/health-records" element={<HealthRecordComponent />} />
            <Route path="/loading" element={<LoadingComponent />} />
            <Route path="/notifications" element={<NotificationComponent />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </BrowserRouter>
      </Container>
    </Provider>
  );
}

export default App;