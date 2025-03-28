/*
*
Loan Application Dsa flow
*
*/

import React from 'react';
import LoanApplicationDetails from '../components/dsa-components/applicationDetails/ApplicationDetails';

export default  function LoanApplicationDetailsPage () {
  return <LoanApplicationDetails />;
};

LoanApplicationDetailsPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};



