const express = require('express');
const userDBC = require('./usersDBC');
const router = express.Router();

router.get('/getUsers', async (req, res)=>
{
    let res_get_users = 
    {
        status_code : 500,
        users : [] 
    };

    try
    {
        const rows = await userDBC.getUsers();
        res_get_users.status_code = 200;
        if(rows.length > 0)
        {
            rows.forEach((user)=>
            {
                res_get_users.users.push
                ({
                    id : user.id,
                    name : user.name,
                    password : user.password,
                });
            });
        }
        else
        {
            console.log('사용자 없음');
        }
    }
    catch(error)
    {
        console.log(error.message);
    }
    finally
    {

        //응답 
        //res.json(res_get_users);
        var result = '';

        for(var i=0; i < res_get_users.users.length; i++)
        {
        result += res_get_users.users[i].id;
        result += res_get_users.users[i].name;
        result += res_get_users.users[i].password;
        
        result += "<br>";
        }

        res.send(result);
    }
});


module.exports = router;