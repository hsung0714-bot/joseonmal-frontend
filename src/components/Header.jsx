import React from 'react';
import styles from './Header.module.css';

function Header({ currentTab, setCurrentTab }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => setCurrentTab('main')}>
          <span className={styles.logoIcon}>✒️</span> 문장의 고전
        </div>
        <nav className={styles.nav}>
          <button 
            className={`${styles.navLink} ${currentTab === 'main' ? styles.active : ''}`}
            onClick={() => setCurrentTab('main')}
          >
            문장 변환
          </button>
          <button className={styles.navLink}>고어 사전</button>
          <button 
            className={`${styles.navLink} ${currentTab === 'archive' ? styles.active : ''}`}
            onClick={() => setCurrentTab('archive')}
          >
            기록 보관소
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;