
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

export const addNewCategoryAlert = 'add new category';
export const editCategoryAlert = 'category is edited';
export const removeCategoryAlert = 'category is remove';