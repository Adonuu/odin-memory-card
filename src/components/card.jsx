
export function Card({imageSrc, championName, handleClick}) {
    return (
        <div className="card">
            <img src={imageSrc} alt={championName} onClick={handleClick} />
            <p>{championName}</p>
        </div>
    )
}