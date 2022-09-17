## for connection in react ##
npm install socket.io-client

import {io} from "socket.io-client";

const [socket , setSocket] = useState(null);

useEffect(()=>{
    setSocket(io("ws://localhost:8900"))
});

// alternate way of connection
const socket = useRef(io("ws://localhost:8900"));