import Page from "@/components/Page"
import LandingSection from "@/app/_home/segments/LandingSection"
import ContentSection from "@/app/_home/segments/ContentSection"

export default function Home() {
    return (
        // subtract height of the navbar
        <Page minHeight="calc(100dvh - 8rem)">
            <LandingSection id="section-landing" />
            <ContentSection id="section-content" />
        </Page>
    )
}
