import { Country } from "@db/schema/types"

export const useAvailableCountries = (): Country[] => {
    // todo: fetch all countries from a new api that retrieves all countries we support
    return [
        {
            code: "CAD",
            id: 1,
            name: "Canada",
        },
    ]
}
