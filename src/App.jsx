import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/sentencechange/sentencechange';
import ArchivePage from './pages/history/history';

function App() {
  const [currentTab, setCurrentTab] = useState('main'); // 'main' 또는 'archive'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <main style={{ flex: 1 }}>
        {currentTab === 'main' && <MainPage />}
        {currentTab === 'archive' && <ArchivePage />}
      </main>

      <Footer />
    </div>
  );
}

export default App;