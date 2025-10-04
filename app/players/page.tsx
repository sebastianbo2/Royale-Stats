import Image from "next/image"
import PlayerPage from "../ui/player";
import SearchBar from "../ui/search";

export default async function Players(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {

    const sParams = await props.searchParams;
    const query = sParams?.query || "";

    console.log("QUERY: ", query);

    return (
        <>
            <SearchBar placeholder="Enter player tag, e.g. 'YCQUY8UYU'"/>
            <PlayerPage playerId={query}/>
        </>
    )
}