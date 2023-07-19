const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const app = express()
const cors = require(`cors`)
app.use(cors())
const httpServer = createServer(app)

const io = new Server(httpServer, {
  /* options */
})

io.on("connection", (socket) => {
  socket.on(`disconnect`, (reason) => {
    console.log(reason)
  })
  socket.on(`upload message`, (args) => {
    console.log(args.content)
    io.emit(`download message`, {
      author: args.author,
      content: args.content,
      msgType: `message`,
    })
  })
  socket.on(`upload new user`, (args) => {
    console.log(args)
    io.emit(`download new user`, {
      name: args.name,
      msgType: `info`,
    })
  })
})

httpServer.listen(4000,()=>{console.log("Server is up")});

