import { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'

function LoginPage() {

    const api_url = "http://localhost:8000/api";
    const [email, set_email] = useState("su@gmail.com");
    const [pwd, set_pwd] = useState("qweqwe--");
    const [error, set_error] = useState(false);
    const [error_message, set_error_message] = useState(false);
    const [isloading, set_isloading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let data = {
            email: email,
            password: pwd
        }
        set_isloading(true)

        await axios.post(api_url + '/auth/login', data).then((res: any) => {
            localStorage.setItem('token', res.data.serviceToken);
            location.reload();
            return res
        })
            .catch((err) => {
                console.log('+++ ', err.response.data)
                set_error(true)
                set_error_message(err?.response?.data?.message)
                return err
            });

        set_isloading(false)
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card p-4" style={{ width: "33rem" }}>
                    <h3 className="text-center mb-4">Login</h3>

                    <div className="alert alert-danger" style={{ padding: 5 }} role="alert" hidden={error ? false : true}>
                        {error_message}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" value={email} onChange={(val: any) => set_email(val.target.value)} className="form-control" id="email"
                                placeholder="Enter your email" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password"
                                placeholder="Enter your password" value={pwd} onChange={(val: any) => set_pwd(val.target.value)} required />
                        </div>
                        {!isloading ? <button type="submit" className="btn btn-dark w-100"> login </button> :
                            <button type="submit" className="btn btn-dark w-100">
                                <div className="spinner-grow" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </button>
                        }
                    </form>
                </div>
            </div >
        </>
    )
}

export default LoginPage
