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

interface RootState {
  user: any;
}

export default function VerifyForm() {
  const dispatch=useDispatch();
  const userProfile =
    useSelector((state: RootState) => state.user.userProfile) || {};

  const { id, agent } = userProfile;

  const [fileOne,setFileOne]=useState(null);
  const [fileTwo,setFileTwo]=useState(null);
  const [loading,setLoading]=useState(false);

  // console.log(userProfile);

  // const experienceFormSchema = z.object({
  //   experience: z
  //     .string()
  //     .min(1, { message: "Years of experience is required" })
  //     .refine((value) => /^[0-9]+$/.test(value), {
  //       message: "Experience must be a valid number",
  //     }),
  //   description: z.string().min(1, { message: "Description is required" }),
  //   address: z.string().min(1, { message: "Address is required" }).optional(),
  //   rera: z.string().min(1, { message: "Description is required" }),
  //   businessName: z.string().min(1, { message: "Business Name is required" }),
    
  // });

  // const { control, handleSubmit, setValue, formState } = useForm({
  //   defaultValues: {
  //     experience: agent?.experience??"",
  //     description: agent?.description??"",
  //     rera: agent?.rera??"",
  //     address: agent?.address??"",
  //     businessName:agent?.businessName??"",
  //   },
  //   resolver: zodResolver(experienceFormSchema),
  // });

  // const { isSubmitting } = formState;

  // Example submit function
  const onSubmit = async (data: any) => {
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
    formData.append('userId',id)
    const response = await serverActions.agent.create(
      formData,
    );
    if (response.status == 200) {
      dispatch(userLogin(response.data));
    }
  };


  // console.log(file)
  return (
    <div className="bg-white card-box border-20">
      <form onSubmit={onSubmit} className="row">
        <div className="col-md-6">
          <SingleInput
          label="Government ID"
          type="file"
          value={fileOne??""}
          onChange={(e:any) => setFileOne(e.target.files[0])}
          placeholder="Select File"
          />
        </div>
        <div className="col-md-6">
          <SingleInput
          label="Business Registeration"
          type="file"
          value={fileTwo??""}
          onChange={(e:any) => setFileTwo(e.target.files[0])}
          placeholder="Select File"
          />
        </div>
        <div className="d-flex justify-content-between col-md-12">
          <button
            disabled={loading}
            type="submit"
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
