import React from 'react';
import styles from './dataTable.module.css'

export default function PlayerDialog({ player, onClose }) {
    if (!player) return null; // Return null if no player is selected

    console.log(player)

    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogContent}>
                <h2>{player.name}</h2>
                <p>Value: {player.value}</p>
                {/* Add more player details as needed */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}