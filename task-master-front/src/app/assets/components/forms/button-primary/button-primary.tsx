import "./button-primary.css";
import "bootstrap/dist/css/bootstrap.css";

export default function ButtonPrimary(props: {
  text: string;
  callBack: Function;
}) {
  return (
    <div className="btn-position">
      <button
        type="button"
        className="form-control"
        onClick={function () {
          props.callBack();
        }}
      >
        {props.text}
      </button>
    </div>
  );
}
