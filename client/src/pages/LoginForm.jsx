import { useContext, useRef } from "react"
import { UserContext } from "../context/UserContext"
import { socket } from "../socket"

export default function LoginForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const input = useRef()
  return (
    <div className="w-screen h-screen flex bg-teal-800 text-white items-center justify-center">
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          setCurrentUser(input.current.value)
          socket.emit(`upload new user`, {
            name: input.current.value,
          })
        }}
      >
        <input
          className=" px-2 py-1 rounded-xl text-teal-950"
          type="text"
          name="userName"
          id="userName"
          placeholder="name"
          ref={input}
        />
        <button type="submit" className="font-bold bg-black rounded-xl px-2 py-1 hover:bg-teal-950">
          login
        </button>
      </form>
    </div>
  )
}
