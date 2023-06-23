import { Fragment} from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Cog8ToothIcon } from "@heroicons/react/24/solid"
import { Link } from "@remix-run/react"

interface DashboardProps {
    children: React.ReactNode
}

export default function Dashboard({ children }: DashboardProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <Disclosure as="nav" className="bg-white border-b border-b-slate-200 shadow-md">
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-stretch justify-start">
                                <Link to="/" className="flex flex-shrink-0 items-center">
                                    <img
                                        width={32}
                                        height={32}
                                        src="/logo.svg"
                                        alt="ToDaily Logo"
                                    />
                                </Link>
                                <h1 className="ml-2 text-2xl text-blue-600 font-semibold">ToDaily</h1>
                            </div>
                            
                        </div>
                    </div>
                </>
            </Disclosure>
            <main className="flex-1 flex flex-col items-center justify-between bg-slate-100">{children}</main>
        </div>
    )
}