"use client";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { serverActions } from "../../../../serveractions/commands/serverCommands";
import FormInput from "@/components/forms/reactHookInputs/FormInput";

const AccountSettingBody = () => {
  const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Must be a valid email" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(10, { message: "Phone number cannot exceed 10 digits" })
      .refine((value) => /^[0-9]+$/.test(value), {
        message: "Phone number must be numeric",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

  // Set up the form with default values
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  // Example submit function
  const onSubmit = async (data: any) => {
    // const response = await serverActions.builder.create(data);
    // console.log(response);
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Account Settings" />
        <h2 className="main-title d-block d-lg-none">Account Settings</h2>
        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Edit & Update</h4>
          {/* <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="col-lg-6">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">First Name</label>
                  <input type="text" placeholder="Rashed" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Last Name</label>
                  <input type="text" placeholder="Kabir" />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Email</label>
                  <input type="email" placeholder="rshakbair365@gmal.com" />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Phone Number</label>
                  <input type="tel" placeholder="+810 321 889 021" />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Password</label>
                  <input type="password" />

                  <div className="info-text d-sm-flex align-items-center justify-content-between mt-5">
                    <p className="m0">
                      Want to change the password?
                      <Link href="/dashboard/account-settings/password-change">
                        Click here
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="button-group d-inline-flex align-items-center mt-30">
              <Link href="#" className="dash-btn-two tran3s me-3">
                Save
              </Link>
              <Link href="#" className="dash-cancel-btn tran3s">
                Cancel
              </Link>
            </div>
          </form> */}

          <form onSubmit={handleSubmit(onSubmit)} className="row">
            {/* First Name */}
            <div className="col-sm-6">
              <FormInput
                label={"First Name*"}
                control={control}
                name="firstName"
                type="text"
                isRequired={true}
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div className="col-sm-6">
              <FormInput
                label={"Last Name*"}
                control={control}
                name="lastName"
                type="text"
                isRequired={true}
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}

            <FormInput
              label={"Email*"}
              control={control}
              name="email"
              type="email"
              isRequired={true}
              placeholder="Enter your email"
            />

            {/* Phone Number */}

            <FormInput
              label={"Phone Number*"}
              control={control}
              name="phoneNumber"
              type="tel"
              isRequired={true}
              placeholder="Enter phone number"
            />

            {/* Password */}

            <FormInput
              label={"Password*"}
              control={control}
              name="password"
              type="password"
              isRequired={true}
              placeholder="Enter your password"
            />
            <div className="info-text d-sm-flex align-items-center justify-content-between">
              <p className="lead"><small>
               Want to change the password?
                  <Link className="text-primary" href="/dashboard/account-settings/password-change">
                     Click here
                  </Link>
              </small>
              </p>
            </div>
            <div className="button-group d-inline-flex align-items-center mt-30">
              <button type="submit" className="dash-btn-two tran3s me-3">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingBody;
