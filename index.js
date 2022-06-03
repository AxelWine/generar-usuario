const fs = require("fs");

const importData = (dataName) => {
    let content = fs.readFileSync("data/"+dataName+".txt").toString();
    return content.split("\r\n");
};

const data = {
    username:{
        firstPart: importData("username/firstPart"),
        secondPart: importData("username/secondPart"),
        thirdPart: importData("username/thirdPart")
    },
    names: {
        males: importData("names/males"),
        females: importData("names/females")
    },
    surnames: importData("surnames")
};

const rand = (arr) => {
    return arr[Math.round(Math.random()*(arr.length-1))];
};

const newUsername = () => {
    let username = "";
    if( Math.round(Math.random()*100) < 50 ) username += rand(data.username.firstPart);
    if( Math.round(Math.random()*100) < 50 ) username += rand(data.username.secondPart);
    if( Math.round(Math.random()*100) < 50 || data.username.firstPart.includes(username) ) username += rand(data.username.thirdPart);

    return username;
};

const newGender = () => {
    return rand(["male","female"]);
};

const newNames = (gender) => {
    const genders = ["male","female"];
    if( ! gender ) gender = genders[Math.round(Math.random()*(genders.length-1))];

    let names = [];
    for( let i = 0; i < 2; i ++ ) {
        if( gender == "male" ) names.push(rand(data.names.males));
        else if( gender == "female" ) names.push(rand(data.names.females));
    };

    return names;
};

const newSurnames = () => {
    let surnames = [];
    for( let i = 0; i < 2; i ++ ) surnames.push(rand(data.surnames));

    return surnames;
};

const newUser = (required) => {
    if( ! required ) return console.error("[UserGenerator] Invalid parametters");
    if( typeof required == "string" ) required = [required];

    const validParametters = [
        "username","name","names","surname","surnames","gender","years","age","birthdate","birthday"
    ];

    for( let i = 0; i < required.length; i ++ ) {
        if( ! validParametters.includes(required[i]) ) return console.error("[UserGenerator] Invalid parametter \""+required+"\"");
    };

    let user = {};
    let gender = newGender();
    let names = newNames(gender);
    let surnames = newSurnames();
    if( required.includes("username") ) user["username"] = newUsername();
    if( required.includes("name") ) user["name"] = names[0];
    if( required.includes("names") ) user["names"] = names.join(" ");
    if( required.includes("surname") ) user["surname"] = surnames[0];
    if( required.includes("surnames") ) user["surnames"] = surnames.join(" ");
    if( required.includes("gender") ) user["gender"] = (gender == "male" ? 0 : 1);

    return user;
};

exports.newUsername = newUsername;
exports.newUser = newUser;