import Image from "next/image";

type PlayerEvolutionProps = {
    cards: Array<Object>,
}

export default async function PlayerEvolutions({ cards }: PlayerEvolutionProps) {
    return (
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
    </div> );
}