"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import styles from "@/app/_home/home-page.module.scss"
import Text from "@/components/Text"

const LandingSection = ({ ...props }) => {
    const revealMore = useCallback(() => {
        const section = document.getElementById('section-content');
        console.log(section)
        if (section) {
            section.scrollIntoView({behavior: 'smooth', block: "start"});
        }
    }, [])

    const questionText = useMemo(() => {
        // todo: have options for the question text? Should cycle through options until user types ever, then stop
        return "How are you feeling?"
    }, [])

    const [questionResponse, setQuestionResponse] = useState("")

    useEffect(() => {}, [])

    return (
        <section className={styles.landingSection} {...props}>
            <div className={styles.pseudoForm}>
                <span
                    className={styles.questionTextWrapper}
                    data-faded={!!questionResponse.length}
                >
                    <Text variant="titleLarge">{questionText}</Text>
                </span>
                <div className={styles.questionResponseWrapper}>
                    <Text variant="titleLarge">
                        <input
                            type="text"
                            className={styles.inputInText}
                            value={questionResponse}
                            onChange={value => {
                                setQuestionResponse(value.target.value)
                            }}
                        />
                    </Text>
                    {/*todo: make pretty*/}
                    <button
                        className={styles.shareMoreButton}
                        data-show={questionResponse.length > 10}
                    >
                        <Text variant="titleSoft">{"->"}</Text>
                    </button>
                </div>
            </div>
            <div>
                <button
                    className={styles.revealMoreButton}
                    onClick={revealMore}
                >
                    <Text variant="regular">Wait, there&apos;s more&nbsp;&nbsp;👀</Text>
                </button>
            </div>
        </section>
    )
}

export default LandingSection
