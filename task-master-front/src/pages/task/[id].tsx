import { useRouter } from "next/router";
import CreateTaskComponent from "./create";
import { useEffect, useReducer } from "react";
import { httpGet } from "@/app/core/http-request-contract";

const initialState = {
  task: { id: 0, title: "", description: "", datetime: "", priority: "" },
  render: <CreateTaskComponent />,
};

function reducer(state: { task: { id: number; title: string; description: string; datetime: string; priority: string; } | undefined; }, action: { type: any; task: any; }) {
  switch (action.type) {
    case "setTask":
      return { ...state, task: action.task };
    case "renderTask":
      return { ...state, render: <CreateTaskComponent task={state.task} /> };
    default:
      throw new Error();
  }
}

export default function EditTaskComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== router.route) {
      httpGet("tasks/" + router.query.id)
        .then((response) => {
          dispatch({ type: "setTask", task: response });
          dispatch({
              type: "renderTask",
              task: undefined
          });
        })
        .catch((error) => console.log(error));
    }
  }, [router.asPath, router.isReady, router.query.id, router.route]);

  return (
    <div>
      {state.task.id != 0 ? (
        <CreateTaskComponent task={state.task} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
