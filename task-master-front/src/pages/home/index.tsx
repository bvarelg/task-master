import "@/app/globals.css";
import "@/app/css/home.css";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import { useState } from "react";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import home from "@/app/assets/images/Logo_sin_fondo.png";
import { httpGet } from "@/app/core/http-request-contract";
import ContainerTask from "@/app/assets/components/container-task/container.task";

export const taskModelSingle = {
  id: 1,
  title: "",
  description: "",
  datetime: "",
  priority: "",
};
export const taskModel = [taskModelSingle];

export default function HomeComponent() {
  const [tasks, setTask] = useState(taskModel);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("name");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  React.useEffect(() => {
    httpGet("tasks")
      .then((data) => {
        setTask(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const results = tasks.map((task) => (
    <ContainerTask key={task.id} task={task} />
  ));

  function handleLogout(this: HTMLAnchorElement): void {
    router.push("/");
    sessionStorage.clear();
  }

  return (
    <div className="principal-content">
      <div className="col1">
        {tasks.length > 0 ? (
          <div className="row">{results}</div>
        ) : (
          <h1>Nothing here yet</h1>
        )}
      </div>
      <div className="col2">
        <h3 className="userName">Hi, {username}</h3>
        <div>
          <Link href={"task/create"}>
            <i className="bi bi-plus-circle addIcon"></i>
          </Link>
        </div>
        <div className="img5-position">
          <Image className="img5" src={home} alt={"img5"} />
        </div>
        <div>
          <a id="signOff" className="signOff" onClick={handleLogout}>
            <span className="ms-1 d-none d-sm-inline">Sign off</span>
          </a>
        </div>
      </div>
    </div>
  );
}
