import { Check, Trash } from 'phosphor-react';
import { ITask } from '../App';
import styles from './CardTask.module.css';

interface ICardTaskProps extends ITask {
  onDelete: (id: number) => void;
  onToggleDone: (id: number) => void;
}

export function CardTask({
  content,
  isChecked,
  onDelete,
  onToggleDone,
  id,
}: ICardTaskProps) {
  const handleDeleteTask = () => {
    onDelete(id);
  };

  const handleToggleTaskDone = () => {
    onToggleDone(id);
  };

  return (
    <div className={styles.cardTask}>
      {!isChecked ? (
        <button className={styles.btnCheck} onClick={handleToggleTaskDone}>
          <span className="sr-only">Marcar como concluído</span>
        </button>
      ) : (
        <button className={styles.btnChecked} onClick={handleToggleTaskDone}>
          <Check />
          <span className="sr-only">Tarefa já concluída</span>
        </button>
      )}
      <div
        className={`${isChecked ? styles.checkedContent : ''} ${
          styles.content
        }`}
      >
        <p>{content}</p>
      </div>
      <div className={styles.btnDelete}>
        <button type="button" onClick={handleDeleteTask}>
          <span className="sr-only">Deletar task</span>
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
}
