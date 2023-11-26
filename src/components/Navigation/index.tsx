import Logo from "@/components/Logo"
import Link from "next/link"
import styles from "./Navigation.module.scss"
import Text from "@/components/Text"

export const Navigation = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href="/">
                        <Logo />
                    </Link>
                </li>
                <span data-right="">
                    <li>
                        <Link href="/about">
                            <Text variant="medium">About</Text>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <Text variant="medium">Contact</Text>
                        </Link>
                    </li>
                </span>
            </ul>
        </nav>
    )
}
