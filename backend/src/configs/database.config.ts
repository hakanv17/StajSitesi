import { ConnectOptions,connect } from "mongoose";

export const dbConnect = () => {
    connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
        () => console.log("connected to database successfully"),
        (error) => console.log(error)
    )
}