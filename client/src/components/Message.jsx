import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export default function Message({ obj }) {
  const { currentUser } = useContext(UserContext)
  console.log(currentUser)
  console.log(obj)
  if (obj.msgType === `info`) {
    return (
      <div className="bg-slate-500 text-white px-3 py-1 rounded-xl shadow-md self-center">
        {obj.name} entered the chat
      </div>
    )
  }
  return (
    <div
      className={` px-3 py-1 rounded-xl shadow-md w-fit ${
        currentUser === obj.author
          ? "rounded-bl-none mr-[20vw] bg-blue-500 text-white"
          : "rounded-br-none ml-[20vw] bg-white text-right self-end"
      }`}
    >
      <div>{obj.content}</div>
      <div className="text-xs text-slate-300">{obj.author}</div>
      <div>{obj.date}</div>
    </div>
  )
}
