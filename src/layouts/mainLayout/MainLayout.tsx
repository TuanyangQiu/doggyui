import React from "react";
import Styles from "./MainLayout.module.css";
import { Header, Footer } from "../../components";

interface PropsType {

    children?: React.ReactNode
}
export const MainLayout: React.FC<PropsType> = ({ children }) => {

    return (<>
        <Header />
        <div className={Styles['page-content']} >
            {children}
        </div>
        <Footer />
    </>)
}