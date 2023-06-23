import { useState } from 'react'
import { Switch } from '@headlessui/react'

interface ToggleProps {
    name: string 
    defaultChecked: boolean
}

export default function FormToggle({ name, defaultChecked }: ToggleProps) {
  const [enabled, setEnabled] = useState(defaultChecked)

  return (
    <Switch
        checked={enabled}
        onChange={setEnabled}
        name={name}
        className={`${
            enabled ? 'bg-emerald-500' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Complete</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}