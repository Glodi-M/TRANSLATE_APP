interface Props {
    translatedText: string;
    error: string;
    loading: boolean;
}

function TranslateResult({ translatedText, error, loading }: Props) {
    const handleCopy = () => {
        navigator.clipboard.writeText(translatedText);
    };

    return (
        <div>
            {loading && <p style={{ color: 'blue' }}>⏳ Traduction en cours...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && (
                <>
                    <textarea
                        readOnly
                        placeholder="Phrase en espagnole"
                        value={translatedText}
                        rows={4}
                        style={{ width: '100%', marginBottom: '1rem' }}
                    />
                    <button onClick={handleCopy} disabled={!translatedText}>
                        Copier
                    </button>
                </>
            )}
        </div>
    );
}

export default TranslateResult;
