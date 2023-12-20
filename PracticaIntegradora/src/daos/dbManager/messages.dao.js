import { messageModel } from "../../Models/chat.js";

class MessageDao {
    //async addMessage(user, newMessage)
    async addMessage(newMessage){
        try{
            //primero pruebo con un solo parametro
            await messageModel.create(newMessage)
            // await messageModel.create(user, newMessage)
        } catch (error){
            console.log(error)
        }
    }
}

export default new MessageDao()