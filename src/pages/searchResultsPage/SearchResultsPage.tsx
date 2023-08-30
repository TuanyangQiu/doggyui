import React, { useEffect } from "react";
import Styles from "./SearchResultsPage.module.css";
import { Header, Footer, FilterArea, ProductList } from "../../components";
import { useParams, useLocation } from "react-router-dom";
import { productSearchResultSlice, searchProductAsync } from "../../redux/productSearchResult/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { Spin } from "antd";
type MatchParams = {
    keyword: string
}

export const SearchResultsPage: React.FC = () => {


    const { keyword } = useParams<MatchParams>();
    const location = useLocation();
    const loading = useSelector(state => state.productSearchResultReducer.loading);
    const requestError = useSelector(state => state.productSearchResultReducer.requestError);
    const productSearchResults = useSelector(state => state.productSearchResultReducer.data);
    const pagination = useSelector(state => state.productSearchResultReducer.pagination);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(searchProductAsync({ keyword: keyword as string, pageNum: 1, pageSize: 3 }));

    }, [location]//monitor the change of the url, then reseach product again
    );

    const onPageChange = (nextPageNum, pageSize) => {
        dispatch(searchProductAsync({ keyword: keyword as string, pageNum: nextPageNum, pageSize: pageSize }));
    }

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                }}
            />
        );
    }

    if (requestError) {
        return <div>Sorry, {requestError}</div>;
    }
    console.log("pagination", pagination);
    // console.log("testd typeof", typeof testd);
    return (
        <div>


            <Header />
            <div className={Styles["page-content"]}>
                {/* Search Filter */}
                <div className={Styles["product-list-container"]}>


                </div>

                {/* Search results */}
                <div className={Styles["product-list-container"]}>
                    <ProductList data={productSearchResults} paging={pagination} onPageChange={onPageChange} />
                </div>
            </div>
            <Footer />
        </div>);
}