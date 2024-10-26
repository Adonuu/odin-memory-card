
export async function getChampionNames() {
    const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/champion.json');
    const data = await response.json();
    const championNames = Object.keys(data.data);
    return championNames;
}

export function getChampionImageSource(champion) {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`;
}