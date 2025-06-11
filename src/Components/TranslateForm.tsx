import { useState } from 'react';

interface Props {
  onTranslate: (text: string) => void;
}

function TranslateForm({ onTranslate }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onTranslate(text);
  };

  return (
    <>
      <div className="top-bar">
        <h2>Traduction</h2>
        <a href="#" className="history-link">Voir l'historique</a>
      </div>
      <textarea
        placeholder="Ecrire une phrase en français"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit} className="translate-button">
        Traduire
      </button>
    </>
  );
}

export default TranslateForm;
