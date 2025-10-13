import Image from "next/image"

type PlayerDeckProps = {
    deck: Array<Object>,
}

export default async function PlayerDeck({ deck }: PlayerDeckProps) {
    return (
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
    )
}