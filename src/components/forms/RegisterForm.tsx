"use client"
import { ChangeEventHandler, useState } from "react";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";

import OpenEye from "@/assets/images/icon/icon_68.svg";
import { useRouter } from "next/navigation";
import { serverActions } from "../../../serveractions/commands/serverCommands";

interface FormData {
   name: string;
   email: string;
   password: string;
   phoneNumber: string;
}

const RegisterForm = () => {
   const router=useRouter()

   const schema = yup
   .object({
     name: yup
       .string()
       .required('Name is required.')
       .label('Name'),
     
     email: yup
       .string()
       .required('Email is required.')
       .email('Please enter a valid email address.')
       .label('Email'),
 
     phoneNumber: yup
       .string() // Change to string to handle phone number formats
       .required('Phone number is required.')
       .matches(
         /^\+?[1-9]\d{1,10}$/, // Regex for validating international phone number formats
         'Phone number must be a valid format (e.g., 1234567890).'
       )
       .label('Phone Number'),
 
     password: yup
       .string()
       .required('Password is required.')
       .min(6, 'Password must be at least 6 characters long.') // Add minimum length validation
       .label('Password'),
   })
   .required();


   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });

   const onSubmit = async (data: FormData) => {
      if(!checkbox) return
      const res = await serverActions.user.signUp(
         data.name,data.email,data.phoneNumber,data.password
      )
      console.log(res);
      reset();
      // router.push('/dashboard/profile')
   };

   const [isPasswordVisible, setPasswordVisibility] = useState(false);
   const [checkbox,setCheckBox]=useState(false);

   const togglePasswordVisibility = () => {
      setPasswordVisibility(!isPasswordVisible);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="row">
            <div className="col-12">
               <div className="input-group-meta position-relative mb-25">
                  <label>Name*</label>
                  <input type="text" {...register("name")} placeholder="Zubayer Hasan" />
                  <p className="form_error">{errors.name?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta position-relative mb-25">
                  <label>Email*</label>
                  <input type="email" {...register("email")} placeholder="Youremail@gmail.com" />
                  <p className="form_error">{errors.email?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta position-relative mb-25">
                  <label>Phone Number*</label>
                  <input type="number" {...register("phoneNumber")} placeholder="1234567890" />
                  <p className="form_error">{errors.phoneNumber?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta position-relative mb-20">
                  <label>Password*</label>
                  <input type={isPasswordVisible ? "text" : "password"} {...register("password")} placeholder="Enter Password" className="pass_log_id" />
                  <span className="placeholder_icon"><span className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`}><Image onClick={togglePasswordVisibility} src={OpenEye} alt="" /></span></span>
                  <p className="form_error">{errors.password?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="agreement-checkbox d-flex justify-content-between align-items-center">
                  <div>
                     <input type="checkbox" id="remember2"  checked={checkbox} onChange={()=>setCheckBox(!checkbox)}/>
                     <label htmlFor="remember2">By hitting the &quot;Register&quot; button, you agree to the <Link href="#">Terms conditions</Link> & <Link href="#">Privacy Policy</Link></label>
                  </div>
               </div>
            </div>
            <div className="col-12">
               <button type="submit" className="btn-two w-100 text-uppercase d-block mt-20">SIGN UP</button>
            </div>
         </div>
      </form>
   )
}

export default RegisterForm;