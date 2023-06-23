export type FilterOption = {
    name: string,
    value: string 
}

export const filterOptions: FilterOption[] = [
    {
      name: 'All',
      value: 'all',
    },
    {
      name: 'Active',
      value: 'active',
    },
    {
      name: 'Completed',
      value: 'completed',
    },
]

export type RegisterForm = {
    firstName: string 
    lastName: string 
}