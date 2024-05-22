class Badges {
    constructor(name, description, usr_list) {
        this.name = name;
        this.description = description;
        this.usr_list = usr_list;
    }
}

class Person {
    constructor(name, email, elo1, elo2) {
        this.name = name;
        this.email = email;
        this.elo1 = elo1;
        this.elo2 = elo2;
    }
}

export default {Person, Badges};