/*
*
Referral Screen Dsa Login flow
*
*/

import React from 'react';
import TrackScreen from '../components/dsa-components/track/TrackScreen';

export default  function TrackPage () {
  return <TrackScreen />;
};

TrackPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};



