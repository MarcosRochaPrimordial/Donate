import * as mongoose from 'mongoose';

export const StorySchema = new mongoose.Schema({
    hospital: {type: String, required: [true, 'Informe o hospital em que se encontra']},
    room: {type: String, required: [true, 'Informe a sala do hospital']},
    hospBed: {type: String, required: [true, 'Informe o leito da sala']},
    presentationText: {type: String}
});

export const Story = mongoose.model('Story', StorySchema);
export default Story;