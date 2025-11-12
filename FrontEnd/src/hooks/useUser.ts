import { userApi } from "@/lib/api/user/user"
import { QUERY_KEY } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"


export const useUser = ()=>{
    const useGetUserById = (id:number)=> {
        return useQuery({
            queryKey: [QUERY_KEY.getUserProfileById(id)],
            queryFn: () => userApi.getUserProfile(id)
        })
    }
    return { useGetUserById }
}