import { UserSchema } from '../../models/user';

export const UserQuery = {
    async getUser() {
        return await UserSchema.findOne(); 
    }
}