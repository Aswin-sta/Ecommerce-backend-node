import { Server} from 'socket.io';
import http from 'http'
const initializeSocket=(server:http.Server)=>{
    const io=new Server(server,{
        cors:{
          origin:'http://localhost:8080'
        }
      })
    
    
    //   io.on('connection', (socket) => {
    //     console.log('a user connected');
      
    //     socket.emit('event emitted',"hellooooo")
      
    //     socket.on('button clicked',()=>{
    //       console.log("Request from front end");
    //       socket.emit("reponse from backend","hello from backend")
    //       console.log("user disconected");
    //     })
    //     socket.on('disconnect',()=>{
    //       console.log("user disconected");
    //     })
      
    //   });
      
   return io;   
      
}

export  default initializeSocket
