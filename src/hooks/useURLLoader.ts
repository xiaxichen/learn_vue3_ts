import {reactive} from 'vue'
import axios, {AxiosError} from "axios";

function useURLLoader<T>(url: string) {

    interface LoaderResponse<T> {
        result: T | null
        loading: boolean
        loaded: boolean
        error: string | null
    }

    const response = reactive<LoaderResponse<T>>({
        result: null,
        loading: true,
        loaded: false,
        error: null
    })
    axios.get(url).then((rawResponse) => {
        response.loading = false;
        response.loaded = true;
        response.result = rawResponse.data
    }).catch((e: AxiosError) => {
        response.error = e.message
        response.loading = false;
    })
    return {response}
}


export default useURLLoader
