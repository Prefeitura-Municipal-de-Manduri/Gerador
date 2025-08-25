// components/Navbar.tsx
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">PMM</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/home" className={styles.navButton}>Home</Link>
        </li>
        <li>
          <Link href="/gerador2" className={styles.navButton}>2º Gerador</Link>
        </li>
        <li>
          <Link href="/sair" className={styles.navButton}>Sair</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;