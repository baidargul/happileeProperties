import FormInput from "@/components/forms/reactHookInputs/FormInput";
import FormTextArea from "@/components/forms/reactHookInputs/FormTextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import { userLogin } from "@/redux/features/userSlice";
import { SingleInput } from "@/components/forms/inputs/SingleInput";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface RootState {
  user: any;
}

export default function VerifyForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userProfile =
    useSelector((state: RootState) => state.user.userProfile) || {};

  const { id, agent } = userProfile;

  const [fileOne, setFileOne] = useState(null);
  const [fileTwo, setFileTwo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Example submit function
  const onSubmit = async (data: any,e:any) => {
    if(fileOne==null || fileTwo==null){
      toast.error("Please upload both files");
      return;
    }

    // e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    let sendFile = [];

    sendFile.push(fileOne);
    sendFile.push(fileTwo);

    sendFile.forEach((file: any) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });
    formData.append("userId", id);
    const response = await serverActions.user.Bluetick.addDocuments(formData);
    if (response.status == 200) {
      router.push("/dashboard/membership");
      // dispatch(userLogin(response.data));
      setLoading(false);
    }
    setLoading(false);
  };

  // console.log(file)
  return ( userProfile.bluetickDocuments.length>0?
  <div className="bg-white p-30 card-box border-20">
    <h4 className="text-center wow fadeInUp">You have already submitted your documents</h4>
    {/* <h4 className="text-center wow fadeInUp">Your Profile is being verified</h4> */}
<div className='w-100 text-center d-flex flex-column gap-0 mt-50'>
<p className='m-0'><small>You can mail us at <a className='text-sm ' href="mailto:support@happliee.com">support@happliee.com</a> for more info</small></p>
<p className='m-0'><small>You can contact us at <a className='text-sm ' href="tel:+912346787565"><small>+912346787565</small></a> for more info</small></p>
</div>
</div>:
    <div className="bg-white card-box border-20">
      <form  className="row">
        <div className="col-md-6">
          <SingleInput
            label="Government ID"
            type="file"
            value={fileOne ?? ""}
            onChange={(e: any) => setFileOne(e.target.files[0])}
            placeholder="Select File"
          />
        </div>
        <div className="col-md-6">
          <SingleInput
            label="Business Registeration"
            type="file"
            value={fileTwo ?? ""}
            onChange={(e: any) => setFileTwo(e.target.files[0])}
            placeholder="Select File"
          />
        </div>
        <div className="d-flex justify-content-between col-md-12">
          <button
            disabled={loading}
            onClick={onSubmit}
            // type="submit"
            className="dash-btn-two tran3s me-3 w-25"
          >
            {loading && (
              <span className="spinner-border spinner-border-sm mr-2"></span>
            )}
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
