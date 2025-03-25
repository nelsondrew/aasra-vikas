/*
*
Referral Screen Dsa Login flow
*
*/

import React from 'react';
import ReferralScreen from '../components/dsa-components/referral/ReferralScreen';

export default  function ReferralPage () {
  return <ReferralScreen />;
};

ReferralPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};



