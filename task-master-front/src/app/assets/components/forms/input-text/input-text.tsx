import "@/app/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import "@/app/assets/components/forms/input-text/input-text.css";

export default function InputText(props: {
  hint: string;
  type: string;
  id: string;
  handleInput: any[];
  value?: string;
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (props.value != null) {
      setText(props.value);
    }
  }, [props.value]);
  return (
    <div className="form-group">
      <input
        className="form-control"
        type={props.type}
        placeholder={props.hint}
        id={props.id}
        value={text}
        name={props.id}
        onChange={(e) => {
          setText(e.target.value);
          props.handleInput[0](e, props.handleInput[1], props.handleInput[2]);
        }}
      />
    </div>
  );
}
