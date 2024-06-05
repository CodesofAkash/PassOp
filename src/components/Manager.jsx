import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([]);
    const [secret, setsecret] = useState([]);


    const getPassword = async () => {
        let req = await fetch("https://passop-passwordmanager-9rgkp0awc-codesofakashs-projects.vercel.app/")
        let passwords = await req.json();
        setpasswordArray(passwords);
    }

    useEffect(() => {
        getPassword()
    }, []);


    const ref = useRef()
    const inpRef = useRef()
    const table = useRef()

    const showPassword = () => {
        if (ref.current.src.includes("icons/hide.svg")) {
            ref.current.src = "icons/show.svg"
        } else {
            ref.current.src = "icons/hide.svg"
        }

        inpRef.current.type === "password" ? inpRef.current.type = "text" : inpRef.current.type = "password"
    }

    const savePassword = async () => {
        if (form.password.length < 8 && form.site.length < 12 && form.username.length === 0) {
            alert("please enter valid details")
        } else if (form.password.length < 8) {
            alert("Password length must be greater than 8")
        } else if (form.site.length < 12) {
            alert("Please enter a valid site name having more than 12 characters")
        } else if (form.username.length === 0) {
            alert("Please enter valid username")
        } else {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            let res = await fetch("https://passop-passwordmanager-9rgkp0awc-codesofakashs-projects.vercel.app/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ ...form, idOfClient: uuidv4() })});
            let result = await res.json()
            console.log(result);
        }

        setform({ site: "", username: "", password: "" })

        toast('Password Saved Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const showSecret = (index) => {
        let a = prompt("Enter your PassOP Password");
        if (a === "00000000") {
            setsecret((secret) => {
                const newSecret = [...secret];
                newSecret[index] = !newSecret[index];
                return newSecret;
            });
        } else {
            alert("incorrect password, please try again")
        }
    };

    const copy = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        navigator.clipboard.writeText(text);
    }

    const deleteItemInside = async (item) => {
        let id = item.idOfClient;
        setpasswordArray(passwordArray.filter(i=>i.idOfClient !== id));
        let res = await fetch(`https://passop-passwordmanager-9rgkp0awc-codesofakashs-projects.vercel.app/${id}`, {method: "DELETE", headers: {"Content-Type": "application/json"}});
        let response = await res.json();
        console.log(response);
    }

    const editItem = (item) => {
        let a = prompt("Enter your PassOP Password to edit");
        if (a === "00000000") {
            setform(item);
            deleteItemInside(item);
        } else {
            alert("Wrong Password, try again")
        }
    }

    const deleteItem = (item) => {

        let a = prompt("Enter your PassOP Password to delete");
        if (a === "00000000") {
            deleteItemInside(item);
        } else {
            alert("Wrong Password, try again")
        }

        toast('Password Deleted Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            {/* Same as */}
            <ToastContainer />
            <div className="text-black p-2 md:p-0 md:mycontainer3">
                <div className='flex justify-center items-center'><span className="ml-3 text-2xl text-black font-bold"><span className="text-blue-700 text-2xl">&lt;</span>Pass</span>
                <span className="text-blue-700 text-2xl font-bold">OP/&gt;</span>
                <img className='m-2 h-10 w-10' src="/favicon.ico" alt="icon" />
                </div>
                <p className='text-blue-900 text-lg'>Your own password Manager</p>
                <div className="text-black flex flex-col p-4 items-center">
                    <input value={form.site} name='site' onChange={handleChange} type="text" className='w-full rounded-full placeholder:text-blue-700 outline-none border-l-2 border-b-4 border-purple-100 p-2' placeholder='Enter Website URL' />
                    <div className="flex md:flex-row flex-col gap-7 mt-6 w-full">
                        <input value={form.username} name='username' onChange={handleChange} type="text" className='w-full rounded-full placeholder:text-blue-700 outline-none border-l-2 border-b-4 border-purple-100 p-2' placeholder='Enter Username' />
                        <div className="relative">
                            <input value={form.password} name='password' onChange={handleChange} ref={inpRef} type="password" className='pr-8 w-full rounded-full placeholder:text-blue-700 outline-none border-l-2 border-b-4 border-purple-100 p-2' placeholder='Enter Password' />
                            <span onClick={showPassword} className='absolute right-[7px] top-[10px] font-bold'>
                                <img ref={ref} className='w-5 h-5' src="icons/hide.svg" alt="show" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='hover:bg-gray-100 text-white w-fit h-fit border-b-4 border-l-2 border-r-2 p-2 px-4 mt-8 rounded-full'>
                        <div className='flex justify-center items-center gap-3'>
                            <lord-icon
                                src="https://cdn.lordicon.com/rcgrnzji.json"
                                trigger="hover">
                            </lord-icon>
                            <span className='text-black'>Add Password</span>
                        </div>
                    </button>

                </div>
            </div>

            {passwordArray.length === 0 ? <div className='text-xl text-blue-700'>No passwords to show</div> :
                <div className="mainContainer passwords overflow-x-auto mt-2">
                    <h2 className='my-4 text-xl text-purple-900 font-bold'>Your Passwords</h2>
                    <table ref={table} className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-purple-800 text-white'>
                            <tr className='text-lg'>
                                <th className='md:w-5/12 py-2 h-5'>Site</th>
                                <th className='md:w-3/12 py-2 h-5'>User Name</th>
                                <th className='md:w-3/12 py-2 h-5'>Password</th>
                                <th className='md:w-1/12 py-2 h-5'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-purple-100'>
                            {passwordArray.map((item, index) => {
                                return (
                                    <tr id={item.idOfClient} key={index}>
                                        <td><div className='flex gap-3 justify-between px-2 items-center text-center py-1 border-2 border-white'><a href={item.site} target='_blank'>{item.site}</a> <span onClick={() => { copy(item.site) }} className=' min-w-5 h-5 right-5'><img className='h-5 min-w-5' src="/icons/copy.svg" alt="" /></span></div></td>

                                        <td><div className='flex gap-3 justify-between px-4 items-center text-center py-1 border-2 border-white'>{item.username} <span onClick={() => { copy(item.username) }} className=' min-w-5 h-5 right-5'><img className='h-5 min-w-5' src="/icons/copy.svg" alt="" /></span></div></td>

                                        <td><div className='flex gap-3 justify-between px-2 items-center py-1 border-2 border-white relative'>
                                            <span className='min-w-8/12'>{secret[index] ? item.password : "*****"}</span> <span onClick={() => { secret[index] ? copy(item.password) : alert("Click on eye icon first") }} className='min-w-2/12 h-5 right-10'><img className='h-5 min-w-5' src="/icons/copy.svg" alt="" /></span>
                                            <span onClick={() => showSecret(index)} className='min-w-2/12 right-[6px] top-[5px] font-bold'>
                                                <img className='min-w-5 h-5' src={secret[index] ? "icons/show.svg" : "icons/hide.svg"} alt="show" />
                                            </span></div>
                                        </td>

                                        <td><div className='flex justify-evenly items-center text-center py-2 border-2 border-white'>
                                            <span onClick={() => { editItem(item) }} className='min-w-4 h-4 '><img className='h-4 min-w-4 ' src="/icons/edit.svg" alt="" /></span>
                                            <span onClick={() => { deleteItem(item) }} className='min-w-4 h-4 '><img className='h-4 min-w-4' src="/icons/delete.svg" alt="" /></span></div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }

        </>
    )
}

export default Manager
