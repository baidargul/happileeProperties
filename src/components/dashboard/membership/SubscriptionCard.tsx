import Link from 'next/link';
import React from 'react';

export default function SubscriptionCard({ subscriptions, role }: any) {
  const roleSubscriptions = subscriptions?.subscriptions;

  // Check if the Basic and Premium subscriptions exist
  const basicSubscription = roleSubscriptions?.Basic;
  const premiumSubscription = roleSubscriptions?.Premium;

  console.log(premiumSubscription)

  // Helper function to render properties
  const renderProperties = (properties: any) => {
    if (!properties) return null;

    return Object.entries(properties).map(([key, value]: any) => (
      <li key={value.id}>
        {key.charAt(0).toUpperCase() + key.slice(1)}: {value.limit === '-1' ? 'Unlimited' : value.limit}
      </li>
    ));
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        {/* Render Basic Subscription */}
        {basicSubscription && (
          <div
            style={{
              flex: '1 1 30%', // 30% width on large screens
              marginBottom: '20px',
            }}
            className="pr-column-wrapper bg-white rounded-5 active mt-30"
          >
            <div className="pr-header text-center mb-55">
              <div className="plan fw-500 text-uppercase color-dark">Basic ({role})</div>
              <strong className="price fw-500">
                {Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(basicSubscription?.price || 0)}
              </strong>
            </div>
            <ul className="style-none text-center">
              {renderProperties(basicSubscription?.properties)}
            </ul>
            <div className="pr-footer text-center mt-60">
              <Link href="#" className="btn-twelve w-100 sm">
                {basicSubscription?.price === '0' ? 'Free' : 'Subscribe'}
              </Link>
            </div>
          </div>
        )}

        {/* Render Premium Subscription */}
        {premiumSubscription && (
          <div
            style={{
              flex: '1 1 30%', // 30% width on large screens
              marginBottom: '20px',
            }}
            className="pr-column-wrapper bg-white rounded-5 active mt-30"
          >
            <div className="pr-header text-center mb-55">
              <div className="plan fw-500 text-uppercase color-dark">Premium ({role})</div>
              <strong className="price fw-500">
                {Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(premiumSubscription?.price || 0)}
              </strong>
            </div>
            <ul className="style-none text-center">
              {renderProperties(premiumSubscription?.properties)}
            </ul>
            <div className="pr-footer text-center mt-60">
              <Link href="#" className="btn-twelve w-100 sm">
                {premiumSubscription?.price === '0' ? 'Free' : 'Subscribe'}
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Responsive design for medium and small screens */
        @media (max-width: 991px) {
          .pr-column-wrapper {
            flex: 1 1 45%; /* On medium screens, cards will take up 45% */
          }
        }

        @media (max-width: 767px) {
          .pr-column-wrapper {
            flex: 1 1 100%; /* On small screens, cards will take up 100% (stacked) */
          }
        }
      `}</style>
    </>
  );
}
