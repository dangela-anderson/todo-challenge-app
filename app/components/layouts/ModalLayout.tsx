import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Form } from "@remix-run/react";
import { HTMLFormMethod } from "@remix-run/router"

interface ModalLayoutProps {
  title: string
  method?: HTMLFormMethod
  name: string 
  value: string 
  buttonText: string
  open: boolean
  setOpen: (open: boolean) => void 
  children: React.ReactNode
}

export default function ModalLayout({ title, method, name, value, buttonText, open, setOpen, children }: ModalLayoutProps) {
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
    
            <Form method={method} className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-sm bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-sm sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="grid grid-flow-col">
                        <div className="mt-3 ml-4 mt-0 text-left">
                            <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-5">
                                { title }
                            </Dialog.Title>
                            <div className="grid grid-cols-1 gap-6">
                              { children }
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse px-6">
                      <button
                        type="submit"
                        name={name}
                        value={value}
                        className="inline-flex w-full justify-center rounded-sm bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 ml-3 w-auto"
                        
                        onClick={() => setOpen(false)}
                      >
                       { buttonText }
                      </button>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-sm bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-0 w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Form>
          </Dialog>
        </Transition.Root>
    )
}