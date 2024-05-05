import { DefaultCard } from "components/card";
import React from "react";
import Circular from "./circular.pdf";

const CircularPdf = () => {
    return (
        <DefaultCard title="Circular Details">
            <iframe src={Circular} width="100%" height="1000px"></iframe>
        </DefaultCard>
    );
};

export default CircularPdf;
