import Image from "next/image";

type PlayerPageProps = {
    playerId: string;
};

const getPlayerInfo = async (id: string) => {
    const API_KEY = process.env.API_KEY
    const PLAYER_TAG = id
    const url = `https://api.clashroyale.com/v1/players/%23${PLAYER_TAG}`;

    let info;

    try {
    const response = await fetch(url, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${API_KEY}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    info = data;
    
    // console.log(data.cards);
    // @ts-ignore
    } catch (err) {
        //@ts-ignore
    console.error("Request failed:", err.message);
    }

    return info;
}

const getLeagueImage = (trophies: number) => {
  if (trophies >= 8000) return "https://cdn.statsroyale.com/images/arenas/league10.png";
  if (trophies >= 7600) return "https://cdn.statsroyale.com/images/arenas/league9.png";
  if (trophies >= 7300) return "https://cdn.statsroyale.com/images/arenas/league8.png";
  if (trophies >= 7000) return "https://cdn.statsroyale.com/images/arenas/league7.png";
  if (trophies >= 6600) return "https://cdn.statsroyale.com/images/arenas/league6.png";
  if (trophies >= 6300) return "https://cdn.statsroyale.com/images/arenas/league5.png";
  if (trophies >= 6000) return "https://cdn.statsroyale.com/images/arenas/league4.png";
  if (trophies >= 5600) return "https://cdn.statsroyale.com/images/arenas/league3.png";
  if (trophies >= 5300) return "https://cdn.statsroyale.com/images/arenas/league2.png";
  if (trophies >= 5000) return "https://cdn.statsroyale.com/images/arenas/league1.png";
  return null; // Below league range
};


export default async function PlayerPage({ playerId }: PlayerPageProps) {
    const data = await getPlayerInfo(playerId)

    if (!data) {
        return (
            <>
                Player not found
            </>
        )
    }

    const badgeId = data.clan.badgeId;
    // const leagueImageId = getLeagueImage(data.leagueStatistics.currentSeason.bestTrophies) || ""
    
    // console.log("IMAGE ID: ", data.leagueStatistics.currentSeason.bestTrophies)

    const deck = data.currentDeck
    const cards = data.cards

    console.log(deck)

    return (
        <>
            <div className="p-8 font-mono">
                {/* <Image src={leagueImageId} width={100} height={300} alt="Image"/> */}

                <div className="rounded-2xl p-5 shadow-xl border-opacity-10 bg-[#E6D3C6]">
                    <p className="font-bold text-3xl">{data.name}</p>
                    <p className="opacity-[0.5]">{data.tag}</p>
                    <div>
                        <Image src="/trophy.avif" width={20} height={30} alt="Image" className="inline-block mr-1"/>
                        <p className="mt-1 inline-block font-mono mb-3">
                            {data.trophies} Trophies - {data.bestTrophies} PB
                        </p>
                    </div>
                    <div>
                        <Image src={`https://cdn.statsroyale.com/images/badges/${badgeId}.png`} alt="Image" width={50} height={80} className="inline-block"/>
                        <p className="ml-3 inline-block">{data.clan.name} {'['}{data.role.substring(0, 1).toUpperCase() + data.role.substring(1)}{']'}</p>
                    </div>


                </div>

                <div className="flex flex-row justify-between mt-10 mb-20">
                    <div className="p-5 w-[35%] h-100 rounded-2xl shadow-2xl bg-[#E6D3C6]">
                        <p className="mt-2 text-center text-[22px] font-bold">Deck</p>

                        <div className="w-[100%] h-90 grid grid-cols-4 grid-rows-2 pt-3 pb-16">
                            {deck.map((card: any, index: number) => {
                                return ( 
                                    <div key={card.id} className="flex justify-center items-center flex-col">
                                        {(card.evolutionLevel && card.evolutionLevel == 1 && index < 2) ?
                                            <Image src={card.iconUrls.evolutionMedium} alt={"Image"} width={80} height={200} />:
                                            <Image src={card.iconUrls.medium} alt={"Image"} width={80} height={200}/>}
                                        <p className={(card.level + 14 - card.maxLevel == 15) ? "font-extrabold": "font-medium"}>Level {card.level + 14 - card.maxLevel}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="pt-5 w-[60%] h-100 rounded-2xl shadow-2xl bg-[#E6D3C6]">
                            <p className="mt-2 mb-2 text-center text-[22px] font-bold">Evolutions</p>

                            <div className="flex flex-wrap justify-center pl-3 pr-3">
                                {cards.filter((card: any) => card.maxEvolutionLevel).map((card:any) => {
                                    return (
                                        <div key={card.id}>
                                            <Image className={(card.evolutionLevel) ? "": "grayscale"} src={card.iconUrls.evolutionMedium} alt={"Image"} width={60} height={80} />
                                        </div>
                                    )
                                })}
                            </div>
                    </div>
                </div>

                {typeof data === "object" ? JSON.stringify(data): data}
            </div>
        </>
    )
} 

// FETCH CLAN INFO FUNCTION - FOR LATER USE
// const getClanBadge = async (clanId: string) => {
//     const API_KEY = process.env.API_KEY
//     const CLAN_TAG = clanId
//     const url = `https://api.clashroyale.com/v1/clans/%23${CLAN_TAG.substring(1)}`;

//     let info;

//     try {
//     const response = await fetch(url, {
//         method: "GET",
//         headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         },
//     });

//     if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${await response.text()}`);
//     }

//     const data = await response.json();

//     console.log(data)

//     info = data;
    
//     // console.log(data.cards);
//     // @ts-ignore
//     } catch (err) {
//         //@ts-ignore
//     console.error("Request failed for clan:", err.message);
//     }

//     return info;
// }