import { useContext, useRef } from "react"
import { socket } from "../socket"
import { UserContext } from "../context/UserContext"

export default function TypeBar() {
  const { currentUser } = useContext(UserContext)
  const input = useRef()
  return (
    <form
      className=" bg-slate-300 w-full flex "
      onSubmit={(e) => {
        e.preventDefault()
        const msg = input.current.value
        socket.emit(`upload message`, {
          content: msg,
          author: currentUser,
          time: Date.now(),
        })
        input.current.value = ``
      }}
    >
      <input
        type="text"
        name="msg"
        id="msg"
        ref={input}
        placeholder="how are you today?"
        className=" grow  rounded-xl px-3 py-2 h-10 mb-3 ml-3 focus:outline-none focus:shadow-md"
      />
      <button
        type="submit"
        className="bg-teal-700 hover:bg-teal-800 text-white flex justify-center items-center w-10 h-10 rounded-full mx-3 mb-3"
      >
        <span class="material-symbols-outlined flex justify-center items-center">send</span>
      </button>
    </form>
  )
}
