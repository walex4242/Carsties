import React from 'react'
import { ButtonGroup, Button } from 'flowbite-react'
import { useParamsStore } from '../../hooks/useParamsStore'
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai'
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs'
import { GiFinishLine, GiFlame } from 'react-icons/gi'

const pageSizeButtons = [4, 8, 12]

const orderButtons = [
    {
        label: 'Alphabetical',
        icon: AiOutlineSortAscending,
        value: 'make'
    },
    {
        label: 'Ending soon',
        icon: AiOutlineClockCircle,
        value: 'endingSoon'
    },
    {
        label: 'Recently Added',
        icon: BsFillStopCircleFill,
        value: 'new'
    }
]

const filterButtons = [
    {
        label: 'Live Auctions',
        icon: GiFlame,
        value: 'live'
    },
    {
        label: 'Ending < 6 hours',
        icon: GiFinishLine,
        value: 'endingSoon'
    },
    {
        label: 'Completed',
        icon: BsStopwatchFill,
        value: 'finished'
    }
]

export default function Filters() {
    const pageSize = useParamsStore(state => state.pageSize);
    const setParams = useParamsStore(state => state.setParams);
    const orderBy = useParamsStore(state => state.orderBy);
    const filterBy = useParamsStore(state => state.filterBy);
    return (
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 mb-4">
            {/* Filter By */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="uppercase text-sm text-gray-500">Filter By</span>
                <ButtonGroup className="flex flex-wrap gap-2">
                    {filterButtons.map(({ label, icon: Icon, value }) => (
                        <Button
                            key={value}
                            onClick={() => {
                                setParams({ filterBy: value })
                                console.log("Filterby set to:", value);
                            }}
                            color={`${filterBy === value ? 'red' : 'gray'}`}
                        >
                            <Icon className="mr-2 h-4 w-4" />
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>

            {/* Order By */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="uppercase text-sm text-gray-500">Order By</span>
                <ButtonGroup className="flex flex-wrap gap-2">
                    {orderButtons.map(({ label, icon: Icon, value }) => (
                        <Button
                            key={value}
                            onClick={() => {
                                setParams({ orderBy: value });
                            }}
                            color={`${orderBy === value ? 'red' : 'gray'}`}
                        >
                            <Icon className="mr-2 h-4 w-4" />
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>

            {/* Page Size */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="uppercase text-sm text-gray-500">Page Size</span>
                <ButtonGroup className="flex flex-wrap gap-2">
                    {pageSizeButtons.map((value, i) => (
                        <Button
                            key={i}
                            onClick={() => setParams({ pageSize: value })}
                            color={`${pageSize === value ? 'red' : 'gray'}`}
                            className="focus:ring-0"
                        >
                            {value}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    );

}
