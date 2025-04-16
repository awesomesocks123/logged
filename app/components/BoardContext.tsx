import { createContext, Dispatch, useState } from "react"
export const Boardcontext = createContext({})

type ProviderProps = {
    children: React.ReactNode;
}


export type OpenCardId = string|null;
export type  BoardContextProps = {
    openCard?: OpenCardId;
    setOpenCard?: Dispatch<React.SetStateAction<OpenCardId>>;
}

export const BoardContext = createContext<BoardContextProps>({});

export function BoardContextProvider({children} : ProviderProps) {
    const [openCard, setOpenCard] = useState(null)
    return (
        <Boardcontext.Provider value={{
            openCard,setOpenCard,
        }}>
            {children}
        </Boardcontext.Provider>
    )
}