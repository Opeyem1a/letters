import { Tag } from "@db/schema/types"
import { useFetch } from "@/hooks/useFetch"
import { Maybe } from "@/utils/types"

export const useAvailableTags = (): Maybe<Tag[]> => {
    const { data, loading, error } = useFetch<Tag[]>(`api/tags`)
    if (loading || error) return []
    return data
}
