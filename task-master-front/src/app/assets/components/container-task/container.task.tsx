import router from "next/router";
import "@/app/css/container.task.css";
import { taskModel } from "@/pages/home";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { httpDelete } from "@/app/core/http-request-contract";
import ButtonPrimary from "../forms/button-primary/button-primary";

export default function ContainerTask(props: { task?: any }) {
  const [values, setValues] = useState(taskModel);

  useEffect(() => {
    if (props.task?.title !== "" && props.task != null) {
      setValues([props.task]);
    }
  }, [props.task]);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  const deleteTask = () => {
    httpDelete("tasks", values, props.task?.id + "")
      .then((response) => {
        alert("Deleted task");
        document.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function goUpdate() {
    router.push("/task/" + props.task.id);
  }

  return (
    <div className="col-md-3 taskBox">
      <div className="list-group">
        <div className="list-group-item active text-center text-uppercase bg-white text-black">
          <h5>{props.task.title}</h5>
        </div>
        <div className="list-group-item">
          <button
            type="button"
            className="btn btn-success form-control"
            data-bs-toggle="modal"
            data-bs-target={"#task" + props.task.id}
          >
            Detail task
          </button>
          <br />
          <button
            className="btn btn-success form-control"
            onClick={() => goUpdate()}
          >
            Update
          </button>
          <br />

          <ButtonPrimary
            text="Delete Task"
            callBack={() => {
              deleteTask();
            }}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <div
            className="modal fade container"
            id={"task" + props.task.id}
            aria-labelledby="taskLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header headerModal">
                  <h5 className="modal-title text-uppercase" id="taskLabel">
                    {props.task.title}
                  </h5>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
                <div className="modal-body bodyBox">
                  <div>{"Task name:" + " " + props.task.title}</div>
                  <br />
                  <div>{"ID:" + " " + props.task.id}</div>
                  <br />
                  <div>{"Due date:" + " " + props.task.datetime}</div>
                  <br />
                  <div>{"Priority:" + " " + props.task.priority}</div>
                  <br />
                  <div>{"Description:" + " " + props.task.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
