"use client";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import elevateImage from "../assets/images/welcomeToElevate.png";
import github from "../assets/images/pngwing.com.png";
import facebook from "../assets/images/Logo-facebook.png";
import google from "../assets/images/Logo Google.png";
import apple from "../assets/images/Logo-apple.png";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function signup() {
  
  let validationSchema = Yup.object({
    username: Yup.string().required('userName is required').min(3, "min character is 3").max(16, "max character is 16"), 
    firstName: Yup.string().required('firstName is required').min(3, "min character is 3").max(16, "max character is 16"),  
    lastName: Yup.string().required('lastName is required').min(3, "min character is 3").max(16, "max character is 16"),   
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Enter valid Password"
      ),
      rePassword: Yup.string().required("Re Password is required").oneOf([Yup.ref('password')], 'Password does not match'),
      phone: Yup.string().required('Phone is required').matches(/^01[0-2,5]{1}[0-9]{8}$/),
  });

  let formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: async function (values) {
      let user = await axios.post("https://exam.elevateegy.com/api/v1/auth/signup", values)
      .catch(function (err) { 
        console.log(err);
      });

      if(user?.data.message == 'success'){
        let user1 = signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
          callbackUrl: "/",
        });
      }
    },
    validationSchema,
  });

  return (
    <>
      <div className="container mx-auto my-10 w-2/4  flex shadow-sm border-spacing-5">
        <div className="w-1/2 bg-[#F0F4FC] p-14 rounded-e-[50px] shadow-[15px_5px_20px_0_rgba(0,0,0,0.1)]">
          <div>
            <h1 className="text-3xl font-semibold">Welcome to</h1>
            <h1 className="text-3xl text-[#122D9C] font-bold">Elevate</h1>
            <p className="my-5">
              Quidem autem voluptatibus qui quaerat aspernatur architecto natus
            </p>
          </div>
          <Image src={elevateImage} alt="Welcome to Elevate" />
        </div>
        <div className="w-1/2 p-14 flex flex-col	">
          <div className="">
            <ul className="flex justify-end items-center">
              <li className="text-xs fw-3">
                <select name="language" id="lang" title="language">
                  <option value="English">English</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </li>
              <li className="text-[#4461F2] px-3 text-xs fw-3 cursor-pointer">
                <Link href="/signin">Sign in</Link>
              </li>
              <li className="text-[#4461F2] border-2 rounded-lg cursor-pointer">
                <div className="px-3 py-1 text-xs fw-3">
                  <Link href="/signup">Register</Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-14">
            <h5 className="font-bold text-l">Sign up</h5>
            <form onSubmit={formik.handleSubmit} className="">
            <input
              id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
                className="w-full bg-[#F9F9F9] rounded-md my-2 p-2"
                type="text"
                placeholder="Enter Username"
              />
              <input
              id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                className="w-full bg-[#F9F9F9] rounded-md my-2 p-2"
                type="text"
                placeholder="Enter firstName"
              />
              <input
              id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                className="w-full bg-[#F9F9F9] rounded-md my-2 p-2"
                type="text"
                placeholder="Enter lastName"
              />
              <input
              id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className="w-full bg-[#F9F9F9] rounded-md my-2 p-2"
                type="email"
                placeholder="Enter Email"
              />
              <input
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                className="w-full bg-[#F9F9F9] rounded-md my-2 p-2"
                type="password"
                placeholder="Enter Password"
              />
              <input
                name="rePassword"
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                onBlur={formik.handleBlur}
                className="w-full bg-[#F9F9F9] rounded-md my-2 p-2"
                type="password"
                placeholder="Confirm Password"
              />
              <input
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                className="w-full bg-[#F9F9F9] rounded-md my-2 p-2"
                type="tel"
                placeholder="Enter Your Phone"
              />
              <button
                className="bg-[#4461F2] text-xs text-white w-full p-2 rounded-md mt-6 shadow-lg"
                type="submit"
              >
                Sign up
              </button>
              <p className="or my-5 text-xs text-center text-[#6C737F]">
                Or Continue with
              </p>
              <div id="icons" className="flex justify-center gap-4">
                <div
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                  className="shadow-md w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer"
                >
                  <Image src={github} alt="github"></Image>
                </div>
                <div className="shadow-md w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer">
                  <Image src={facebook} alt="facebook"></Image>
                </div>
                <div className="shadow-md w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer">
                  <Image
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    src={google}
                    alt="google"
                  ></Image>
                </div>
                <div className="shadow-md w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer">
                  <Image src={apple} alt="apple"></Image>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
