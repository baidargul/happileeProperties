"use client";
import NavMenu from "./Menu/NavMenu";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import UseSticky from "@/hooks/UseSticky";
import LoginModal from "@/modals/LoginModal";
import HeaderSearchbar from "./Menu/HeaderSearchbar";

import logo_1 from "@/assets/images/logo/logo_black.png";
import { useSelector } from "react-redux";
import Profile from "./dashboard/Profile";
import dashboardAvatar from "@/assets/images/dashboard/avatar_01.jpg";
import NiceSelect from "@/ui/NiceSelect";

interface RootState {
  user: { isLoggedIn: boolean };
}

const HeaderFour = () => {
  const { sticky } = UseSticky();
  const isloggedin = useSelector((state: RootState) => state.user.isLoggedIn);
  const [isMounted,setIsMounted]=useState(false)
  const [showCity,setShowCity]=useState("")

  useEffect(()=>{
    setIsMounted(true)
  },[])


  const openMobileMenu = (menu: any) => {
    if (showCity === menu) {
        setShowCity("");
    } else {
        setShowCity(menu);
    }
};


  return (
    isMounted &&<>
      <header
        className={`theme-main-menu menu-overlay menu-style-six sticky-menu ${
          sticky ? "fixed" : ""
        }`}
      >
        <div className="inner-content gap-two">
          <div className="top-header position-relative">
            <div className="d-flex align-items-center">
              <div className="logo order-lg-0">
                <Link href="/" className="d-flex align-items-center" >
                  <Image src={logo_1} alt="" width={200} height={10}/>
                </Link>
              </div>

              <div className="right-widget ms-auto me-3 me-lg-0 order-lg-3">
                <ul className="d-flex align-items-center style-none">
                  <li style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    flexDirection:'column',
                    gap:'5px',
                    marginRight:'10px',
                    backgroundColor:'	#d2efff',
                    padding:'5px',
                    borderRadius:'5px',
                    border:'1px solid black',
                    // backgroundColor:"red"
                  }}>
                  <div style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    // flexDirection:'column',
                    gap:'20px',
                    // marginRight:'10px',
                  }}>
                  <a href="https://play.google.com/store/games?hl=en" target="_blank">
                  <Image style={{
                    height:'30px',objectFit:'contain'
                  }} src="https://static-00.iconduck.com/assets.00/google-play-icon-1024x1024-ntijeqxd.png" width={50} height={100} alt="" className=""/>
                  </a>
                  <a href="https://www.apple.com/in/app-store/" target="_blank">
                  <Image style={{
                    height:'30px',objectFit:'contain'
                  }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/512px-App_Store_%28iOS%29.svg.png" width={50} height={100} alt="" className=""/>
                  </a>
                  </div>
                  {/* <select name="" id="" style={{
                    height:'40px',
                    width:'100%',
                    backgroundColor:'transparent',
                  }}>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Mumbai">Mumbai</option>
                  </select> */}
                  {/* <NiceSelect
                    options={[
                      { value: "Mumbai", text: "Mumbai" },
                      { value: "Delhi", text: "Delhi" },
                      { value: "Kolkata", text: "Kolkata" },
                      { value: "Chennai", text: "Chennai" },
                      { value: "Hyderabad", text: "Hyderabad" },
                      { value: "Pune", text: "Pune" },
                      { value: "Bangalore", text: "Bangalore" },
                      { value: "Ahmedabad", text: "Ahmedabad" },
                      { value: "Jaipur", text: "Jaipur" },
                      { value: "Surat", text: "Surat" },
                      { value: "Lucknow", text: "Lucknow" },
                    ]}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                    placeholder="Select City"
                    name="city"
                    defaultCurrent={0}
                    className="nice-select"
                    stlye={
                      {
                        backgroundColor:"transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border:'1px solid black',
                        width:'100px'
                      }
                    }
                  /> */}

        <p style={{
          margin:'0',
          padding:'0',
          fontSize:'14px',
          fontWeight:'bold',
        }}>Download Now</p>
                  </li>
                  {isloggedin ? (
                    <li className="d-none d-md-inline-block me-4">
                      <Link
                        href="/dashboard/profile"
                        className="btn-ten rounded-0"
                        target="_blank"
                      >
                        <span>Dashboard</span>{" "}
                        <i className="bi bi-arrow-up-right"></i>
                      </Link>
                    </li>
                  ):<li className="d-none d-md-inline-block me-4">
                    <Link
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                        className="btn-ten rounded-0"
                      >
                        <span>Post Free Property Ad</span>{" "}
                      </Link>
                  {/* <Link
                    href="/dashboard/profile"
                    className="btn-ten rounded-0"
                    target="_blank"
                  >
                    <span>Post Free Property Ad</span>{" "}
                    <i className="bi bi-arrow-up-right"></i>
                  </Link> */}
                </li>}
                  {isloggedin ? (
                           <div className="user-data position-relative">
                              <Link
                                 href="#"
                                 id="profile-dropdown"
                                 data-bs-toggle="dropdown"
                                 data-bs-auto-close="outside"
                                 aria-expanded="false"
                                 className="login-btn-two rounded-circle tran3s d-flex align-items-center justify-content-center"
                              >
                                 <i className="fa-regular fa-user"></i>
                              </Link>
                              <Profile />
                           </div>
                  ) : (
                    <li>
                      <Link
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                        className="login-btn-two rounded-circle tran3s d-flex align-items-center justify-content-center"
                      >
                        <i className="fa-regular fa-user"></i>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              <nav className="navbar navbar-expand-lg p0 ms-lg-5 order-lg-2">
                <button
                  className="navbar-toggler d-block d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                </button>
                <div
                  className="collapse navbar-collapse ms-xl-5"
                  id="navbarNav"
                >
                  <NavMenu />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <LoginModal />
      {/* <HeaderSearchbar isSearch={isSearch} setIsSearch={setIsSearch} /> */}
    </>
  );
};

export default HeaderFour;
