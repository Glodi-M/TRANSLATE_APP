import { useState } from 'react';

// Interface pour les props
interface Props {
    onTranslate: (text: string) => void;
    isLoading?: boolean;
    onToggleHistory?: () => void; // New prop to toggle history
}

function TranslateForm({ onTranslate, isLoading = false, onToggleHistory }: Props) {
    const [text, setText] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim()) {
            alert('Veuillez entrer un texte à traduire.');
            return;
        }
        onTranslate(text);
    };

    return (
        <div className="translate-form-container">
            <div className="top-bar">
                <h2>Traduction</h2>
                <button
                    className="history-link"
                    onClick={onToggleHistory} // Use the new prop
                    disabled={isLoading}
                >
                    Voir l'historique
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Écrivez une phrase en français"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    aria-label="Texte à traduire"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="translate-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Traduction en cours...' : 'Traduire'}
                </button>
            </form>
        </div>
    );
}

export default TranslateForm;