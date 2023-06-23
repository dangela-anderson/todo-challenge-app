import ModalLayout from "../layouts/ModalLayout"
import FormTextInput from "../FormTextInput"
import FormTextArea from "../FormTextArea"

interface CreateTodoModalProps {
    open: boolean 
    setOpen: (open: boolean) => void 
}

export default function CreateTodoModal({ open, setOpen }: CreateTodoModalProps) {

    return (
        <ModalLayout 
            title="Create Todo"
            method="POST"
            name="action"
            value="create"
            buttonText="Create"
            open={open} setOpen={setOpen}
        >
            <>
                <FormTextInput label="Title" type="text" name="title" defaultValue={undefined} placeholder="Organize and Clean Kitchen Pantry." required={true}/>
                <FormTextArea label="Description" name="description" defaultValue={undefined} placeholder="Take a quick inventory and jot down what you need to restock." required={true}/>
            </>
        </ModalLayout>
    )

}