import { Delete } from "@mui/icons-material"
import { Checkbox, IconButton } from "@mui/material"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"
import { useAppDispatch } from "common/hooks"
import React, { ChangeEvent } from "react"
import { TaskType } from "../../../../api/tasksApi.types"
import { tasksThunks } from "../../../../model/tasksSlice"
import s from "./Task.module.css"

type Props = {
  task: TaskType
  todolistId: string
}

export const Task = ({ task, todolistId }: Props) => {
  const { id: taskId, status, title } = task

  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(tasksThunks.removeTask({ taskId, todolistId }))
  }

  const updateTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId }))
  }

  const updateTaskTitleHandler = (title: string) => {
    dispatch(tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId }))
  }

  const isTaskCompleted = status === TaskStatuses.Completed

  return (
    <div key={taskId} className={isTaskCompleted ? s.isDone : ""}>
      <Checkbox checked={isTaskCompleted} color="primary" onChange={updateTaskStatusHandler} />
      <EditableSpan value={title} onChange={updateTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
