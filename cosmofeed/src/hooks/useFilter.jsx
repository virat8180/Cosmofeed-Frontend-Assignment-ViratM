import { useState } from "react"


export function useFilter(datalist, callback) {

    const [query, setquery] = useState('')

    const filtereddata = datalist.filter((data) =>
        callback(data).toLowerCase().includes(query)
    )

    return [filtereddata, setquery]
}




