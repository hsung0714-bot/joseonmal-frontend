import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";

const API_BASE = import.meta.env.PROD ? "https://web-production-5954e.up.railway.app" : "";

function renderConverted(text, highlightedWords) {
  if (!text || !highlightedWords.length) return text;
  const wordMap = Object.fromEntries(highlightedWords.map((h) => [h.word, h.modern]));
  const pattern = highlightedWords.map((h) => h.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(`(${pattern})`, "g");
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <span key={match.index} className={styles["trans-highlight"]} title={wordMap[match[0]]}>
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default function HomePage({ onNavigate }) {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dailyWord, setDailyWord] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/dictionary/daily`)
      .then((r) => r.json())
      .then((data) => setDailyWord(data))
      .catch(() => {});
  }, []);

  async function handleConvert() {
    if (!inputText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/convert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original_text: inputText }),
      });
      if (!res.ok) throw new Error(`오류 ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError("번역 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles['nav-logo']}>
          <span className={styles['logo-diamond']}>◆</span>
          <span className={styles['logo-text']}>문장의 고전</span>
        </div>
        <div className={styles['nav-links']}>
          <a className={`${styles['nav-link']} ${styles.active}`} href="#">문장 번역</a>
          <a className={styles['nav-link']} href="#" onClick={(e) => { e.preventDefault(); onNavigate("dictionary"); }}>고어 사전</a>
          <a className={styles['nav-link']} href="#">기록 보관소</a>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <div className={styles['hero-badge']}>로그인하고 이용하기</div>
          <h1 className={styles['hero-title']}>
            오늘의 일상을<br />
            <span className={styles['hero-title-red']}>조선의 문장으로 다시 쓰다</span>
          </h1>
          <p className={styles['hero-desc']}>
            단순한 번역을 넘어 문장의 결을 바꿉니다.<br />
            현대의 감정을 옛 선조들의 깊이 있는 어휘와 문체로 재해석해보세요.
          </p>

          {/* Translation Card */}
          <div className={styles['trans-card']}>
            <div className={styles['trans-card-header']}>
              <span className={`${styles['logo-diamond']} ${styles.small}`}>◆</span>
              <span>선택된 문체</span>
            </div>
            <div className={styles['trans-body']}>
              <div className={styles['trans-left']}>
                <div className={styles['trans-label']}>MODERN KOREAN</div>
                <textarea
                  className={styles['trans-textarea']}
                  placeholder="현대어 문장을 입력하세요"
                  value={inputText}
                  onChange={(e) => {
                    if (e.target.value.length <= 1000) setInputText(e.target.value);
                  }}
                />
              </div>
              <div className={styles['trans-divider']} />
              <div className={styles['trans-right']}>
                <div className={styles['trans-label']}>CLASSICAL STYLE</div>
                <p className={styles['trans-classical']}>
                  {loading && <span className={styles['trans-muted']}>번역 중...</span>}
                  {error && <span className={styles['trans-muted']}>{error}</span>}
                  {!loading && !error && result
                    ? renderConverted(result.converted_text, result.highlighted_words)
                    : !loading && !error && (
                      <span className={styles['trans-muted']}>번역 결과가 여기에 표시됩니다</span>
                    )
                  }
                </p>
              </div>
            </div>
            <div className={styles['trans-footer']}>
              <span className={styles['trans-count']}>{inputText.length} / 1,000자</span>
              <button
                className={styles['btn-primary']}
                onClick={handleConvert}
                disabled={loading || !inputText.trim()}
              >
                {loading ? "번역 중..." : "번역하기 →"}
              </button>
            </div>
          </div>
        </div>

        {/* Daily Word Card */}
        <div className={styles['daily-card']}>
          <div className={styles['daily-icon']}>📖</div>
          <div className={styles['daily-label']}>오늘의 고어</div>
          <div className={styles['daily-word']}>{dailyWord?.word ?? "—"}</div>
          <p className={styles['daily-desc']}>{dailyWord?.modern_meaning ?? ""}</p>
          {dailyWord?.example_sentence && (
            <p className={styles['daily-desc']}>{dailyWord.example_sentence}</p>
          )}
          <a className={styles['daily-link']} href="#">
            뜻풀이 보기 »
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles['footer-logo']}>
          <span className={styles['logo-diamond']}>◆</span>
          <span className={styles['logo-text']}>문장의 고전</span>
        </div>
        <p className={styles['footer-desc']}>
          우리말의 아름다운 뿌리로 현대의 감정을 표현하겠습니다. 당기지는<br />
          고전의 어휘를 일상으로 불렸습니다.
        </p>
        <div className={styles['footer-links']}>
          <div>
            <div className={styles['footer-col-title']}>서비스</div>
            <a href="#">문장 번역</a>
            <a href="#">고어 사전서비스</a>
            <a href="#">API 연동</a>
          </div>
          <div>
            <div className={styles['footer-col-title']}>커뮤니티</div>
            <a href="#">언어 연구소</a>
            <a href="#">언어에 전달</a>
            <a href="#">이벤트</a>
          </div>
        </div>
        <div className={styles['footer-bottom']}>© 2025 VIVID LTD. All rights reserved.</div>
      </footer>
    </div>
  );
}
