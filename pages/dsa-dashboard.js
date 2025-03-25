/*
*
Dsa Login Screen Dsa Login flow
*
*/

import React from 'react';
import DsaDashboardScreen from '../components/dsa-components/dashboard/DashboardScreen';

export default  function DsaDashboardpage () {
  return <DsaDashboardScreen />;
};

DsaDashboardpage.getLayout = function getLayout(page) {
  return <>{page}</>;
};



