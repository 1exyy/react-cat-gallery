import styles from "./Checkbox.module.scss";
import {ComponentPropsWithoutRef, FC} from "react";

interface ICheckboxProps extends ComponentPropsWithoutRef<'div'> {
    label: string
    checked: boolean
    onChange: () => void
    id: string;
}

export const Checkbox: FC<ICheckboxProps> = ({label, checked, onChange, id}) => {
    return (
        <label className={styles.checkboxWrapper} htmlFor={id}>
            <input
                type="checkbox"
                id={id}
                className={styles.checkboxInput}
                checked={checked}
                onChange={onChange}
            />
            <span className={styles.customCheckbox}></span>
            {label && <span className={styles.labelText}>{label}</span>}
        </label>
    );
}

