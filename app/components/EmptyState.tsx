import { PlusIcon, RectangleStackIcon } from "@heroicons/react/24/outline";

interface EmptyStateProps {
    openCreateModal: () => void 
}

export default function EmptyState({ openCreateModal }: EmptyStateProps) {
    return (
        <div className="flex items-center justify-center w-full h-full bg-white h-48 rounded-sm shadow-sm py-8">
            <div className="flex items-center justify-center flex-col gap-y-2">
                <RectangleStackIcon className="w-9 h-9 text-slate-500"/>
                <div className="flex flex-col items-center justify-center gap-y-0.5">
                    <p className="font-semibold text-slate-600 text-sm">No todos</p>
                    <p className="font-light text-sm text-slate-500">Get started by creating a new todo.</p>
                </div>
                <button 
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center mt-3 px-4 py-2 text-sm text-white bg-blue-700 rounded-sm"
                >
                    <PlusIcon className="stroke-2 w-4 h-4 mr-2"/>
                    New Todo
                </button>
            </div>
        </div>
    )
}