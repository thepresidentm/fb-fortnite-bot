const urllib = require('urllib');
const keys = require('./keys');
const facebookURL = 'https://graph.facebook.com/v12.0/';



function post(array) {
    let output = '[';
    array.forEach(element => {
        output += ',{"media_fbid":"' + element + '"}';
    });
    output = output.replace(',', '');
    //console.log(encodeURIComponent(output + ']'));
    console.log(output + ']');
}



module.exports = {
    execute(array) {
        // Es necesario quitar los elementos vacios antes de nada
        let data = [];
        let length = array.length;
        let completed = 0;
        for(var i = 0; i < length; i ++){
            if (array[i].name != undefined) {
                urllib.request(facebookURL + keys.page + '/photos?url=' + array[i].image + '&caption=' + encodeURIComponent(array[i].name) + '&published=false&access_token=' + keys.token, { method: 'POST' }).then(function (result) {
                    data.push(JSON.parse(result.data).id);
                    completed++;
                    if(completed == length - 1){
                        post(data);
                    }
                })
            }else{
                completed++;
            }
        }
    }

}