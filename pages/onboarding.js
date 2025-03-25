/*
*
Splash Page for Dsa Login flow
*
*/

import React from 'react';
import OnboardingScreen from '../components/dsa-components/onboarding/OnboardingScreen';

export default  function OnboardingPage () {
  return <OnboardingScreen />;
};

OnboardingPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};



