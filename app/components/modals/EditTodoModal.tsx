import ModalLayout from "../layouts/ModalLayout"
import FormTextInput from "../FormTextInput"
import FormTextArea from "../FormTextArea"
import { Todo } from "@prisma/client"
import FormToggle from "../FormToggle"

interface EditTodoModalProps {
    todo: Todo
    open: boolean 
    setOpen: (open: boolean) => void 
}

export default function EditTodoModal({ todo, open, setOpen }: EditTodoModalProps) {

    return (
        <ModalLayout 
            title="Edit Todo"
            method="POST"
            name="action"
            value="edit"
            buttonText="Edit"
            open={open} setOpen={setOpen}
        >
            <>
                <input type="hidden" name="to-edit" value={todo.id}/>

                <FormTextInput label="Title" type="text" name="title" defaultValue={todo.title} placeholder="Organize and Clean Kitchen Pantry." required={true}/>
                <FormTextArea label="Description" name="description" defaultValue={todo.description} placeholder="Take a quick inventory and jot down what you need to restock." required={true}/>
                <div className="grid gap-y-2">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Complete</dt>
                    <dd>
                        <FormToggle name="is-complete" defaultChecked={todo.isComplete}/>
                    </dd>
                </div>
            </>
        </ModalLayout>
    )

}