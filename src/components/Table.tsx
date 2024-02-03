import { Button } from "react-bootstrap"
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
      <div
        style={{
          maxWidth: "1024px",
          paddingTop: "20px",
          overflowX: "auto"
        }}
        className="relative mx-auto">
        <div className="d-flex align-items-center justify-content-between flex-column flex-wrap flex-md-row p-4 bg-white">
          <div>
            <Button onClick={() => { Logout() }} >Logout</Button>
          </div>
          <div className="position-relative">
            <div
              style={{
                top: "0px",
                bottom: "0px",
                pointerEvents: "none",
                left: "10px"
              }}
              className="position-absolute d-flex align-items-center">
              <svg width={20} height={20} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              style={{
                width: "320px",
                display: "block",
                paddingLeft: "40px",
                // padding: "8px",
                // paddingInlineStart: "50px",
                // border: "1px solid rgb(209 213 219)",
                backgroundColor: "rgb(249 250 251)"
              }}
              className="py-2 outlin-none text-sm" placeholder="Search for users" />
          </div>
        </div>
        <table id="the_table" className="w-100 text-sm text-left ">
          <thead  className="text-xs ">
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
                return <TableRow user={user} />
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
