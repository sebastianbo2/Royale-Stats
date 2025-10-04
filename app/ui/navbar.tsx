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
            <div className="flex w-[120%] h-full flex-col gap-y-3 px-3 py-4 md:px-2 bg-blue-50">
                {/* decoration */}
                <div className="select-none text-[40px] text-center font-bold bg-gradient-to-r from-rose-600 to-cyan-400 bg-clip-text text-transparent">
                    Royale Stats
                </div>
                {links.map((link) => {
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            // hover:bg-gradient-to-r hover:from-rose-600 hover:to-cyan-400 hover:bg-clip-text hover:text-transparent
                            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-cyan-100 hover:font-bold md:flex-none md:justify-start md:p-2 md:px-3"
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