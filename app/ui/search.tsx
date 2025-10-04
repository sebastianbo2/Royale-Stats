'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({ placeholder }: { placeholder: string } ) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        console.log("TERM: ", term);
        replace(`${pathname}?${params.toString()}`);
    }, 1000);
    
    return (
        <>
            <div className="m-10 flex flex-row">
                <div className="-solid-gray flex flex-row bg-gray-200 w-[70%] h-[40px] rounded-full pl-1">
                    <MagnifyingGlassIcon className="w-[30px] opacity-[0.5]"/>
                    <input type="text" className="flex-1 pl-2 focus:outline-none" placeholder={placeholder}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('query')?.toString()}
                    />
                </div>
                {/* <span className="select-none bg-blue-400 border h-[40px] w-[15%] font-semibold text-white flex items-center pl-5 rounded-full opacity-[0.9] hover:opacity-[1] hover:cursor-pointer active:opacity-[0.6]">
                    Search
                </span> */}
            </div>
        </>
    )
}