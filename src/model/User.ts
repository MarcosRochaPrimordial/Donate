import * as mongoose from 'mongoose';

export const UserScheema = new mongoose.Schema({
    completeName: {type: String, required: [true, 'Informe o nome completo']},
    email: {type: String, required: [true, 'Informe o email']},
    password: {type: String, required: [true, 'Informe a senha']},
    cep: {type: String, required: [true, 'Informe o CEP'], max: 8},
    street: {type: String, required: [true, 'Informe a rua']},
    state: {type: String, required: [true, 'Informe o estado']},
    country: {type: String, required: [true, 'Informe o país']},
    hospital: {type: String},
    room: {type: String},
    hospBed: {type: String},
    isDonor: {type: Boolean, required: [true, 'Escolha o perfil']}
});

export const User = mongoose.model('User', UserScheema);
export default User;