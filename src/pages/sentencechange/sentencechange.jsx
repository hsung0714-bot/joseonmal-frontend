import React, { useState } from 'react';
import styles from './sentencechange.module.css';

function sentencechange() {
  const [inputText, setInputText] = useState('오늘 시험 망해서 우울함');

  return (
    <div className={styles.wrapper}>
      {/* 히어로 섹션 */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>온고지신(溫故知新)</span>
          <h1>오늘의 일상을<br /><span className={styles.highlight}>조선의 문장</span>으로 다시 쓰다</h1>
          <p>
            단순한 번역을 넘어 문장의 결을 바꿉니다.<br />
            현대의 감정을 옛 선조들의 깊이 있는 어휘와 문체로 재해석해보세요.
          </p>
        </div>
        <div className={styles.heroGraphic}>
          {/* 동양풍 산수화 배경 대용 그래픽 요소 */}
          <div className={styles.mountainOverlay}></div>
        </div>
      </section>

      {/* 변환기 카드 섹션 */}
      <section className={styles.converterContainer}>
        <div className={styles.cardHeader}>
          <span>🕵️ 선비체(양반)</span>
        </div>
        
        <div className={styles.cardBody}>
          {/* 입력 영역 */}
          <div className={styles.inputArea}>
            <div className={styles.areaLabel}>
              <span>MODERN KOREAN</span>
              <button className={styles.resetBtn} onClick={() => setInputText('')}>🔄</button>
            </div>
            <textarea 
              className={styles.textarea}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength={500}
            />
            <div className={styles.charCount}>
              {inputText.length} / 500 자
              <button className={styles.submitBtn}>
                문장 윤색하기 <span className={styles.arrow}>→</span>
              </button>
            </div>
          </div>

          {/* 출력 영역 */}
          <div className={styles.outputArea}>
            <div className={styles.areaLabel}>
              <span className={styles.classicalLabel}>CLASSICAL STYLE</span>
              <div className={styles.actionIcons}>
                <button className={styles.iconBtn}>📋</button>
                <button className={styles.iconBtn}>🔖</button>
                <button className={styles.iconBtn}>🔗</button>
              </div>
            </div>
            <div className={styles.outputContent}>
              <p className={styles.resultText}>
                "금일 시험이 뜻대로 되지 아니하여 마음이 <span className={styles.wordHighlight}>심히 착잡하도다</span>."
              </p>
            </div>
            <div className={styles.dictionarySection}>
              <h5>어휘 풀이</h5>
              <div className={styles.tagRow}>
                <span className={styles.dictTag}>금일(今日): 오늘</span>
                <span className={styles.dictTag}>착잡(錯雜)하다: 마음이 복잡하고 답답하다</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 오늘의 고어 추천 섹션 */}
      <section className={styles.recommendSection}>
        <div className={styles.recommendCard}>
          <div className={styles.bookIcon}>📖</div>
          <h4>오늘의 고어</h4>
          <h3>윤슬</h3>
          <p>햇빛이나 달빛에 비치어 반짝이는 잔물결을 이르는 순우리말.</p>
          <span className={styles.moreLink}>활용 문장 보기 →</span>
        </div>
      </section>
    </div>
  );
}

export default sentencechange;