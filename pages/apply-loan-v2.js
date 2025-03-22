import React from 'react';
import ApplyLoanV2 from '../components/ApplyLoanV2';

export default  function ApplyLoanV2Page () {
  return <ApplyLoanV2 />;
};

ApplyLoanV2Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};



