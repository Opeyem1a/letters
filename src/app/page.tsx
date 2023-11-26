import Page from "@/components/Page"
import LandingSection from "@/app/_home/segments/LandingSection"

export default function Home() {
    return (
        // subtract height of the navbar
        <Page minHeight="calc(100dvh - 8rem)">
            <LandingSection />
        </Page>
    )
}
