"use client"

import React, { FC, PropsWithChildren } from "react"
import styles from "@/app/_home/home-page.module.scss"
import Text from "@/components/Text"

const ContentSection = ({ ...props }) => {
    return (
        <section className={styles.contentSection} {...props}>
            <Wrapper>
                <Row>
                    <NotePreview />
                    <CallToAction
                        text={"share"}
                        action={() => console.log("share")}
                    />
                </Row>
                <Row>
                    <CallToAction
                        text={"vibe"}
                        action={() => console.log("share")}
                    />
                    <NotePreview />
                </Row>
                <Row>
                    <NotePreview />
                    <CallToAction
                        text={"contact us"}
                        action={() => console.log("share")}
                    />
                </Row>
            </Wrapper>
        </section>
    )
}

const Row: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.row}>{children}</div>
}

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>
}

const CallToAction: FC<{
    text: string
    action: () => void
}> = ({ text, action }) => {
    return (
        <div className={styles.half} data-centered>
            <button className={styles.callToAction} onClick={() => action()}>
                <Text variant="titleSmall">{text}</Text>
            </button>
        </div>
    )
}

const NotePreview = () => {
    return (
        <div className={styles.half} data-centered>
            <div className={styles.notePreview}>
                <div className={styles.header}>
                    <Text variant="emphasis" data-faded>
                        Sept 17th. 2023
                    </Text>
                    <Text variant="titleSoft">Im pretty mad</Text>
                </div>
                <div className={styles.content}>
                    <Text variant="medium">
                        Im baby praxis try-hard 3 wolf moon, venmo PBR&B
                        locavore williamsburg mlkshk fanny pack 90s gluten-free.
                        Tilde hell of listi locavore williamsburg mlkshk fanny
                        pack 90s gluten-free locavore williamsburg mlkshk fanny
                        pack 90s gluten-free...
                    </Text>
                </div>
                <div className={styles.footer}>
                    <Text variant="emphasis" data-faded>
                        &mdash; 23, CAN
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default ContentSection
