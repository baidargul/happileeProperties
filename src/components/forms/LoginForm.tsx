"use client"
import { useState } from "react";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";

import OpenEye from "@/assets/images/icon/icon_68.svg";
import { useRouter } from "next/navigation";
import { serverActions } from "../../../serveractions/commands/serverCommands";
import { userLogin } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface FormData {
   email: string;
   password: string;
}

interface LoginFormProps {
   close: () => void;
}

const LoginForm = ({close}: LoginFormProps) => {
   const router = useRouter();
   const dispatch = useDispatch();

   const schema = yup
      .object({
         email: yup.string().required().email().label("Email"),
         password: yup.string().required().label("Password"),
      })
      .required();

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });

   const onSubmit = async (formData: FormData) => {
      try {
         const { data, status, message } = await serverActions.user.signIn(
            formData.email,formData.password
         );

         if (status === 200) {
            dispatch(userLogin(data));
            reset();
            close();
            router.push('/dashboard/profile');
         } else {
            console.log(message);
            toast(message);
         }
      } catch (err: Error | any) {
         toast(err.response.data.message);
      }
   };

   const [isPasswordVisible, setPasswordVisibility] = useState(false);

   const togglePasswordVisibility = () => {
      setPasswordVisibility(!isPasswordVisible);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="row">
            <div className="col-12">
               <div className="input-group-meta position-relative mb-25">
                  <label>Email*</label>
                  <input type="email" {...register("email")} placeholder="Youremail@gmail.com" />
                  <p className="form_error">{errors.email?.message}</p>
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
               {/* <div className="agreement-checkbox d-flex justify-content-between align-items-center">
                  <div>
                     <input type="checkbox" id="remember" />
                     <label htmlFor="remember">Keep me logged in</label>
                  </div>
                  <Link href="#">Forget Password?</Link>
               </div> */}
            </div>
            <div className="col-12">
               <button type="submit" className="btn-two w-100 text-uppercase d-block mt-20">Login</button>
            </div>
         </div>
      </form>
   )
}

export default LoginForm