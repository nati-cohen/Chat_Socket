import { useState } from "react"
import { socket } from "../socket"
import Message from "../components/Message"
import TypeBar from "../components/TypeBar"
export default function Chat({ messages }) {
  return (
    <div className="grid grid-rows-[1fr,auto] w-screen h-screen">
      <div className=" flex justify-start p-3 bg-slate-300 flex-col gap-3 overflow-scroll">
        {messages.map((msg) => (
          <Message obj={msg} key={msg + `key`} />
        ))}
      </div>

      <TypeBar />
    </div>
  )
}
