import { Country } from "@db/schema/types"
import { useFetch } from "@/hooks/useFetch"
import { Maybe } from "@/utils/types"

export const useAvailableCountries = (): Maybe<Country[]> => {
    const { data, loading, error } = useFetch<Country[]>(`api/countries`)
    if (loading || error) return []
    return data
}
