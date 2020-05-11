const {sequelize} = require('../server');
const Sequelize = require('sequelize');
const Enrollments = sequelize.define('enrollments', {
	user_id : {
        type: Sequelize.INTEGER,
        allowNull:false
	},
	phrase: Sequelize.TEXT,
    author_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    server_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    last_incident: {
        type:Sequelize.DATE
    },
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
},{
    indexes:[
        {unique: false, fields:['user_id']},
        {unique:true, fields:['user_id', 'phrase', 'server_id']}
    ]
});

const createEnrollment = async function(server_id, author_id, user_id, trackPhrase){
    let enrollment = await Enrollments.findOne({where: {user_id: user_id, phrase: trackPhrase, server_id:server_id}});
    if(enrollment){
        return [false, 'that phrase is already being tracked for that user', enrollment];
    }

    enrollment = await Enrollments.create({
        user_id: user_id,
        phrase: trackPhrase,
        author_id: author_id,
        server_id:server_id
    });
    return[true, 'enrollment created!', enrollment];
}

const updateEnrollment = async function(server_id,user_id, message){
    let enrollments = await Enrollments.findAll({where: {user_id: user_id, server_id: server_id}});
    enrollments.map(enrollment => {
        let matches = message.match(enrollment.phrase);
        if(matches){
            console.log('phrase: '+ enrollment.phrase);
            let count = occurrences(message, enrollment.phrase, false);
            console.log(count);
            if(count > 0 ){
                console.log(`updating enrollment with id: ${enrollment.id}`)
                let rowsAffected = Enrollments.update({usage_count: enrollment.usage_count + count, last_incident: new Date()}, {where:{id:enrollment.id}});
            }
        }
    });
}

const getEnrollments = async function(server_id,user_id, phrase){
    if(phrase){
        console.log('phrase to check status: '+ phrase);
        return await Enrollments.findAll({where: {user_id: user_id, server_id: server_id, phrase:phrase}});
    }else{
        console.log('looking for all phrases for user');
        return await await Enrollments.findAll({where: {user_id: user_id, server_id: server_id}});
    }
}

function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}


module.exports = {Enrollments, createEnrollment, updateEnrollment, getEnrollments};