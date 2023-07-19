import React, { useState, useEffect } from "react"
import { socket } from "./socket"
import Chat from "./pages/Chat"
import { UserContext } from "./context/UserContext"
import LoginForm from "./pages/LoginForm"

export default function App() {
  const [currentUser, setCurrentUser] = useState(``)
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on(`download new user`, (args) => {
      setMessages((prev) => [...prev, args])
    })
    socket.on("download message", (args) => {
      setMessages((prev) => [...prev, args])
    })

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
    }
  }, [])

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <span
        onClick={() => {
          setCurrentUser(``)
        }}
        className={`absolute top-3 right-3 p-1 rounded-full cursor-pointer ${
          currentUser ? `bg-slate-300` : `bg-teal-800`
        }`}
      >
        <span
          class={`material-symbols-outlined filled ${
            currentUser ? (isConnected ? `text-black` : `text-red-500`) : `text-transparent`
          }`}
        >
          account_circle
        </span>
        {}
      </span>
      {currentUser ? <Chat messages={messages} /> : <LoginForm />}
    </UserContext.Provider>
  )
}
