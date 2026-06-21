import React, { useState, useEffect } from 'react';
import styles from './history.module.css';

function history() {
  const [archiveData, setArchiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = import.meta.env.PROD ? 'https://web-production-5954e.up.railway.app' : '';
    fetch(`${API_BASE}/api/convert/history`)
      .then((response) => response.json())
      .then((data) => {
        setArchiveData(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('기록을 가져오는 데 실패했습니다:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <span className={styles.yellowBadge}>기록보관소</span>
        <h1 className={styles.title}>나의 변환 기록</h1>
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#666' }}>과거의 기록을 불러오는 중이옵니다...</p>}

      {!loading && archiveData.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>아직 변환된 기록이 없사옵니다.</p>
      ) : (
        <div className={styles.listContainer}>
          {archiveData.map((item) => (
            <div key={item.id} className={styles.historyCard}>
              <div className={styles.modernBox}>
                <span className={styles.boxLabel}>MODERN KOREAN</span>
                <p className={styles.boxText}>{item.original_text}</p>
              </div>
              <div className={styles.arrowBox}>
                <span className={styles.arrowIcon}>→</span>
              </div>
              <div className={styles.classicalBox}>
                <span className={styles.boxLabelClassical}>CLASSICAL STYLE</span>
                <p className={styles.boxTextClassical}>{item.converted_text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default history;
