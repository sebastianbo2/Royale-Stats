"use client";

import Image from "next/image";
import { useState } from "react";

type CardCollectionProps = {
    data: {
        supportCards: Array<Object>,
        cards: Array<Object>,
    },
}

export default function CardCollection({ data } : CardCollectionProps) {
    const levelsPartial = [15, 14, 13, 12, 11]
    const levelsFull = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    
    const [fullCardsBool, setFullCardsBool] = useState(false);

    return (
        <div className="relative w-[100%] bg-[#E6D3C6] rounded-4xl shadow-xl mb-15 pl-5 pb-10">
            <p className="pt-5 pb-5 text-center text-[22px] font-bold">Card Collection</p>
            
            {/* SUB CATEGORIES */}

            {(fullCardsBool ? levelsFull: levelsPartial).map((level) => {
                if (data.cards.filter((card: any) => card.level == card.maxLevel - (14 - level)).length == 0) {
                    return null
                }

                return (
                    <div className="" key={level}>
                        <p className="">Level {level != 15 ? level: "15 - Elite"}</p>

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

            <button className="absolute bottom-4 right-8 font-bold text-[19px] hover:cursor-pointer hover:opacity-[0.7] active:opacity-[0.5]" onClick={() => setFullCardsBool(!fullCardsBool)}>{!fullCardsBool ? "See more" : "See less"}</button>
        </div>
    )
}