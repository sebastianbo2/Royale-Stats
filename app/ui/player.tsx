import Image from "next/image";
import PlayerDeck from "./playerComponents/playerDeck";
import PlayerEvolutions from "./playerComponents/playerEvolutions";
import CardCollection from "./playerComponents/cardCollection";

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
    } catch (err: Error) {
        console.error("Request failed:", err.message);
    }

    return info;
}


export default async function PlayerPage({ playerId }: PlayerPageProps) {
    const data = await getPlayerInfo(playerId)

    if (!data) {
        return (
            <div className="text-[22px]">
                Player not found {`-- ("${playerId}" is not a valid tag)`}
            </div>
        )
    }

    const badgeId = data.clan.badgeId;
    // const leagueImageId = getLeagueImage(data.leagueStatistics.currentSeason.bestTrophies) || ""
    
    // console.log("IMAGE ID: ", data.leagueStatistics.currentSeason.bestTrophies)

    const deck = data.currentDeck
    const cards = data.cards

    console.log(deck)

    const levels = [14, 13, 12, 11]

    return (
        <>
            <div className="font-mono">
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
             
                    <div className="flex flex-row gap-3 mt-2">
                        {data.supportCards.map((tower: any) => {
                            console.log(tower);
    
                            return (
                                <div key={tower.id} className="">
                                    <Image className="" src={tower.iconUrls.medium} alt={"Image"} width={60} height={80} />
                                    <p className="text-center font-bold">{tower.level + (15 - tower.maxLevel - 1)}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="flex flex-row justify-between mt-10 mb-20">
                    <PlayerDeck deck={data.currentDeck}/>

                    <PlayerEvolutions cards={cards}/>
                </div>

                <CardCollection data={data}/>

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