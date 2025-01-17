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


export default function BuilderForm() {
  const dispatch = useDispatch();
	const [selectedImageArray, setSelectedImageArray] = useState([]);
	const [removedImageArray, setRemovedImageArray] = useState([]);
	const userProfile = useSelector((state: RootState) => state.user.userProfile) || {};

	const { state, type, id, name, address, description, gst } = userProfile;

	const formSchema = z.object({
		name: z.string().min(1, { message: "Name is required" }),
		description: z.string().min(1, { message: "Description is required" }),
		gst: z
		  .string()
		  .optional() // GST is optional
		  .refine((value) => !value || /^[0-9]{15}$/.test(value), {
			message: "GST must be a valid 15-digit number",
		  }),
		address: z.string().min(1, { message: "Address is required" }),
	  });
	
	  // Set up the form with default values
	  const { control, handleSubmit, setValue, formState } = useForm({
		defaultValues: {
		  name: name??"",
		  description: description??"",
		  gst: gst??"",
		  address: address??"",
		},
		resolver: zodResolver(formSchema),
	  });
	  const {isSubmitting} = formState;
	
	  // Example submit function
	  const onSubmit = async (data: any) => {
		const formData = new FormData();
		for (var key in data) {
		  formData.append(key, data[key]);
		}
		selectedImageArray.forEach((file: File) => {
		  if (file instanceof File) {
			formData.append("images", file);
		  }
		});
		// Display the key/value pairs`
		for (const pair of formData.entries()) {
		  console.log(pair[0], pair[1]);
		}
		formData.append('id',id)
		const response = await serverActions.builder.create(formData);
		if (response.status == 200) {
          dispatch(userLogin(response.data));
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
              
              <FormInput
                label={"Name*"}
                className="custom-class"
                control={control}
                name="name"
                type="text"
                isRequired={true}
                placeholder="Enter company name"
                isDisabled={userProfile.status!="INCOMPLETE"?true:false}
              />
              <FormTextArea
                label={"Description*"}
                control={control}
                name="description"
                type="text"
                isRequired={true}
                placeholder="Enter a description"
                rows={8}
                isDisabled={userProfile.status!="INCOMPLETE"?true:false}
              />
              <div className="">
                <FormInput
                  label={"GST"}
                  control={control}
                  name="gst"
                  type="text"
                  placeholder="Enter GST number"
                  isDisabled={userProfile.status!="INCOMPLETE"?true:false}
                />
              </div>
              <FormTextArea
                label={"Address*"}
                control={control}
                name="address"
                type="text"
                isRequired={true}
                placeholder="Enter your address"
                rows={4}
                isDisabled={userProfile.status!="INCOMPLETE"?true:false}
              />
              <ImagePicker
                selectedImageArray={selectedImageArray}
                setSelectedImageArray={setSelectedImageArray}
                setRemovedImageArray={setSelectedImageArray}
                label={"Images*"}
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
