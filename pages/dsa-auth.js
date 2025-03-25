/*
*
Dsa Login Screen Dsa Login flow
*
*/

import React from 'react';
import AuthScreen from '../components/dsa-components/auth/AuthScreen';

export default  function DsaAuthPage () {
  return <AuthScreen />;
};

DsaAuthPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};



