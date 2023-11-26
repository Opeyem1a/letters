import { Poppins } from "next/font/google"

const poppins = Poppins({ weight: "600", subsets: ["latin"] })

const Logo = () => {
    return (
        <div
            className={poppins.className}
            style={{
                fontSize: "2rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
            }}
        >
            atm,
        </div>
    )
}

export default Logo
