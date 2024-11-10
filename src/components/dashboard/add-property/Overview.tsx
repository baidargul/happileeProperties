import NiceSelect from "@/ui/NiceSelect";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { useEffect, useState } from "react";
import { set } from "js-cookie";

const Overview = () => {
  const selectHandler = (e: any) => {};

  const [data,setData]=useState([])
  const [allotment,setAllotment]=useState([])
  const [lookingFor,setLookingFor]=useState([])
  const [propertyType,setPropertyType]=useState([])
  const getPropertyStructure = async () => {
    const res = await serverActions.property.GET_ALLOTMENT_STRUCTURE();
    if(res.status==200){
      setData(res.data)
    }
  };

  
  // const temp

  useEffect(()=>{
    getPropertyStructure();
  },[])

  return (
    <div className="bg-white card-box border-20">
      <h4 className="dash-title-three">Overview</h4>
      


      <div className="container mb-3">
  {/* Allotment Type Section */}
  {/* <div className="row row-cols-auto g-5">
    {data.length>0 && data?.allotmentType?.map((item) => (
      <div
        key={item.id}
        className={`border border-2 ${
          allotment === item.id ? "bg-primary text-white" : ""
        } rounded-2 text-center p-2`}
        style={{ cursor: "pointer" }}
        onClick={() => setAllotment(item.id)}
      >
        <p className="mb-0 fs-6 fw-semibold">{item.name}</p>
      </div>
    ))}
  </div> */}

  {/* Looking For Section */}
  {/* <div className="row row-cols-auto g-3 mt-3">
    {data?.lookingFor?.allotmentFor?.map((item) => (
      <div
        key={item.id}
        className={`border border-2 ${
          lookingFor === item.id ? "bg-primary text-white" : ""
        } rounded-2 text-center p-2`}
        style={{ cursor: "pointer" }}
        onClick={() => setLookingFor(item.id)}
      >
        <p className="mb-0 fs-6 fw-semibold">{item.name}</p>
      </div>
    ))}
  </div> */}

  {/* Property Type Section */}
  {/* <div className="row row-cols-auto g-3 mt-3">
    {data?.lookingFor?.propertyType
      ?.filter((item) => item.allotmentTypeId === allotment)
      .map((item) => (
        <div
          key={item.id}
          className={`border border-2 ${
            propertyType === item.id ? "bg-primary text-white" : ""
          } rounded-2 text-center p-2`}
          style={{ cursor: "pointer" }}
          onClick={() => setPropertyType(item.id)}
        >
          <p className="mb-0 fs-6 fw-semibold">{item.name}</p>
        </div>
      ))}
  </div> */}
</div>



      {/* <div className="dash-input-wrapper mb-30">
        <label htmlFor="">Description*</label>
        <textarea
          className="size-lg"
          placeholder="Write about property..."
        ></textarea>
      </div> */}
      {/* <div className="row align-items-end">
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Category*</label>
            <NiceSelect
              className="nice-select"
              options={[
                { value: "1", text: "Apartments" },
                { value: "2", text: "Condos" },
                { value: "3", text: "Houses" },
                { value: "4", text: "Industrial" },
                { value: "5", text: "Villas" },
              ]}
              defaultCurrent={0}
              onChange={selectHandler}
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Listed in*</label>
            <NiceSelect
              className="nice-select"
              options={[
                { value: "1", text: "All Listing" },
                { value: "2", text: "Buy" },
                { value: "3", text: "Sell" },
                { value: "4", text: "Rent" },
              ]}
              defaultCurrent={0}
              onChange={selectHandler}
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Price*</label>
            <input type="text" placeholder="Your Price" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Yearly Tax Rate*</label>
            <input type="text" placeholder="Tax Rate" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Overview;
