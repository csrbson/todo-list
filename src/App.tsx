import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { Header } from './components/Header'
import { Task } from './components/Task'
import { PlusCircle } from 'phosphor-react'

import './global.css'
import styles from './app.module.css'

import Clipboard from './assets/clipboard.svg'

interface Task {
  id: number;
  title: string;
  isDone: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskTitle, setTaskTitle] = useState('')
  
  const taskTitleEmpty = taskTitle.length === 0
  const taskCount = tasks.length
  const taskDoneCount = tasks.reduce((total, task) => {
    if(task.isDone) return total += 1
    else return total
  }, 0)

  function handleTaskTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTaskTitle(event.target.value)
  }

  function handleNewTask(event: FormEvent) {
    event.preventDefault()
    setTasks([...tasks, {id: taskCount + 1, title: taskTitle, isDone: false}])
    setTaskTitle('')
  }

  function deleteTask(id: number) {
    console.log(`deleted task: ${id}`)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function taskDone(id: number) {
    setTasks(tasks.map((task) => (task.id === id ? {...task, isDone: !task.isDone} : task)))
    console.log(tasks)
  }

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.content}>
        <form onSubmit={handleNewTask} className={styles.taskForm} action="">
          <input required onChange={handleTaskTitleChange} value={taskTitle} placeholder='Adicione uma nova tarefa' type="text" />
          <button disabled={taskTitleEmpty} type="submit">Criar <PlusCircle size={16} /></button>
        </form>

        <div className={styles.counters}>
          <span>Tarefas criadas <strong>{tasks.length}</strong></span>
          <span>Concluídas <strong>{taskDoneCount} de {tasks.length}</strong></span>
        </div>

        { tasks.length === 0
         ?
          <div className={styles.emptyTasks}>
            <img src={Clipboard} alt="imagem de uma tarefa" />
            <p><strong>Você ainda não tem tarefas cadastradas</strong><br/>Crie tarefas e organize seus itens a fazer</p>
          </div>
         : 
          tasks.map(task => {             
            return ( <Task key={task.id} id={task.id} isDone={task.isDone} title={task.title} onDeleteTask={deleteTask} onTaskDone={taskDone} /> )
          })
        }

      </main>

    </div>
  )
}
