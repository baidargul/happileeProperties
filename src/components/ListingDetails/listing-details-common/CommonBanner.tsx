"use client";
import Link from "next/link";
import { toast } from "sonner";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useEffect, useState } from "react";

const CommonBanner = ({ style_3, data }: any) => {
  const [isWorking, setIsWorking] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  function checkIsFav() {
    if (currentUser) {
      for (const item of currentUser.favouriteProperties) {
        if (item.propertyId === data?.id) {
          setIsFavourite(true);
          break;
        }
      }
    }
  }

  useEffect(() => {
    setCurrentUser(JSON.parse(`${localStorage.getItem("user")}`));
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      checkIsFav();
    }
  }, [currentUser]);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(
      `https://happileeproperty.com/property/${id}`
    );
    toast("Link copied to clipboard");
  };

  const toggleFavourie = async (id: string) => {
    if (!currentUser) return;
    setIsWorking(true);
    if (isFavourite === false) {
      const response = await serverActions.property.favourite.add(
        id,
        currentUser?.id
      );
      if (response.status === 200) {
        toast("Property added to favourites");
        setIsFavourite(true);
      }
    } else {
      const response = await serverActions.property.favourite.remove(
        id,
        currentUser?.id
      );
      if (response.status === 200) {
        toast("Property removed from favourites");
        setIsFavourite(false);
      }
    }
    setIsWorking(false);
  };

  return (
    <div
      className="row bg-white"
      style={{ borderRadius: "20px", padding: "20px" }}
    >
      <div className="col-lg-6">
        <h3 className="property-titlee">
          {data?.title ?? "Luxury Apartments on California."}
        </h3>
        <div className="d-flex flex-wrap mt-10">
          <div
            className={`list-type text-uppercase mt-15 me-3 ${
              style_3
                ? "bg-primary text-white fw-500"
                : "text-uppercase border-20"
            }`}
          >
            {data?.allotmentFor?.name ?? "FOR SELL"}
          </div>
          <div className="address mt-15">
            <i className="bi bi-geo-alt"></i>{" "}
            {data?.address ?? "3891 Ranchview Dr. Richardson, California"}
          </div>
        </div>
      </div>
      <div className="col-lg-6 ">
        <div className="d-flex flex-column align-items-end md-mt-40">
          <div className="price color-dark fw-500 align-self-start align-self-sm-end">
            {Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(data?.price)}
          </div>
          <div className="est-price fs-20 mb-35 md-mb-30 align-self-start align-self-sm-end">
            <span className="fw-500 color-dark">
              {Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(data?.maintenance ?? "4567")}
              /mo*
            </span>
          </div>
          <ul className="style-none d-flex align-items-center action-btns">
            <li className="me-auto fw-500 color-dark"></li>
            <li className="me-auto color-dark">
              <small>{data?.views} views</small>
            </li>
            <li>
              <Link
                href={isWorking ? "#" : "#"}
                onClick={() => toggleFavourie(data?.id)}
                className={`d-flex align-items-center justify-content-center tran3s ${
                  style_3 ? "" : "rounded-circle"
                }`}
                style={{
                  backgroundColor: isFavourite === true ? "#ff3425" : "white",
                  borderColor: isFavourite === true ? "#ff3425" : "black",
                  scale: isWorking ? "0.8" : "1",
                  transition: "all 0.3s",
                }}
              >
                <i
                  className="fa-solid fa-heart"
                  style={{
                    color: isFavourite ? "white" : "#ff3425",
                  }}
                ></i>
              </Link>
            </li>
            <li onClick={() => handleCopy(data?.id)}>
              <Link
                href="#"
                className={`d-flex align-items-center justify-content-center tran3s ${
                  style_3 ? "" : "rounded-circle"
                }`}
              >
                <i
                  className="fa-solid fa-share-nodes"
                  style={{
                    color: "#FFD700",
                  }}
                ></i>
              </Link>
            </li>
            {/* <li><Link href="#"
                     className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i
                        className="fa-light fa-circle-plus"></i></Link></li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
