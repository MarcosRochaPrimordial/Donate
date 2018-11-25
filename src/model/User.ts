import * as mongoose from 'mongoose';

import { StorySchema } from './Story';

export const UserSchema = new mongoose.Schema({
    completeName: {type: String, required: [true, 'Informe o nome completo']},
    email: {type: String, required: [true, 'Informe o email']},
    password: {type: String, required: [true, 'Informe a senha']},
    cep: {type: String, required: [true, 'Informe o CEP'], size: 8},
    street: {type: String, required: [true, 'Informe a Rua']},
    neighborhood: {type: String, required: [true, 'Informe o bairro']},
    state: {type: String, required: [true, 'Informe o estado']},
    country: {type: String, required: [true, 'Informe o país']},
    isDonor: {type: Boolean, required: [true, 'Escolha seu perfil']},
    Story: StorySchema
});

export const User = mongoose.model('User', UserSchema);
export default User;