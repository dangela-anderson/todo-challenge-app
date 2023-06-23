import { Form, useNavigate, useSearchParams } from "@remix-run/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment, useRef } from "react";

export default function SearchBar({ hasFilter } : { hasFilter: boolean }) {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const searchRef = useRef<HTMLInputElement | null>(null)

    const clearFilters = () => {
        if (searchRef.current) {
            searchRef.current.value = ""
        }
        searchParams.delete('status')
        searchParams.delete('search')
        navigate('/')
    }

    return (
        <Form className="flex gap-4 w-full items-center justify-between mt-10 bg-white p-2 shadow-sm rounded-sm">
            <div className="flex items-center gap-4">
                <div className="flex h-10 items-center justify-center">
                    <input
                        ref={searchRef}
                        name="search"
                        className="block h-full w-full max-w-md grow border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-2" 
                        placeholder="Search"
                    />
                    <div className="flex h-full divide-x divide-blue-400 divide-solid">
                        <div className="flex h-full items-center justify-end gap-x-4 pr-2 bg-blue-600">
                            <select name="status" className="bg-blue-600 h-full py-1.5 px-4 text-white focus:outline-none">
                                <option className="py-1.5 text-slate-600 bg-white"value="all">All</option>
                                <option className="py-1.5 text-slate-600 bg-white" value="active">Active</option>
                                <option className="py-1.5 text-slate-600 bg-white"value="completed">Completed</option>
                            </select>
                        </div>
                        <button className="h-full flex items-center justify-center py-1.5 px-3 bg-blue-600"><MagnifyingGlassIcon className="w-4 h-4  text-white"/></button>
                    </div>
                </div>
                {
                    hasFilter && 
                    <button className="flex items-center text-sm justify-center h-10 py-1.5 px-3 text-blue-600 rounded-md border border-blue-600" type="button" onClick={clearFilters}>
                        Clear Filters
                        <XMarkIcon className="ml-2 w-4 h-4 text-blue-600"/>
                    </button>
                }
            </div>
            

            <div>
                <Menu as="div" className="relative inline-block text-left">
                <div className="flex items-center justify-center h-10">
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white text-sm font-semibold text-slate-900">
                        <p className="text-slate-400 font-normal">Actions</p><EllipsisVerticalIcon className="-mr-1 h-5 w-5 text-slate-400 hover:text-slate-700" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            <Form method="delete">
                                <button 
                                    className="flex justify-start w-full hover:bg-slate-100 hover:text-red-800 text-red-600 block px-4 py-2 text-sm"
                                    type="submit" name="action" value="delete-all-completed"
                                >
                                    Delete All Completed
                                </button>
                            </Form>
                        </Menu.Item>
                        <Menu.Item>
                            <Form method="delete">
                                <button 
                                    className="flex justify-start w-full hover:bg-slate-100 hover:text-red-800 text-red-600 block px-4 py-2 text-sm"
                                    type="submit" name="action" value="delete-all"
                                >
                                    Delete All
                                </button>
                            </Form>
                        </Menu.Item>
                    
                    </div>
                    </Menu.Items>
                </Transition>
                </Menu>
            </div>
        </Form>
    )
}