import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addTodolist,
  changeTodolistTitle,
  fetchTodolists,
  FilterValuesType,
  removeTodolist,
  todolistsActions,
} from "features/TodolistsList/todolists.reducer";
import { addTask, removeTask, updateTask } from "features/TodolistsList/tasks.reducer";
import { TaskStatuses } from "api/todolists-api";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/componets/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTasks } from "features/TodolistsList/tasks.selectors";
import { selectTodolists } from "features/TodolistsList/todolists.selectors";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(fetchTodolists({}));
  }, []);

  const removeTaskCallBack = useCallback(function (taskId: string, todolistId: string) {
    dispatch(removeTask({ taskId, todolistId }));
  }, []);

  const addTaskCallBack = useCallback(function (title: string, todolistId: string) {
    dispatch(addTask({ title, todolistId }));
  }, []);

  const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
    dispatch(updateTask({ taskId, domainModel: { status }, todolistId }));
  }, []);

  const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
    dispatch(updateTask({ taskId, domainModel: { title }, todolistId }));
  }, []);

  const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
    dispatch(todolistsActions.changeTodolistFilter({ id, filter }));
  }, []);

  const removeTodolistCallBack = useCallback(function (id: string) {
    dispatch(removeTodolist({ id }));
  }, []);

  const changeTodolistTitleCallBack = useCallback(function (id: string, title: string) {
    const thunk = changeTodolistTitle({ id, title });
    dispatch(thunk);
  }, []);

  const addTodolistCallBack = useCallback(
    (title: string) => {
      dispatch(addTodolist({ title }));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistCallBack} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTaskCallBack}
                  changeFilter={changeFilter}
                  addTask={addTaskCallBack}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolistCallBack}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitleCallBack}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
