import { faker } from '@faker-js/faker'
import { IUser } from '../App'

export default function TableRow({ user }: {
  user: IUser
}) {
  const date = new Date(user.dob)
  const imgUrl = faker.image.urlLoremFlickr({ category: 'cats' })
  const randomNum = Math.random()
  return (
    <tr key={user._id + user.email} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        <img
          className="w-10 h-10 rounded-full"
          src={imgUrl} alt="Jese image" />
        <div className="ps-3">
          <div className="text-base font-semibold">{user.name}</div>
          <div className="font-normal text-gray-500">{user.email}</div>
        </div>
      </th>
      <td className="px-6 py-4">
        {date.toDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`h-2.5 w-2.5 rounded-full ${randomNum > 0.5 ? 'bg-green-500' : 'bg-red-500'} me-2`}></div> Online
        </div>
      </td>
      <td className="px-6 py-4">
        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
      </td>
    </tr>
  )
}
