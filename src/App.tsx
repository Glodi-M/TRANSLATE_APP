import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import TranslateForm from './Components/TranslateForm';
import TranslateResult from './Components/TranslateResult';
import History from './Components/History';
import Footer from './Components/Footer';

interface TranslateResponse {
  responseData: {
    translatedText: string;
  };
  responseStatus: number;
  responseDetails?: string;
}

function App() {
  const [translatedText, setTranslatedText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<Array<{ input: string; output: string }>>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false); // New state for history visibility

  const handleTranslate = async (text: string) => {
    if (!text || !text.trim()) {
      setError('Veuillez entrer un texte à traduire.');
      setTranslatedText('');
      return;
    }

    setLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|es`
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: TranslateResponse = await response.json();

      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        const translated = data.responseData.translatedText;
        setTranslatedText(translated);
        setHistory(prev => [{ input: text, output: translated }, ...prev]);
      } else {
        setTranslatedText('Traduction non disponible.');
      }
    } catch (error) {
      console.error('Erreur de traduction :', error);
      setError('Une erreur s’est produite. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const toggleHistory = () => {
    setIsHistoryVisible(prev => !prev); // Toggle history visibility
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main">
        <TranslateForm
          onTranslate={handleTranslate}
          isLoading={loading}
          onToggleHistory={toggleHistory} // Pass toggle function
        />
        <TranslateResult
          translatedText={translatedText}
          error={error}
          loading={loading}
        />
        {isHistoryVisible && ( // Conditionally render History
          <History
            history={history}
            onSelect={(input) => handleTranslate(input)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;