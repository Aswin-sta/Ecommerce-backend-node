import { Server} from 'socket.io';
import http from 'http'
const initializeSocket=(server:http.Server)=>{
    const io=new Server(server,{
        cors:{
          origin:'http://localhost:8080'
        }
      })
    
    
   
      
   return io;   
      
}

export  default initializeSocket
