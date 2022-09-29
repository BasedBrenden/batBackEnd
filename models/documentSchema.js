const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
*   -AbilitySchema
*   -TypesSchema
*
*
*
*/

const PokemonTypeSchema = new Schema({
    name: {type: String},

})

const AbilitySchema = new Schema({
    name: {type: String},
    effect: {type: String}
})

const PokemonSchema = new Schema({
    pokeID: {type: Number},
    pokeImage: {type: String},
    pokeName: {type: String},
    pokeAbility: [AbilitySchema],
    pokeTypes: [PokemonTypeSchema]
})

const UserSettingsSchema = new Schema({
    DarkMode: {type: Boolean}
})

const AccountInfo = new Schema({
    Username: {type: String},
    Password: {type: String}
})

const UserSchema = new Schema({
    Username: {type: String},
    Team: [PokemonSchema],
    Settings: [UserSettingsSchema]
})

const userSchema = mongoose.model("User",UserSchema);

module.exports =userSchema;