import "@/app/css/recover.css";
import Image from "next/image";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { httpPost } from "@/app/core/http-request-contract";
import { handleInput } from "@/app/core/repository/handle_input";
import recoverimg from "@/app/assets/images/4-removebg-preview.png";
import InputText from "@/app/assets/components/forms/input-text/input-text";
import ButtonPrimary from "@/app/assets/components/forms/button-primary/button-primary";
import { recoverBody, validateRecoverBody } from "@/app/core/repository/recover/recover-body";

export default function Recover() {
  const [values, setValues] = useState(recoverBody)

  const validateRecover = async () => {
    console.log(values);
    let validation = validateRecoverBody(values);
    if (typeof validation === "string") alert(validation);
    else
      httpPost("users", values)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div className="principal-content">
      <div className="col1">
        <div className="img-position">
          <Image className="img3" src={recoverimg} alt={"img3"} />
        </div>
      </div>
      <div className="col2">
        <form className="align-middle col-md-8 mx-auto recover">
          <InputText
            hint="Email"
            id="email"
            type="email"
            handleInput={[handleInput, values, setValues]}
          />
          <br />

          <ButtonPrimary
            text="Recover password"
            callBack={() => {
              validateRecover()
            }}
          />
        </form>
      </div>
    </div>
  );
}
