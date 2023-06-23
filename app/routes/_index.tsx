import { PlusIcon } from "@heroicons/react/24/outline";
import { Todo as ITodo } from "@prisma/client";
import { json, type ActionFunction, type LoaderFunction, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import EmptyState from "~/components/EmptyState";
import Todo from "~/components/Todo";
import CreateTodoModal from "~/components/modals/CreateTodoModal";
import EditTodoModal from "~/components/modals/EditTodoModal";
import { prisma } from "~/lib/prisma.server";
import SearchBar from "~/components/SearchBar";
import DashboardLayout from "~/components/layouts/DashboardLayout";


export const meta: V2_MetaFunction = () => {
  return [
    { title: "ToDaily" },
    { name: "description", content: "Welcome to ToDaily!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const status = url.searchParams.get('status')
  const search = url.searchParams.get('search')

  let filter = {}
  if (status && status !== "all") {
    filter = { where: {
      isComplete: status === "active" ? false : true
    }}
  }
  
  const todos = await prisma.todo.findMany({...filter})
  const activeTodosCount = await prisma.todo.count({ where: { isComplete: false }})
 
  return json({
    search,
    todos,
    activeTodosCount
  })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const action = String(form.get("action"))

  switch (action) {
    case "create":  {
      const title = form.get("title")
      const description = form.get("description")
      
      if (title && description) {
        return await prisma.todo.create({
          data: {
            title: title as string, 
            description: description as string ,
          }
        })
      }
      return null
    }
    case "delete": {
      const todoId = Number(form.get("to-delete"))
      return await prisma.todo.delete({ where: { id: todoId }})
    }

    case "delete-all": {
      return await prisma.todo.deleteMany()
    }

    case "delete-all-completed": {
      return await prisma.todo.deleteMany({
        where: {
          isComplete: true
        }
      })
    }

    case "edit": {
      const title = form.get("title")
      const description = form.get("description")
      const isComplete = String(form.get("is-complete"))
      const todoId = form.get("to-edit")

      if (title && description && todoId) {
        return await prisma.todo.update({
          where: {
            id: Number(todoId)
          },
          data: {
            title: title as string,
            description: description as string ,
            isComplete: isComplete === "on" ? true : false
          }
        })
      }
      return null
    }

    default: {
      return null
    }
  }
  
}



export default function Index() {
  const { todos, search, activeTodosCount } = useLoaderData()
  const [todo, setTodo] = useState<ITodo | undefined>(undefined)
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)

  const filteredTodos = !search || search.trim().length === 0 ? todos : todos.filter((todo: ITodo) => search && todo.title.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    if (todo) {
      setOpenEditModal(true)
    }
  }, [todo])

  useEffect(() => {
    if (!openEditModal) {
      setTodo(undefined)
    }
  }, [openEditModal])

  return (
    <DashboardLayout>
      <CreateTodoModal open={openCreateModal} setOpen={setOpenCreateModal}/> 
      { todo && <EditTodoModal open={openEditModal} setOpen={setOpenEditModal} todo={todo}/> }
      <div className="flex-1 flex flex-col w-full justify-start gap-y-5 py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex flex-col gap-y-1">
            <div className="flex w-full items-center justify-between mt-10">
              <div className="flex">
                <h1 className="flex items-center justify-center text-lg font-semibold">
                  Recent Todos 
                </h1>
              </div>
              {
                todos && todos.length > 0 &&
                <button 
                  onClick={() => setOpenCreateModal(true)}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-700 rounded-sm"
                >
                  <PlusIcon className="stroke-2 w-3 h-3 mr-2"/>
                  New Todo
                </button>
              }
            </div>
            <p className="w-full text-sm text-slate-800 font-light">{ `( ${activeTodosCount} ) Active`}</p>
          </div>
          <SearchBar hasFilter={search !== null ? true : false}/>
          
        </div>
        <div>
        {
          filteredTodos && filteredTodos.length ?
          <ul className="grid h-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          { filteredTodos.map((todo: ITodo) => {
              return (
                <div key={todo.id}>
                  <Todo setTodo={setTodo} todo={todo}/>
                </div>
              )
            })
          }
          </ul>
          : <EmptyState openCreateModal={() => setOpenCreateModal(true)}/>
        }
        </div>
      </div>
    </DashboardLayout>
  );
}