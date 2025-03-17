"use client"
import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard';
import AppPagination from '../components/AppPagination';
import { Auction, PagedResult } from '../types';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';
import { useShallow } from 'zustand/react/shallow';
import qs from 'query-string'
import { useParamsStore } from '../../hooks/useParamsStore'
import EmptyFilter from '../components/EmptyFilter';


export default function Listings() {
    const [data, setData] = useState<PagedResult<Auction>>();
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy
    })))

    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({ url: '', query: params });

    function setPageNumber(pageNumber: number) {
        setParams({ pageNumber })
    }

    useEffect(() => {
        getData(url).then(data => {
            setData(data)
        })
    }, [url])

    if (!data) return <h3>Loading...</h3>

    return (
        <>
            <Filters />
            {data.totalCount === 0 ? (
                <EmptyFilter showReset />
            ) : (
                <>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 '>
                        {data.results.map(auction => (
                            <AuctionCard auction={auction} key={auction.id} />
                        ))}
                    </div>
                    <div className='flex justify-center mt-4'>
                        <AppPagination pageChanged={setPageNumber} currentPage={params.pageNumber} pageCount={data.pageCount} />
                    </div>
                </>
            )}

        </>
    )
}
