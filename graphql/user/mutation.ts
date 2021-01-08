import bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server';
import { UserSchema } from '../../models/user';
import { UserInput } from '../../types';
import { isEmptyValue } from '../../helpers/emptyValue';

export const UserMutation = {
    async registration (_, args: { regData: UserInput }) {
        const { password, username } = args.regData;
        
        if (!isEmptyValue(username) && username.length > 3) {
            throw new UserInputError('Username empty or too short');
        }

        if (!isEmptyValue(password)) {
            throw new UserInputError('Password is required');
        }
        
        const alreadyExist = await UserSchema.findOne({ username });

        if (alreadyExist) {
            throw new UserInputError('User already exist');
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = new UserSchema({
            username,
            password: passwordHash,
            createdAt: new Date().toISOString,
        });

        const data = await user.save();

        const payload = {
            id: data._id,
            username,
        }

        const { token, refreshToken } = UserSchema.createTokens(payload);

        await UserSchema.findByIdAndUpdate(data._id, { token,  refreshToken});

        return await UserSchema.findById(data._id );
    },

    async logout(_, { id }) {
        await UserSchema.findByIdAndUpdate({ _id: id }, { token: null, refreshToken: null });
        return true;
    },

    async login(_, args) {
        const { password, username } = args.loginData;

        const user = await UserSchema.findOne({ username });

        if (!user) {
            throw new UserInputError('User not found');
        }

        const check = await user.comparePassword(password);

        if (!check) {
            throw new UserInputError('Password incorrect');
        }

        const { token, refreshToken } = UserSchema.createTokens({
            id: user._id,
            username: user.username,
        });

        console.log(user.id, user._id, token);

        await UserSchema.findByIdAndUpdate( user.id , { token, refreshToken });

        return await UserSchema.findById(user.id);
    }
}