import React from "react"

type Option = {
    value: string
    label: string
}

type SelectProps = {
    value: string
    displayName?: string
    name: string
    onChange: () => void
    onBlur: () => void
    options: Option[]
    defaultLabel: string
}

const Select = ({
    name,
    displayName,
    value,
    onChange,
    onBlur,
    options,
    defaultLabel,
}: SelectProps) => {
    return (
        <>
            <label htmlFor={name} style={{ display: "block" }}>
                {displayName ?? name}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                style={{ display: "block" }}
            >
                <option value="" label={defaultLabel}>
                    {defaultLabel}
                </option>
                {options.map((option, index) => (
                    <option
                        key={`${name}-option-${index}`}
                        value={option.value}
                        label={option.label}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    )
}

export default Select
