import Image from "next/image";

type CardCollectionProps = {
    data: {
        supportCards: Array<Object>,
        cards: Array<Object>,
    },
}

export default async function CardCollection({ data } : CardCollectionProps) {
    let levels = [14, 13, 12, 11]

    return (
        <div className="w-[100%] bg-[#E6D3C6] rounded-4xl shadow-xl mb-15 pl-5 pb-10">
            <p className="pt-5 pb-5 text-center text-[22px] font-bold">Card Collection</p>
            
            {/* SUB CATEGORIES */}
            <div>
                <p className="">Tower Cards</p>
                
                <div className="flex flex-row gap-3">
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

            <p className="mt-10">Level 15 - Elite</p>

            <div className="flex flex-row">
                    {data.cards.filter((card: any) => card.level == card.maxLevel + 1).map((card: any) => {
                        return (
                            <div key={card.id}>
                                <Image className="" src={card.iconUrls.medium} alt={"Image"} width={60} height={80} />
                            </div>
                        )
                    })}
            </div>

            {levels.map((level) => {
                return (
                    <div key={level}>
                        <p className="mt-10">Level {level}</p>

                        <div className="flex flex-row flex-wrap">
                                {data.cards.filter((card: any) => card.level == card.maxLevel - (14 - level)).map((card: any) => {
                                    return (
                                        <div key={card.id}>
                                            <Image className="" src={card.iconUrls.medium} alt="Image" width={60} height={80} />
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}