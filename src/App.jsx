import { useEffect, useState } from "react"

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    // when socket connects to websocket server then 
    // log the msg and setSocket object/state
    socket.onopen = () => {
      console.log("Connected!!!!")
      setSocket(socket);
    }
    // below lines will handle the msg when websocket server sends
    // msg to client/browser in this case
    socket.onmessage = (message) => {
      console.log("Received message:", message.data);
      setMessages([...messages, message.data]);
    }
    return ()=>{
      socket.close();
    }
  }, [])

  if (!socket) {
    return <div>
      Connecting to socket server....
    </div>
  }
  return (
    <div>
      <input onChange={(e) => { setMessage(e.target.value) }}></input>
      <button onClick={() => { socket.send(message) }}>Send Message</button>
      {/* <div>{messages.map(function (msg) {return <Message msg={msg}></Message>})}</div> */}
    </div>
  )
}

function Message({ msg }) {
  return <div>
    {msg}
  </div>
}
export default App
