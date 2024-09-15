import { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'

import { useDebounce } from 'use-debounce';

function SearchPage({ srch, set_srch, handleClickSearch }: any) {

    const api_url = "http://localhost:8000/api/searches";
    const token = localStorage.getItem('token');

    const [srch_final, set_srch_final] = useState("")

    const { data, error, isLoading, mutate } = useSWR([
        api_url
    ], async ([url]) => await axios.get(url).then((res: any) => res));

    const insert = async () => {
        let data = {
            searches: srch,
        }
        await axios.post(api_url, data, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Add the token here
                'Content-Type': 'application/json'
            }
        })
            .then((res: any) => {
                mutate()
                return res
            })
            .catch((err) => {
                return err
            });
    }
    const handleSrch = (val: any) => {
        insert()
        set_srch(val.target.value)
    }




    return (
        <>

            <h6>Search</h6>

            <div className="col-3 mb-3 d-flex">
                <input
                    className="form-control mr-sm-2 flex-grow-1"
                    type="search"
                    value={srch}
                    onChange={handleSrch}
                    placeholder="Search"
                    aria-label="Search"
                />
                <button type='button' className='btn btn-sm btn-outline-dark text-dark' onClick={insert}>search</button>

            </div>

            <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
                {data?.data?.data?.map((item: any, ndx: number) => (
                    <li key={ndx} style={{ cursor: "pointer", border: "1px solid gray", padding: 2, borderRadius: 3 }} className='m-2' onClick={() => handleClickSearch(item.search)}>{item.search}</li>
                ))}
            </ul>
        </>
    )
}

export default SearchPage
