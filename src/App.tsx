import { PlusCircle, Trash } from 'phosphor-react';

import { Header } from './components/Header';

import './styles/global.css';
import clipboard from './assets/clipboard.svg';
import styles from './App.module.css';
import { CardTask } from './components/CardTask';
import { useState } from 'react';

export interface ITask {
  id: number;
  content: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [textNewTask, setTextNewTask] = useState('');

  function handleCreateTask() {
    if (!textNewTask) {
      return;
    }

    const newTask: ITask = {
      id: Math.random(),
      content: textNewTask,
      isChecked: false,
    };

    setTasks([...tasks, newTask]);
    setTextNewTask('');
  }

  function handleToggleDoneTask(id: number) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: !task.isChecked };
      }

      return task;
    });

    setTasks(newTasks);
  }

  function handleDeleteTask(id: number) {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  }

  return (
    <>
      <Header />
      <section className={styles.wrapper}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            className={styles.inputSearch}
            value={textNewTask}
            onChange={(e) => setTextNewTask(e.target.value)}
          />

          <button
            type="button"
            onClick={handleCreateTask}
            className={styles.btnSearch}
            disabled={!textNewTask}
          >
            <span>Criar</span>
            <div className={styles.svgSearch}>
              <PlusCircle size={20} />
            </div>
          </button>
        </div>

        <div className={styles.todoWrapper}>
          <div className={styles.header}>
            <span className={styles.createdItems}>
              {tasks.length > 1 ? 'Tarefas criadas' : 'Tarefa criada'}
              <div className={styles.counter}>
                <span>{tasks.length}</span>
              </div>
            </span>
            <span className={styles.doneItems}>
              {tasks.length > 1 ? 'Concluídas' : 'Concluída'}
              <div className={styles.counter}>
                <span>
                  {!!tasks.length
                    ? `${tasks.filter((task) => task.isChecked).length} de ${
                        tasks.length
                      }`
                    : 0}
                </span>
              </div>
            </span>
          </div>

          <div className={styles.content}>
            {!!tasks.length ? (
              tasks.map((item) => (
                <CardTask
                  key={item.id}
                  onToggleDone={handleToggleDoneTask}
                  onDelete={handleDeleteTask}
                  {...item}
                />
              ))
            ) : (
              <div className={styles.contentEmpty}>
                <img
                  src={clipboard}
                  alt="Não foram encontradas tarefas a serem exibidas."
                />
                <p>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                </p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
