import React from 'react';
import Link from 'next/link'; // Import Link if you are using Next.js

// Define the prop types
interface LeadCardProps {
	name: string;
	phone: string;
	timestamp: string;
	propertyTitle: string;
	address: string;
	price: number | string; // Can be a number or string depending on your use case
	style?: boolean; // Optional prop
  }


const LeadCard: React.FC<LeadCardProps> = ({
  name,
  phone,
  timestamp,
  propertyTitle,
  address,
  price,
  style = false, // Default value for style
}) => {
  return (
    <div className="card p-4 mb-3 shadow-sm fadeInUp wow">
      <div className="row">
        {/* Left Column: Contact Info */}
        <div className="col-12 col-md-6 mb-3">
          <div className="card-body">
            <h5 className="mb-0">{name}</h5>
            <small>
              <a href={`tel:${phone}`} className="text-muted">
                {phone}
              </a>
            </small>
            <br />
            <small className="text-muted">{timestamp}</small>
          </div>
        </div>

        {/* Right Column: Property Info */}
        <div className={`col-12 col-md-6 border-20 ${style ? 'grey-bg' : ''}`}>
          <div className="property-info">
            <h5 className="title mb-2">{propertyTitle}</h5>
            <div className="address mb-3">{address}</div>

            {/* Footer with Price and Action Button */}
            <div className="pl-footer d-flex align-items-center justify-content-between">
              <strong className="text-dark me-auto">${price}</strong>
              <Link href="/listing_details_02" className="btn-four rounded-circle">
                <i className="bi bi-arrow-up-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
