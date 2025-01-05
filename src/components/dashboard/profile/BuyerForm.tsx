import FormInput from '@/components/forms/reactHookInputs/FormInput'
import FormTextArea from '@/components/forms/reactHookInputs/FormTextArea'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { serverActions } from '../../../../serveractions/commands/serverCommands';
import ImagePicker from '@/components/ImagePicker/ImagePicker';
import { userLogin } from '@/redux/features/userSlice';

interface RootState {
	user: any;
  }


export default function BuyerForm() {
  const dispatch = useDispatch();
	const userProfile = useSelector((state: RootState) => state.user.userProfile) || {};

	const { id,buyer } = userProfile;

	const formSchema = z.object({
		description: z.string().min(1, { message: "Description is required" }),
		address: z.string().min(1, { message: "Address is required" }).optional(),
	  });
	
	  // Set up the form with default values
	  const { control, handleSubmit, setValue, formState } = useForm({
		defaultValues: {
		  description: buyer?.description??"",
		  address: buyer?.address??"",
		},
		resolver: zodResolver(formSchema),
	  });

    const {isSubmitting} = formState;
	
	  // Example submit function
	  const onSubmit = async (data: any) => {
		const res = await serverActions.buyer.create(id,data.address,data.description);
    if(res.status==200){
      dispatch(userLogin(res.data));
    }
	  };

    const handleBack =()=>{
          let profile = {...userProfile};
            profile.type="UNDEFINED";
            dispatch(userLogin(profile));
        }

  return (
	<div className="bg-white card-box border-20">
            <form onSubmit={handleSubmit(onSubmit)} className="row">
            <FormTextArea
                label={"Address"}
                control={control}
                name="address"
                type="text"
                isRequired={true}
                placeholder="Enter your address"
                rows={4}
              />
              <FormTextArea
                label={"Description*"}
                control={control}
                name="description"
                type="text"
                isRequired={true}
                placeholder="Enter a description"
                rows={8}
              />
              <div className="d-flex justify-content-between col-md-12">
          <button
            disabled={isSubmitting}
            type="submit"
            className="dash-btn-two tran3s me-3 w-25"
          >
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-2"></span>
            )}
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
          {userProfile.status=="INCOMPLETE" &&<button
            onClick={handleBack}
            type="submit"
            className="dash-btn-two tran3s me-3 w-25"
          >
            Back
          </button>}
        </div>
            </form>
            {/* <UserAvatarSetting /> */}
          </div>
  )
}
