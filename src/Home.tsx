import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import useSWR from 'swr'

function HomePage() {

    const api_url = "http://localhost:8000/api/geo_locations";
    const token = localStorage.getItem('token');
    const [error_message, set_error_message] = useState("");
    const [ip, set_ip] = useState("");
    const [hostname, set_hostname] = useState("");
    const [city, set_city] = useState("");
    const [region, set_region] = useState("");
    const [country, set_country] = useState("");
    const [loc, set_loc] = useState("");
    const [org, set_org] = useState("");
    const [postal, set_postal] = useState("");
    const [time_zone, set_time_zone] = useState("");
    const [readme, set_readme] = useState("");
    const [srch, set_srch] = useState("");

    const { data, error, isLoading, mutate } = useSWR([
        api_url,
        srch,
    ], async ([url, srch]) => await axios.get(url + '/' + srch).then((res: any) => res))

    // const { data, isLoading, errorm, mutate } = useSWR(
    //     [
    //         api_url,
    //         debouncedValueSearch === '' || debouncedValueSearch === null ? ' ' : debouncedValueSearch,
    //         sortContent,
    //         currentPG,
    //         sortStr
    //     ],
    //     async ([url, debouncedValueSearch, sortContent, currentPG, sortStr]) =>
    //         await axios.get(url + debouncedValueSearch + '/' + sortContent + '/' + sortStr + '?page=' + currentPG).then((res) => res)
    // );


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let data = {
            ip: ip,
            hostname: hostname,
            city: city,
            region: region,
            country: country,
            loc: loc,
            org: org,
            postal: postal,
            time_zone: time_zone,
            readme: readme
        }
        await axios.post(api_url, data, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Add the token here
                'Content-Type': 'application/json'
            }
        })
            .then((res: any) => {
                mutate()
                set_ip("")
                set_hostname("")
                set_city("")
                set_region("")
                set_country("")
                set_loc("")
                set_org("")
                set_postal("")
                set_time_zone("")
                set_readme("")
                set_error_message(res?.data?.message)
                setTimeout(() => {
                    set_error_message("")
                }, 5000);
                return res
            })
            .catch((err) => {
                console.log('+++ ', err.response.data.errors)
                set_error_message(JSON.stringify(err?.response?.data?.errors))
                setTimeout(() => {
                    set_error_message("")
                }, 15000);
                return err
            });

    };

    const handleDelete = async (id: any) => {
        await axios.delete(api_url + '/[' + id + ']', {
            headers: {
                'Authorization': `Bearer ${token}`,  // Add the token here
                'Content-Type': 'application/json'
            }
        })
            .then((res: any) => {
                mutate()
                set_error_message(res?.data?.message)
                setTimeout(() => {
                    set_error_message("")
                }, 5000);
                return res
            })
            .catch((err) => {
                set_error_message(JSON.stringify(err?.response?.data?.errors))
                setTimeout(() => {
                    set_error_message("")
                }, 15000);
                return err
            });


    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        location.reload()
    }
    const handleSrch = (val: any) => {
        val.preventDefault()
        set_srch(val.target.value)
    }

    if (isLoading || error) {
        return <h1>...loading</h1>
    }


    return (
        <>


            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
                <div className="container-fluid">
                    <h3>Geolocation Information</h3>
                    <h6 onClick={() => handleLogout()}>Logout</h6>
                </div>
            </nav>
            <form onSubmit={handleSubmit} id="itemForm" className="mb-4 col-12">

                <div className="row">
                    <div className="col-6">
                        <div className="mb-2">
                            <label htmlFor="post" className="mb-2">IP</label>
                            <input type="text"
                                className="form-control"
                                placeholder="xx.xx.xx.xx"
                                value={ip}
                                onChange={(val: any) => set_ip(val.target.value)}
                            // required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="post" className="mb-2">Hostname</label>
                            <input type="text"
                                className="form-control"
                                placeholder="dsl.xxx.xxx.xxx.xxx.xxx.net"
                                value={hostname}
                                onChange={(val: any) => set_hostname(val.target.value)}
                            // required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="post" className="mb-2">City</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Iloilo"
                                value={city}
                                onChange={(val: any) => set_city(val.target.value)}
                            // required
                            />

                        </div>
                        <div className="mb-2">
                            <label htmlFor="post" className="mb-2">Region</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Western Visaya"
                                onChange={(val: any) => set_region(val.target.value)}
                            // required
                            />

                        </div>
                        <div className="mb-2">
                            <label htmlFor="post" className="mb-2">Country</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Name"
                                onChange={(val: any) => set_country(val.target.value)}
                            // required
                            />

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-2">
                            <label htmlFor="post" className="mb-2">Location</label>
                            <input type="text"
                                className="form-control"
                                placeholder="10.6969,122.5644"
                                onChange={(val: any) => set_loc(val.target.value)}
                            // required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="post" className="mb-2">Org</label>
                            <input type="text"
                                className="form-control"
                                placeholder="XXXX889 Philippine Long Distance Telephone Company"
                                onChange={(val: any) => set_org(val.target.value)}
                            // required
                            />

                        </div>
                        <div className="mb-2">
                            <label htmlFor="post" className="mb-2">Postal</label>
                            <input type="text"
                                id="name"
                                className="form-control"
                                placeholder="5XXX"
                                onChange={(val: any) => set_postal(val.target.value)}
                            // required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="post" className="mb-2">Timezone</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Asia/Manila"
                                onChange={(val: any) => set_time_zone(val.target.value)}
                            // required
                            />

                        </div>
                        <div className="mb-2">
                            <label htmlFor="post" className="mb-2">Readme</label>
                            <input type="text"
                                className="form-control"
                                placeholder="https://ipinfo.io/missingauth"
                                onChange={(val: any) => set_readme(val.target.value)}
                            // required
                            />
                        </div>
                    </div>
                </div>
                <div className={error_message === "success" ? "alert alert-success" : error_message !== "" ? "alert alert-danger" : "alert alert-danger"} style={{ padding: 5, marginTop: 5 }} role="alert" hidden={error_message !== "" ? false : true}>
                    {error_message}
                </div>
                <button type="submit" className="btn btn-sm btn-outline-dark mt-1">Save</button>
            </form>

            <div className="col-3 mb-3 d-flex">
                <input className="form-control mr-sm-2 flex-grow-1" type="search" value={srch} onChange={handleSrch} placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-dark btn-sm ml-2" disabled type="submit">Search</button>
            </div>


            <table id="itemsTable" className="table ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">IP</th>
                        <th scope="col">Hostname</th>
                        <th scope="col">City</th>
                        <th scope="col">Region</th>
                        <th scope="col">Country</th>
                        <th scope="col">Location</th>
                        <th scope="col">Org</th>
                        <th scope="col">Postal</th>
                        <th scope="col">Timezone</th>
                        <th scope="col">readme</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.data?.map((item: any, ndx: number) => (
                        <tr key={ndx}>
                            <td>{item.geo_location_id}</td>
                            <td>{item.ip}</td>
                            <td>{item.hostname}</td>
                            <td>{item.city}</td>
                            <td>{item.region}</td>
                            <td>{item.country}</td>
                            <td>{item.loc}</td>
                            <td>{item.org}</td>
                            <td>{item.postal}</td>
                            <td>{item.time_zone}</td>
                            <td>{item.readme}</td>

                            <td>
                                {/* <button className='btn btn-sm btn-outline-dark m-1' onClick={() => false}>Edit</button> */}
                                <button className='btn btn-sm btn-outline-dark text-danger' onClick={() => handleDelete(item.geo_location_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default HomePage
