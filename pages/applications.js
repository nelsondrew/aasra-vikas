/*

Applications Screen Dsa Login flow
*
*/

import React from 'react';
import ApplicationsScreen from '../components/dsa-components/applications/ApplicationsScreen';

export default  function DsaApplicationsPage () {
  return <ApplicationsScreen />;
};

DsaApplicationsPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};



