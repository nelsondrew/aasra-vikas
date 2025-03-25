/*
*
Dsa Login Screen Dsa Login flow
*
*/

import React from 'react';
import EarningScreen from '../components/dsa-components/earnings/EarningsScreen';

export default  function EarningPage () {
  return <EarningScreen />;
};

EarningPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};



