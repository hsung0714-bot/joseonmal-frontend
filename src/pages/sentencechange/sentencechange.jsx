import React, { useState, useEffect } from 'react';
import styles from './sentencechange.module.css';

const API_BASE = '';

function renderWithHighlights(text, highlightedWords) {
  if (!highlightedWords || highlightedWords.length === 0) return text;

  const sorted = [...highlightedWords].sort((a, b) => a.position[0] - b.position[0]);
  const parts = [];
  let lastIdx = 0;

  for (const hw of sorted) {
    const [start, end] = hw.position;
    if (start > lastIdx) parts.push(text.slice(lastIdx, start));
    parts.push(
      <span key={start} className={styles.wordHighlight}>
        {text.slice(start, end)}
      </span>
    );
    lastIdx = end;
  }

  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts;
}

function sentencechange() {
  const [inputText, setInputText] = useState('오늘 시험 망해서 우울함');
  const [outputText, setOutputText] = useState('');
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dailyWord, setDailyWord] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/dictionary/daily`)
      .then((res) => res.json())
      .then((data) => setDailyWord(data))
      .catch(() => {});
  }, []);

  const handleConvert = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ original_text: inputText }),
      });
      if (!res.ok) throw new Error('변환 중 오류가 발생했습니다.');
      const data = await res.json();
      setOutputText(data.converted_text || '');
      setHighlightedWords(data.highlighted_words || []);
    } catch (err) {
      setError(err.message || '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (outputText) navigator.clipboard.writeText(outputText);
  };

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
              maxLength={100}
            />
            <div className={styles.charCount}>
              {inputText.length} / 100 자
              <button className={styles.submitBtn} onClick={handleConvert} disabled={isLoading}>
                {isLoading ? '변환 중...' : '문장 윤색하기'} <span className={styles.arrow}>→</span>
              </button>
            </div>
          </div>

          {/* 출력 영역 */}
          <div className={styles.outputArea}>
            <div className={styles.areaLabel}>
              <span className={styles.classicalLabel}>CLASSICAL STYLE</span>
              <div className={styles.actionIcons}>
                <button className={styles.iconBtn} onClick={handleCopy}>📋</button>
                <button className={styles.iconBtn}>🔖</button>
                <button className={styles.iconBtn}>🔗</button>
              </div>
            </div>
            <div className={styles.outputContent}>
              <p className={styles.resultText}>
                {error ? (
                  error
                ) : outputText ? (
                  <>"{renderWithHighlights(outputText, highlightedWords)}"</>
                ) : (
                  '문장을 입력하고 윤색하기 버튼을 눌러주세요.'
                )}
              </p>
            </div>
            <div className={styles.dictionarySection}>
              <h5>어휘 풀이</h5>
              <div className={styles.tagRow}>
                {highlightedWords.length > 0 ? (
                  highlightedWords.map((hw, i) => (
                    <span key={i} className={styles.dictTag}>
                      {hw.word}: {hw.modern}
                    </span>
                  ))
                ) : (
                  <>
                    <span className={styles.dictTag}>금일(今日): 오늘</span>
                    <span className={styles.dictTag}>착잡(錯雜)하다: 마음이 복잡하고 답답하다</span>
                  </>
                )}
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
          <h3>{dailyWord ? dailyWord.word : '윤슬'}</h3>
          <p>{dailyWord ? dailyWord.modern_meaning : '햇빛이나 달빛에 비치어 반짝이는 잔물결을 이르는 순우리말.'}</p>
          <span className={styles.moreLink}>활용 문장 보기 →</span>
        </div>
      </section>
    </div>
  );
}

export default sentencechange;