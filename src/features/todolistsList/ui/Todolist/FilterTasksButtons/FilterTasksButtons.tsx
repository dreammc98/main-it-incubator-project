import { Button } from "@mui/material"
import { useAppDispatch } from "common/hooks"
import React from "react"
import { FilterValuesType, TodolistDomainType, todolistsActions } from "../../../model/todolistsSlice"

type Props = {
  todolist: TodolistDomainType
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeTodolistFilterHandler = (filter: FilterValuesType) => {
    dispatch(todolistsActions.changeTodolistFilter({ id, filter }))
  }

  return (
    <>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeTodolistFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeTodolistFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => changeTodolistFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  )
}
