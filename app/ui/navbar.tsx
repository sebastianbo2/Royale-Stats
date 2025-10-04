import Link from "next/link";

const links = [
    {
        name: "Home",
        href: '/',
    },
    {
        name: "Players",
        href: '/players',
    },
    {
        name: "Clans",
        href: '/clans',
    },
]

export default function Navbar() {
    return (
        <>
            <div className="flex w-[120%] h-full flex-col gap-y-3 px-3 py-4 md:px-2 bg-[#E0794E]">
                {/* decoration */}
                <div className="select-none text-[40px] text-center font-bold bg-[#023E3B] bg-clip-text text-transparent">
                    Royale Stats
                </div>
                {links.map((link) => {
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            // hover:bg-gradient-to-r hover:from-rose-600 hover:to-cyan-400 hover:bg-clip-text hover:text-transparent
                            className="text-[#688e8f] flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium bg-[#f1e5da] hover:opacity-[0.7] hover:text-[#023E3B] md:flex-none md:justify-start md:p-2 md:px-3"
                        >
                            <p className="hidden md:block">=&gt; {link.name}</p>
                        </Link>
                    )
                })}
                <Link href={'/players'}>
                
                </Link>
            </div>
        </>
    )
}