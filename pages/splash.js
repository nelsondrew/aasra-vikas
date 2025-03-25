/*
*
Splash Page for Dsa Login flow
*
*/

import React from 'react';
import Splash from '../components/dsa-components/splash/SplashScreen';

export default  function SplashPage () {
  return <Splash />;
};

SplashPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};



