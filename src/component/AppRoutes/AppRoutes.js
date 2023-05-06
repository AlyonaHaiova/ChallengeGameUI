import { FC } from "react";
import { Route, Routes} from "react-router-dom";
import LayoutRoutes from "./LayoutRoutes/LayoutRoutes";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<LayoutRoutes />} />
        </Routes>
    );
}
