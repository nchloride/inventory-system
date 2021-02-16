import React, { useState } from 'react'

export const useRefreshTable = (initialState:boolean) => {
    const [refresh,setRefresh] = useState<boolean>(initialState);

    return [refresh,setRefresh];
}
