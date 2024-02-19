import Select from "react-select";
import selectStyles from "../../sass/components/select.module.scss";
import clsx from "clsx";
import {SelectOption} from "../Select/types";

interface ManagementControlProps {
    filterFunction: (filterArg: string) => void
}

function ManagementControl({filterFunction}: ManagementControlProps) {
    return (
        <div>
            <h3>Filtrowanie</h3>
            <div>
                <Select options={[{label: 'Wszystkie', value: 'all'}, {
                    label: 'Aktywne',
                    value: 'active'
                }, {label: 'Zakończone', value: 'deactive'}]}
                        onChange={(newValue: SelectOption[]) => {
                            filterFunction(newValue.value)
                        }}
                        defaultValue={{label: 'Wszystkie', value: 'all'}}
                        placeholder={'Filtruj'} classNames={{
                    control: () => selectStyles.select__control,
                    option: ({isSelected}) =>
                        clsx(
                            selectStyles.select__option,
                            isSelected && selectStyles['select__option--selected']
                        )
                }}
                        styles={{
                            control: (base) => ({
                                ...base,
                                backgroundColor: '#1a1a1a',
                                borderRadius: '8px',
                                margin: '10px 0'
                            }),
                            menu: (baseStyles) => ({
                                ...baseStyles,
                                backgroundColor: '#252525FF'
                            }),
                            singleValue: (baseStyles) => ({
                                ...baseStyles,
                                color: '#fff'
                            }),
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: state.isSelected ? '#46C367FF' : 'none'
                            })
                        }}/>
            </div>
        </div>
    )
}

export default ManagementControl