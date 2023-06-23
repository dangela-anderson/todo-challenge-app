import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { FilterOption } from "~/lib/types.server";

interface TodoTabProps {
    setFilter: (filter: number) => void
}
export default function TodoTab({ setFilter }: TodoTabProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    
    useEffect(() => {
        setFilter(selectedIndex)
    }, [selectedIndex])

    return (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex gap-x-2">
                <Tab 
                    disabled={selectedIndex === 0}
                    className="transition-colors duration-500 rounded-sm bg-slate-400 text-white w-28 py-1.5 hover:bg-slate-500 disabled:bg-blue-600 focus:outline-none shadow-sm"
                >
                    All
                </Tab>
                <Tab
                    disabled={selectedIndex === 1} 
                    className="transition-colors duration-500 rounded-sm bg-slate-400 text-white w-28 py-1.5 hover:bg-slate-500 disabled:bg-blue-600 focus:outline-none shadow-sm">Active</Tab>
                <Tab 
                    disabled={selectedIndex == 2}
                    className="transition-colors duration-500 rounded-sm bg-slate-400 text-white w-28 py-1.5 hover:bg-slate-500 disabled:bg-blue-600 focus:outline-none shadow-sm">
                        Completed
                </Tab>
            </Tab.List>
        </Tab.Group>
    )
}