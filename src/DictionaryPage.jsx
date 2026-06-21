import { useState, useEffect } from "react";
import styles from "./DictionaryPage.module.css";

const API_BASE = "";
const PAGE_SIZE = 10;

function getPageRange(current, total) {
  const range = [];
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    range.push(i);
  }
  return range;
}

export default function DictionaryPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchDictionary(q, page) {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, size: PAGE_SIZE });
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`${API_BASE}api/dictionary?${params}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResults(data.items);
      setTotal(data.total);
    } catch {
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDictionary("", 1);
  }, []);

  function handleSearch() {
    setCurrentPage(1);
    fetchDictionary(query, 1);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    fetchDictionary(query, page);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <section className={styles['dict-section']}>
      <h2 className={styles['dict-title']}>고어 사전 검색</h2>

      <div className={styles['search-bar']}>
        <input
          className={styles['search-input']}
          type="text"
          placeholder="검색할 옛말이나 현대어를 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className={styles['search-btn']} onClick={handleSearch}>→</button>
      </div>

      {loading ? (
        <p className={styles['dict-status']}>검색 중...</p>
      ) : results.length === 0 ? (
        <p className={styles['dict-status']}>검색 결과가 없습니다.</p>
      ) : (
        <div className={styles['dict-results']}>
          {results.map((item) => (
            <div className={styles['dict-card']} key={item.id}>
              <div className={styles['dict-era']}>{item.era}</div>
              <h3 className={styles['dict-word']}>{item.word}</h3>
              {item.modern_word && (
                <div className={styles['dict-row']}>
                  <span className={styles['dict-field']}>현대어</span>
                  <span className={styles['dict-value']}>{item.modern_word}</span>
                </div>
              )}
              <div className={styles['dict-row']}>
                <span className={styles['dict-field']}>의미</span>
                <span className={styles['dict-value']}>{item.modern_meaning}</span>
              </div>
              {item.example_sentence && (
                <div className={styles['dict-row']}>
                  <span className={styles['dict-field']}>예문</span>
                  <span className={styles['dict-value']}>{item.example_sentence}</span>
                </div>
              )}
              {item.source && (
                <div className={styles['dict-source']}>{item.source}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles['page-btn']}
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >{"<"}</button>
          {getPageRange(currentPage, totalPages).map((n) => (
            <button
              key={n}
              className={`${styles['page-btn']} ${currentPage === n ? styles.active : ""}`}
              onClick={() => handlePageChange(n)}
            >
              {n}
            </button>
          ))}
          <button
            className={styles['page-btn']}
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >{">"}</button>
        </div>
      )}
    </section>
  );
}
