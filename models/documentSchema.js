const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
    pokeID: {type: Number},
    pokeImage: {type: String},
    pokeName: {type: String}           
})

const UserSettingsSchema = new Schema({
    DarkMode: {type: Boolean},
    Callsign: {type: String},
    Phrase: {type: String}
})



const UserSchema = new Schema({
    Team: [PokemonSchema],
    Settings: [UserSettingsSchema]
})

const userSchema = mongoose.model("User",UserSchema);

module.exports =userSchema;