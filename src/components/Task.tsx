import { useState } from "react";
import { CheckCircle, Circle, Trash } from "phosphor-react";

import styles from './Task.module.css'

interface TaskProps {
  id: number
  isDone: boolean
  title: string
  onDeleteTask: (id: number) => void
  onTaskDone: (id: number) => void
}

export function Task({isDone, title, id, onDeleteTask, onTaskDone}: TaskProps) {

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  function handleTaskDone() {
    onTaskDone(id)
  }

  return (
    <div className={styles.tasks}>
      <button onClick={handleTaskDone} className={styles.checkButton}>
        { isDone ? <CheckCircle className={styles.checked} size={24} weight="fill" /> : <Circle className={styles.normal} size={24} /> }
      </button>
      <span className={isDone ? styles.done : ''}>{title}</span>
      <button onClick={handleDeleteTask} className={styles.trashButton}>
        <Trash size={24} />
      </button>
    </div>
  )
}
