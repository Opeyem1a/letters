import { FC, PropsWithChildren } from "react"
import styles from "./Text.module.scss"

type TextVariant =
    | "titleLarge"
    | "titleSoft"
    | "titleSmall"
    | "emphasis"
    | "medium"
    | "regular"

type TextProps = {
    variant: TextVariant
}

const Text: FC<PropsWithChildren & TextProps> = ({ children, variant, ...props }) => {
    return (
        <span className={styles.text} data-text-variant={variant} {...props}>
            {children}
        </span>
    )
}

export default Text
