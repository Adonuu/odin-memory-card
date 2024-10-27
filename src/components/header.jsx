import '../styles/header.css';

export function Header({playerScore, bestScore}) {
    return (
        <div className="header">
            <h1>League of Legends Memory Game</h1>
            <div className="scores">
                <span>Score: {playerScore}</span>
                <span>Best Score: {bestScore}</span>
            </div>
        </div>
    )
}