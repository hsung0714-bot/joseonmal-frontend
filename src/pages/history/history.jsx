import React from 'react';
import styles from './history.module.css';

function history() {
  // 샘플 데이터 배열
  const archiveData = [
    {
      id: 1,
      modern: '오늘 시험 망해서 너무 우울함',
      classical: '“금일 시험이 뜻대로 되지 아니하여 마음이 심히 착잡하도다.”'
    },
    {
      id: 2,
      modern: '친구랑 싸워서 기분이 너무 안 좋아',
      classical: '“벗과의 불화로 인하여 심기가 몹시 불편하구나.”'
    },
    {
      id: 3,
      modern: '내일 중요한 발표가 있어서 많이 긴장돼',
      classical: '“명일 중한 발표를 앞두고 있으니 마음이 자못 떨리는도다.”'
    },
    {
      id: 4,
      modern: '내일 중요한 발표가 있어서 많이 긴장돼',
      classical: '“명일 중한 발표를 앞두고 있으니 마음이 자못 떨리는도다.”'
    }
  ];

  return (
    <div className={styles.wrapper}>
      {/* 타이틀 헤더 */}
      <div className={styles.pageHeader}>
        <span className={styles.yellowBadge}>기록보관소</span>
        <h1 className={styles.title}>나의 변환 기록</h1>
      </div>

      {/* 기록 리스트 리액트 루프 순회 */}
      <div className={styles.listContainer}>
        {archiveData.map((item) => (
          <div key={item.id} className={styles.historyCard}>
            {/* 현대어 왼쪽 블록 */}
            <div className={styles.modernBox}>
              <span className={styles.boxLabel}>MODERN KOREAN</span>
              <p className={styles.boxText}>{item.modern}</p>
            </div>
            
            {/* 중간 연결 화살표 기호 */}
            <div className={styles.arrowBox}>
              <span className={styles.arrowIcon}>→</span>
            </div>

            {/* 고전어 오른쪽 블록 */}
            <div className={styles.classicalBox}>
              <span className={styles.boxLabelClassical}>CLASSICAL STYLE</span>
              <p className={styles.boxTextClassical}>{item.classical}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default history;