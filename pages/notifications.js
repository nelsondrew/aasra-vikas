/*
*
Dsa Login Screen Dsa Login flow
*
*/

import React from 'react';
import NotificationsScreen from '../components/dsa-components/notifications/NotificationsScreen';

export default  function Notificationspage () {
  return <NotificationsScreen />;
};

Notificationspage.getLayout = function getLayout(page) {
  return <>{page}</>;
};



