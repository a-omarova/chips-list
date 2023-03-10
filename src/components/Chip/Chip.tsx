import React from 'react'
import styles from './Chip.module.css'
import { ChipPropsType } from '@/types'

export const Chip = (props: ChipPropsType) => {
    const {id, name, multiple, value, isChecked, onChipClick} = props

    return (
        <label className={styles.label}>
            {onChipClick && (
                multiple
                    ? (
                        <input
                            type="checkbox"
                            className="visually-hidden"
                            value={value}
                            checked={isChecked}
                            name={name}
                            onChange={() => onChipClick(id)}
                        />
                    )
                    : (
                        <input
                            type="radio"
                            value={value}
                            className="visually-hidden"
                            checked={isChecked}
                            name={name}
                            onChange={() => onChipClick(id)}
                        />
                    )
            )}
            <span className={styles.value}>{value}</span>
        </label>
    )
}
