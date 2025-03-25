/*
*
Dsa Login Screen Dsa Login flow
*
*/

import React from 'react';
import ProfileScreen from '../components/dsa-components/profile/ProfileScreen';

export default  function ProfilePage () {
  return <ProfileScreen />;
};

ProfilePage.getLayout = function getLayout(page) {
  return <>{page}</>;
};



