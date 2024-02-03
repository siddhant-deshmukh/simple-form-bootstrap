import { IUser } from "../App"
import TableRow from "./TableRow"

import axios from "axios"
import { useEffect, useState } from "react"

export default function Table({ setUser }: {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}) {

  const [data, setData] = useState<IUser[]>([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/users`, { withCredentials: true })
      .then(({ status, data }) => {
        if (data.users) {
          setData(data.users)
        }
        console.log(status, data)
      }).catch((err) => {
        console.error("While getting users", err)
      })
  }, [])

  function Logout() {
    axios.get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true })
      .then(({ status }) => {
        if (status === 200) {
          setUser(null)
        } else {
          throw "Something went wrong"
        }
      }).catch((err) => {
        console.error("while logout", err)
      })
  }

  return (
    <div>
      <div className="relative max-w-5xl pt-5 mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <div>
            <button
              onClick={() => { Logout() }}
              id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Logout button</span>
              Logout
            </button>
          </div>
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Birth
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>

            {
              data.map((user) => {
                // console.log(imgUrl)
                return <TableRow user={user}/>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
