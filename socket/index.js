const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000'
    }
});
let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({userId, socketId});
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId)=>{
    return users.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {

    //when connected
    console.log("A user connected");
//   get userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUser", users);
    });

    //send and get message
    socket.on("sendMessage", ({senderId,recieverId,text}) =>{
        const user = getUser(recieverId);
        io.to(user.socketId).emit("getMessage",{
            userId,text
        });
    });


    //when disconnected
    socket.on("disconnect", () => {
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUser", users);
    });

});
