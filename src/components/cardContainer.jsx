import { Card } from "./card";
import '../styles/cardContainer.css'

export function CardContainer({ cards }) {
    return (
        <div className="card-container">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    imageSrc={card.imageSrc}
                    championName={card.championName}
                    handleClick={card.handleClick}
                />
            ))}
        </div>
    );
}