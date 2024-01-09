import { Config } from "../../types/configTypes";

export const config:Config={
    development:{
        mongoURI:"mongodb+srv://aswin:asdfghjkl@cluster0.i4l5qyr.mongodb.net/?retryWrites=true&w=majority",
        port:3000,
        secretKey:'asdfghjkl'
    },
    production:{
        mongoURI:"your production uri",
        port:3000,
        secretKey:'asdfghjkl'
    },
}