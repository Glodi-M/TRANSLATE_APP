import React from 'react';

interface HistoryProps {
    history: Array<{ input: string; output: string }>;
    onSelect: (input: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onSelect }) => (
    <div className="history">
        <h3>Historique des traductions</h3>
        {history.length === 0 ? (
            <p>Aucune traduction effectuée</p>
        ) : (
            <ul>
                {history.map((item, idx) => (
                    <li key={idx} onClick={() => onSelect(item.input)}>
                        <strong>{item.input}</strong> → {item.output}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default History;
