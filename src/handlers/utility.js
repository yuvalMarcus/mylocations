
export const elements = [
    {
        elementType: 'input',
        elementLabel: 'Name',
        elementConfig: {
            type: 'text',
            placeholder: 'Name',
            name: 'name',
        },
        validation: {
            required: true,
            maxLength: 15
        }
    }
]