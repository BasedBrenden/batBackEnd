const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
    pokeID: {type: Number},
    pokeImage: {type: String},
    PokeName: {type: String}           
})

const UserSettingsSchema = new Schema({
    DarkMode: {type: Boolean}
})

const UserSchema = new Schema({
    Username: {type: String},
    Password: {type: String},
    Team: [PokemonSchema],
    Settings: [UserSettingsSchema]

})


module.exports = mongoose.model('User',UserSchema);