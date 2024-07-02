import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export const useData = ()=>{
    const context = useContext(DataContext);

    return context;
}