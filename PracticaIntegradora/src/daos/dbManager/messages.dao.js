import { messageModel } from "../../Models/chat.js";

class MessageDao {
    
    async addMessage(newMessage){
        try{
            await messageModel.create(newMessage)

        } catch (error){
            console.log(error)
        }
    }
}

export default new MessageDao()