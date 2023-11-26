import React, { FC, PropsWithChildren } from "react"
import styles from "./Page.module.scss"

type PageProps = {
    minHeight?: string
}

const Page: FC<PropsWithChildren & PageProps> = ({
    children,
    minHeight = "100dvh",
}) => {
    return (
        <main
            className={styles.page}
            style={{
                minHeight,
            }}
        >
            {children}
        </main>
    )
}

export default Page
