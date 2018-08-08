const DB = require('./db');

module.exports = {

    addWork: async (name)=> {


        let getWorkdata = await DB.find('work_table', {user: name});

        let relUser = await DB.update('users_table', {user: name}, { work: getWorkdata });

        try{
            if(relUser){
                return;
            }
        }catch(err){
            console.log(err);
            return;
        }

    }

}