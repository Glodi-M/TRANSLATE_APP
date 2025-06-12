import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import TranslateForm from './Components/TranslateForm';
import TranslateResult from './Components/TranslateResult';

// Interface pour la réponse de l'API MyMemory
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

  const handleTranslate = async (text: string) => {
    // Validation du texte
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

      if (
        data.responseStatus === 200 &&
        data.responseData &&
        data.responseData.translatedText
      ) {
        setTranslatedText(data.responseData.translatedText);
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

  return (
    <div className="app-container">
      <Header />
      <main className="main">
        <TranslateForm onTranslate={handleTranslate} />
        <TranslateResult
          translatedText={translatedText}
          error={error}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default App;
