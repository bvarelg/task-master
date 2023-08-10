import "@/app/globals.css";
import "@/app/css/login.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";
import { httpPost } from "@/app/core/http-request-contract";
import init from "@/app/assets/images/1-removebg-preview.png";
import { handleInput } from "@/app/core/repository/handle_input";
import InputText from "@/app/assets/components/forms/input-text/input-text";
import {
  loginBody,
  validateLoginBody,
} from "@/app/core/repository/login/login-body";
import ButtonPrimary from "@/app/assets/components/forms/button-primary/button-primary";

export default function LoginComponent() {
  const router = useRouter();
  const [values, setValues] = useState(loginBody); //Pendiente corregir error de login.

  const validateSesion = React.useCallback(() => {
    let name = sessionStorage.getItem("name");
    if (name != undefined || name != null) {
      router.push("/home");
    } else {
      console.log(name);
    }
  }, [router]);

  React.useEffect(() => {
    validateSesion();
  }, [validateSesion]);

  const validateLogin = async () => {
    let validation = validateLoginBody(values);
    if (typeof validation === "string") alert(validation);
    else
      await httpPost("users/login", values)
        .then((response) => {
          if (
            response &&
            response.password === values.password &&
            response.email === values.email
          )
            sessionStorage.setItem("name", response.name);
          else alert("Incorrect data, please, try again");
        })
        .catch((err) => {
          alert(err);
        });
    validateSesion();
  };

  return (
    <div className="principal-content">
      <div className="col1">
        <div className="img1-position">
          <Image className="img1" src={init} alt={"img1"} />
        </div>
      </div>
      <div className="col2">
        <form className="align-middle col-md-8 mx-auto login">
          <InputText
            hint="Email"
            id="email"
            type="email"
            handleInput={[handleInput, values, setValues]}
          />
          <br />
          <InputText
            hint="Password"
            id="password"
            type="password"
            handleInput={[handleInput, values, setValues]}
          />
          <br />
          <ButtonPrimary
            text="Log in"
            callBack={() => {
              validateLogin();
            }}
          />
          <Link href={"/login/register"} className="link-register">
            If you don&apos;t have an account, click here.
          </Link>
          <Link href={"/login/recover"} className="link-register">
            Forgot your password? Recover here.
          </Link>
        </form>
      </div>
    </div>
  );
}
