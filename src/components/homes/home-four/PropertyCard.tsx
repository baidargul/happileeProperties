import React from "react";
import "./PropertyCard.css";
import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ property }: any) {
  return (
    <div className="property-card-container f-carousel__slide shadow-sm">
      <div className="property-card-img">
        <Image
          src={
            property?.propertyImages[0]?.image?.url??"https://images.pexels.com/photos/29127453/pexels-photo-29127453/free-photo-of-colorful-wooden-house-roofs-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          className="w-100 h-100 lazy-img"
          alt="..."
          width={100}
          height={100}
          style={{
            borderTopLeftRadius: "2%",
            borderTopRightRadius: "2%",
          }}
        />
        <div className="property-card-title">
			<p>{property?.title}</p>
		</div>
      </div>
      <p className="property-card-location">
        {property?.location ?? "456 Elm Street, Suite 3, Los Angeles"}
      </p>
      <div className="property-card-bottom">
        <p>
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(property.price)}
        </p>
		<Link href={`/property/${property?.id}`}><button>View Details</button></Link>
      </div>
    </div>
  );
}
