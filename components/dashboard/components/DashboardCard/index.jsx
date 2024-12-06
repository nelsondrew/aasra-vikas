/* eslint-disable @next/next/no-img-element */
import React from 'react';

const cityLoans = {
  Mumbai: 57000,
  Delhi: 62000,
  Bengaluru: 54000,
  Chennai: 48000,
  Hyderabad: 54000,
  Kolkata: 46000,
  Pune: 51000,
  Ahmedabad: 53000,
  Surat: 49000,
  Noida: 45000
};

const DashboardCard = () => {
  return (
    <div className="col-xl-4">
      <div className="dashboard-card">
        <div className="dashboard-card__header">
          <h6 className="dashboard-card__title mb-0">Top Cities</h6>
        </div>
        <ul className="country-list">
          {Object.entries(cityLoans).map(([city, amount], index) => (
            <li key={index} className="country-list__item flx-between gap-2">
              <div className="country-list__content flx-align gap-2">
                <span className="country-list__flag">
                  <img
                    src={`/images/thumbs/flag${index + 1}.png`}
                    alt={city}
                  />
                </span>
                <span className="country-list__name">{city}</span>
              </div>
              <span className="country-list__amount">₹{amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardCard;
