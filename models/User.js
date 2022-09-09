const fs = require ('fs');

const User = {
    fileName: './data/users.json',

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function (){
        let allUsers = this.findAll ();     /* obtengo todos los usuarios */
        let lastUser = allUsers.pop();      /* Me quedo con el ultimo usuario */
        if (lastUser){
            return lastUser.id + 1;
        }
        /* Si no existe ningun usuario */
        return 1;   
    },

    findAll: function () {
        return this.getData();
    },

    findById : function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find (oneUser => oneUser.id === id);
        return userFound;
    },

    findByTag: function (tag, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find (oneUser => oneUser[tag] === text);
        return userFound;
    },

    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push (newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
        
    },

    delete : function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter (oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }

}



module.exports = User;