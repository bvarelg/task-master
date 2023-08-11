import Link from "next/link";
import Image from "next/image";
import "@/app/css/register.css";
import { useState } from "react";
import router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import { httpPost } from "@/app/core/http-request-contract";
import registerimg from "@/app/assets/images/3-removebg.png";
import { handleInput } from "@/app/core/repository/handle_input";
import InputText from "@/app/assets/components/forms/input-text/input-text";
import ButtonPrimary from "@/app/assets/components/forms/button-primary/button-primary";
import {
  registerBody,
  validateRegisterBody,
} from "@/app/core/repository/register/register-body";

export default function RegisterComponent() {
  const [values, setValues] = useState(registerBody);

  const validateRegister = async () => {
    console.log(values);
    let validation = validateRegisterBody(values);
    if (typeof validation === "string") alert(validation);
    else
      httpPost("users", values)
        .then((response) => {
          alert("User created")
          router.push("/")
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div className="main-content">
      <div className="col1-register">
        <div className="img-position">
          <Image className="img2" src={registerimg} alt={"img2"} />
        </div>
      </div>
      <div className="col2-register">
        <div>
          <form className="align-middle col-md-8 mx-auto register">
            <InputText
              hint="Name"
              id="name"
              type="text"
              handleInput={[handleInput, values, setValues]}
            />
            <br />
            <InputText
              hint="Last name"
              id="lastName"
              type="text"
              handleInput={[handleInput, values, setValues]}
            />
            <br />
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
              text="Sign up"
              callBack={() => {
                validateRegister();
              }}
            />
            <br />
            <Link className="text-white text-center" href={"/login"}>
              <p className="mg-t-5">Login</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
