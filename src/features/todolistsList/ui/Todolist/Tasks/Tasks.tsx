import { TaskStatuses } from "common/enums"
import React from "react"
import { useSelector } from "react-redux"
import { AppRootStateType } from "../../../../../app/store"
import { TaskType } from "../../../api/tasksApi.types"
import { selectFilteredTasks } from "../../../model/tasksSlice"
import { TodolistDomainType } from "../../../model/todolistsSlice"
import { Task } from "./Task/Task"

type Props = {
  todolist: TodolistDomainType
}

export const Tasks = ({ todolist }: Props) => {
  const tasksForTodolist = useSelector<AppRootStateType, TaskType[]>((state) =>
    selectFilteredTasks(state, todolist.id, todolist.filter),
  )

  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </>
  )
}
