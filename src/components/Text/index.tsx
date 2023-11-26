import { FC, PropsWithChildren } from "react"
import styles from "./Text.module.scss"

type TextVariant =
    | "titleLarge"
    | "titleSoft"
    | "emphasis"
    | "medium"
    | "regular"

type TextProps = {
    variant: TextVariant
}

const Text: FC<PropsWithChildren & TextProps> = ({ children, variant }) => {
    return (
        <span className={styles.text} data-text-variant={variant}>
            {children}
        </span>
    )
}

export default Text
