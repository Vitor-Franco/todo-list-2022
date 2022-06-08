import logo from '../assets/rocket.svg';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.wrapper}>
      <img className={styles.logo} src={logo} alt="Logo ToDo List" />
      <h3 className={styles.titleLogo}>
        <span className={styles.to}>to</span>
        <span className={styles.do}>do</span>
      </h3>
    </header>
  );
}
