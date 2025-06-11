interface Props {
  translatedText: string;
}

function TranslateResult({ translatedText }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
  };

  return (
    <>
      <textarea
        readOnly
        placeholder="Phrase en espagnole"
        value={translatedText}
      />
      <button onClick={handleCopy} className="copy-button">
        Copier
      </button>
    </>
  );
}

export default TranslateResult;
