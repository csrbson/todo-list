import todoListLogo from '../assets/todolist-logo.svg'

import styles from './Header.module.css'

export function Header() {
  
  return (
    <header className={styles.header}>
      <img src={todoListLogo} alt="ToDoList logo" />
    </header>
  )

}