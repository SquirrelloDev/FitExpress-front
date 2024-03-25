function useBMICategory() {
    const categories: { name: string, min: number, max: number, color: string }[] = [
        {name: 'Niedowaga', min: 16, max: 18.49, color: 'blue'},
        {name: 'Optimum', min: 18.5, max: 24.99, color: 'green'},
        {name: 'Nadwaga', min: 25, max: 29.99, color: 'yellow'},
        {name: 'Otyłość I st.', min: 30, max: 34.99, color: 'orange'},
        {name: 'Otyłość II st.', min: 35, max: 39.99, color: 'red'},
    ];
    const currentCategory = (bmiCurrent: number): { name: string; min?: number; max?: number; color: string } => {
        const foundCategory = categories.find(category => (bmiCurrent! >= category.min && bmiCurrent! <= category.max))
        return foundCategory ? foundCategory : {name: 'N/A', color: 'gray'}
    }
    const plannedCategory = (bmiPlanned: number): { name: string; min?: number; max?: number; color: string } | undefined => {
        const foundCategory = categories.find(category => (bmiPlanned! >= category.min && bmiPlanned! <= category.max))
        return foundCategory ? foundCategory : {name: 'N/A', color: 'gray'}
    }
    return {currentCategory, plannedCategory}
}
export default useBMICategory;