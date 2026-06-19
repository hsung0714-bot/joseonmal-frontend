import React, { useState, useEffect } from 'react'; // 1. 데이터를 담을 그릇(useState)과 타이밍(useEffect)을 가져옵니다.
import styles from './history.module.css';

function history() {
  // [수정 1] 기존의 가짜 archiveData 배열을 지우고, 빈 주머니(상태)로 만듭니다.
  const [archiveData, setArchiveData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 중인지 알려주는 주머니

  // [수정 2] 화면이 처음 켜질 때 백엔드에 "데이터 줘!" 요청하는 구역
  useEffect(() => {
    // 백엔드의 단어/문장 목록 조회 API 엔드포인트 주소입니다.
    fetch('http://localhost:8000/api/dictionary')
      .then((response) => response.json())
      .then((data) => {
        // 💡 중요: 백엔드 명세서를 보면 데이터가 { total, items: [...] } 구조로 옵니다.
        // 우리가 필요한 건 진짜 목록이 담긴 'items' 배열이므로 data.items를 그릇에 넣습니다.
        if (data.items) {
          setArchiveData(data.items);
        } else {
          setArchiveData(data); // 만약 백엔드가 바로 배열로 준다면 그냥 data를 넣습니다.
        }
        setLoading(false); // 데이터 로딩 완료!
      })
      .catch((error) => {
        console.error('기록을 가져오는 데 실패했습니다:', error);
        setLoading(false);
      });
  }, []); // 처음 켜질 때 딱 한 번만 호출!

  return (
    <div className={styles.wrapper}>
      {/* 타이틀 헤더 */}
      <div className={styles.pageHeader}>
        <span className={styles.yellowBadge}>기록보관소</span>
        <h1 className={styles.title}>나의 변환 기록</h1>
      </div>

      {/* 로딩 중일 때 보여줄 메시지 */}
      {loading && <p style={{ textAlign: 'center', color: '#666' }}>과거의 기록을 불러오는 중이옵니다...</p>}

      {/* [수정 3] 기록 리스트 리액트 루프 순회 */}
      {/* 만약 데이터가 하나도 없다면 안내 문구를 띄우고, 있다면 리스트를 그립니다. */}
      {!loading && archiveData.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>아직 변환된 기록이 없사옵니다.</p>
      ) : (
        <div className={styles.listContainer}>
          {archiveData.map((item) => (
            // 백엔드가 주는 데이터의 id(주로 uuid 문자열 또는 숫자)를 key로 씁니다.
            <div key={item.id} className={styles.historyCard}>
              
              {/* 현대어 왼쪽 블록 */}
              <div className={styles.modernBox}>
                <span className={styles.boxLabel}>MODERN KOREAN</span>
                {/* 💡 백엔드 명세의 key 이름(예: modern_meaning 등)에 맞춰 item.modern 부분을 맞춰줍니다 */}
                <p className={styles.boxText}>{item.modern || item.modern_meaning}</p>
              </div>
              
              {/* 중간 연결 화살표 기호 */}
              <div className={styles.arrowBox}>
                <span className={styles.arrowIcon}>→</span>
              </div>

              {/* 고전어 오른쪽 블록 */}
              <div className={styles.classicalBox}>
                <span className={styles.boxLabelClassical}>CLASSICAL STYLE</span>
                {/* 💡 백엔드가 주는 고전어/조선말 단어 key 이름(예: word 또는 classical_word)을 적어줍니다 */}
                <p className={styles.boxTextClassical}>{item.classical || item.word}</p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default history;