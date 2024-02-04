import {Navigate, Route, Routes} from "react-router-dom";
import {DashboardPage} from "../pages/dashboard/dashboard.page";
import React, {ReactElement} from "react";
import {getPages, Page} from "./pages";


function getAllRoute(pages : Page[]): ReactElement<any, any>[] {
    let elements: ReactElement<any, any>[] = [];
    for (let page of pages) {
        if (page.path) {
            elements.push(<Route path={page.path} element={page.element}/>);
        }
        if (page.subItems) {
            elements.push(...getAllRoute(page.subItems));
        }
    }
    return elements;
}

export const Routing = () => {
    return (
        <Routes>



            <Route path="/" element={<Navigate to='dashboard'/>}>

            </Route>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="*" element={<Navigate to="/" />} />

        </Routes>
    );
}

