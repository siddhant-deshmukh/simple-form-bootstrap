import { faker } from '@faker-js/faker'
import { IUser } from '../App'

export default function TableRow({ user }: {
  user: IUser
}) {
  const date = new Date(user.dob)
  const imgUrl = faker.image.urlLoremFlickr({ category: 'cats' })
  const randomNum = Math.random()
  return (
    <tr
      style={{
        borderBottom: "1px solid lightgray",
      }}
      key={user._id + user.email} className="bg-white  hover:bg-gray-50">
      <th scope="row" style={{ whiteSpace: "nowrap" }} className="d-flex align-items-center   ">
        <img
          width={40}
          height={40}
          style={{
            borderRadius: "9999px"
          }}
          src={imgUrl} alt="Jese image" />
        <div className="ps-3">
          <div style={{ fontWeight: 600 }} >{user.name}</div>
          <div style={{ fontWeight: 400, color: "rgb(107 114 128)" }}>{user.email}</div>
        </div>
      </th>
      <td className="">
        {date.toDateString()}
      </td>
      <td className="">
        <div className="d-flex align-items-center">
          <div
            style={{
              height: "10px",
              width: "10px",
              borderRadius: "100px",
              marginRight: "5px",
              backgroundColor: randomNum > 0.5 ? 'rgb(34 197 94)' : 'rgb(239 68 68)'
            }}
            className={`rounded-full`}></div>
          Online
        </div>
      </td>
      <td className="">
        <a href="#" style={{ fontWeight: 500 }} className="underline-hover">Edit user</a>
      </td>
    </tr>
  )
}
