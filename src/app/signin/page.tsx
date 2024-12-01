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

export default function signin() {
  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Enter valid Password"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: function (values) {
      let user = signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/",
      });
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
            <h5 className="font-bold text-l">Sign in</h5>
            <form onSubmit={formik.handleSubmit} className="">
              <input
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className="w-full bg-[#F9F9F9] rounded-md mt-3 p-2"
                type="email"
                placeholder="Enter Email"
              />
              {formik.errors.email && formik.touched.email ? (
                <h6 className="text-red-500 text-sm">{formik.errors.email}</h6>
              ) : (
                ""
              )}
              <input
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                className="w-full bg-[#F9F9F9] rounded-md mt-3 p-2"
                type="password"
                placeholder="Enter Password"
              />
              {formik.errors.password && formik.touched.password ? (
                <h6 className="text-red-500 text-sm">{formik.errors.password}</h6>
              ) : (
                ""
              )}
              <h6 className="text-[#4461F2] text-xs my-2 justify-self-end cursor-pointer">
                <Link href="/forgetPassword">Forgot Password?</Link>
              </h6>
              <button
                className="bg-[#4461F2] text-xs text-white w-full p-2 rounded-md mt-3 shadow-lg"
                type="submit"
              >
                Sign in
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
