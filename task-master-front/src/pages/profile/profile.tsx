import Link from "next/link";
import "@/app/css/profile.css";
import Image from "next/image";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "@/app/assets/images/Logo_sin_fondo.png";
import InputText from "@/app/assets/components/forms/input-text/input-text";
import ButtonPrimary from "@/app/assets/components/forms/button-primary/button-primary";

export default function Profile() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="principal-content">
      <div className="col1">
        <div className="component">
          <div>
            <i className="bi bi-person-circle"></i>
          </div>
          <div className="links">
            <Link href={""} className="profile">
              Profile
            </Link>
            <br />
            <Link href={"/login"} className="signOff">
              Sign off
            </Link>
          </div>
        </div>
        <div className="img-position">
          <Image className="img4" src={logo} alt={"img4"} />
        </div>
      </div>
      <div className="col2">
        <Link href={""} >
            <i className="bi bi-pencil edit"></i>
        </Link>
        <form className="align-middle col-md-8 mx-auto">
          <i className="bi bi-person-circle"></i>
          <Link href={""} className="upload-photo">
            Upload photo
          </Link>
          <br />
          <InputText hint="Name" id="name" type="text" handleInput={[setName]} />
          <br />
          <InputText
            hint="Last name"
            id="lastname"
            type="text"
            handleInput={[setLastName]}
          />
          <br />
          <InputText
            hint="Email"
            id="email"
            type="email"
            handleInput={[setEmail]}
          />
          <br />
          <InputText
            hint="Password"
            id="password"
            type="password"
            handleInput={[setPassword]}
          />
          <br />
          <ButtonPrimary
            text="Save"
            callBack={() => {
              alert(name + " " + lastname + " " + email + " " + password);
            }}
          />
        </form>
      </div>
    </div>
  );
}
