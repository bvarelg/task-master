import Link from "next/link";
import Image from "next/image";
import "@/app/css/taskLog.css";
import router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { taskModel, taskModelSingle } from "../home";
import logo from "@/app/assets/images/Logo_sin_fondo.png";
import { handleInput } from "@/app/core/repository/handle_input";
import { httpPost, httpPut } from "@/app/core/http-request-contract";
import InputText from "@/app/assets/components/forms/input-text/input-text";
import ButtonPrimary from "@/app/assets/components/forms/button-primary/button-primary";

export default function CreateTaskComponent(props: {
  task?: typeof taskModelSingle;
}) {
  const [values, setValues] = useState(taskModel);

  useEffect(() => {
    if (props.task?.title != "" && props.task != null) {
      setValues([props.task]);
    }
  }, [props.task]);

  const createTask = () => {
    httpPost("tasks", values)
      .then((response) => {
        alert("Task created");
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const updateTask = () => {
    httpPut("tasks", values, props.task?.id + "")
      .then((response) => {
        alert("Task updated");
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  function setDate(date?: string): string {
    var dateArray = date?.split("T");
    try {
      return dateArray!![0];
    } catch (e: any) {
      return "";
    }
  }

  return (
    <div className="principal-content-task">
      <div className="col1">
        <div className="img1-position">
          <Image className="img6" src={logo} alt={"img6"} />
        </div>
      </div>
      <div className="col2-task">
        <form className="align-middle col-md-8 mx-auto tasklog">
          <InputText
            hint="Task name"
            id="title"
            type="text"
            value={props.task?.title}
            handleInput={[handleInput, values, setValues]}
          />
          <br />
          <InputText
            hint="Due date"
            id="datetime"
            type="date"
            value={setDate(props.task?.datetime)}
            handleInput={[handleInput, values, setValues]}
          />
          <br />

          <InputText
            hint="Priority"
            id="priority"
            type="text"
            value={props.task?.priority}
            handleInput={[handleInput, values, setValues]}
          />
          <br />
          <InputText
            hint="Description"
            id="description"
            type="textarea"
            value={props.task?.description}
            handleInput={[handleInput, values, setValues]}
          />
          <br />

          {props.task?.id != null ? (
            <ButtonPrimary
              text="Update Task"
              callBack={() => {
                updateTask();
              }}
            />
          ) : (
            <ButtonPrimary
              text="Create Task"
              callBack={() => {
                createTask();
              }}
            />
          )}
          <br />
          <br />
          <Link className="btn btn-link form-control" href={"/home"}>
            {" "}
            Back to home{" "}
          </Link>
        </form>
      </div>
    </div>
  );
}
