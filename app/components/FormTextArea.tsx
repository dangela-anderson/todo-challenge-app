interface FormTextAreaProps {
    label: string, 
    name: string 
    defaultValue?: string
    placeholder?: string 
}

export default function FormTextArea({label, name, defaultValue, placeholder}: FormTextAreaProps) {
    return (
        <div className="grid grid-row-2 gap-y-2">
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor={name}>
                {label}
            </label>
            <div className="col-span-full rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <textarea
                    rows={3}
                    className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-2"
                    id={name} 
                    name={name} 
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}