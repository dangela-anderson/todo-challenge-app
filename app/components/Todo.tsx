import { Todo } from "@prisma/client"
import { Form } from "@remix-run/react"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import TodoDropdown from "./TodoDropdown";

interface TodoProps {
    setTodo: (todo: Todo) => void
    todo: Todo
}

export default function Todo({ setTodo, todo }: TodoProps) {
    return (
        <li  className="grid gap-y-2 relative rounded-sm shadow-md bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="absolute top-4 right-4">
                <TodoDropdown setTodo={setTodo} todo={todo}/>
            </div>
            <p className="text-md font-semibold mt-4">{todo.title}</p>
            <p className="text-slate-500 text-sm font-light">{todo.description}</p>
            <div className="flex items-center gap-x-1 mt-2">
            {
                todo.isComplete ?
                <>
                <CheckCircleIcon className="w-4 h-4 fill-emerald-600 text-white"/>
                <p className="text-xs text-emerald-400 font-semibold">Completed</p> 
                </>
                :
                <>
                <XCircleIcon className="w-4 h-4 fill-yellow-300 text-white"/>
                <p className="text-xs text-yellow-500 font-semibold">Active</p> 
                </>
            }
            </div>
        </li>
    )
}

