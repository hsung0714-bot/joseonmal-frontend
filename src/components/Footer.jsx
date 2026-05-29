import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.infoCol}>
            <div className={styles.footerLogo}>✒️ 문장의 고전</div>
            <p className={styles.description}>
              우리말의 아름다움을 현대적 감각으로 재해석합니다. 잊혀가는<br />
              고전의 어휘를 일상으로 불러옵니다.
            </p>
          </div>
          <div className={styles.linksRow}>
            <div className={styles.linkCol}>
              <h4>서비스</h4>
              <p>문장 변환기</p>
              <p>고어 데이터베이스</p>
              <p>API 연동</p>
            </div>
            <div className={styles.linkCol}>
              <h4>커뮤니티</h4>
              <p>문체 연구소</p>
              <p>명예의 전당</p>
              <p>이벤트</p>
            </div>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.bottomRow}>
          <p>© 2026 문장의 고전. All rights reserved.</p>
          <div className={styles.legal}>
            <span>개인정보 처리방침</span>
            <span>이용약관</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;