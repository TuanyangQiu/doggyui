import React from "react";
import { useParams } from 'react-router-dom';

type MatchParams = {
    touristRouteId: string;
}

export const DetailPage: React.FC = () => {

    const params = useParams<MatchParams>();
    return (<h2>Tourist Route id: {params.touristRouteId} </h2>)
}