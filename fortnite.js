const https = require('https');
const facebook = require('./facebook');
const fortniteURL = 'https://fortnite-api.com/v2/shop/br?language=es-419';

function cleanData(data){
    let objects = [];
    let daily = data.data.daily;
    cleanSections(daily, objects);
    let featured = data.data.featured;
    cleanSections(featured, objects);
    let specialFeatured = data.data.specialFeatured;
    cleanSections(specialFeatured, objects);
    let specialDaily = data.data.specialDaily;
    cleanSections(specialDaily, objects);
    deleteRepeated(objects);
    return objects;
}

function deleteRepeated(input){
    for(let i = 0; i < input.length; i++){
        for(let a = i+1; a < input.length; a++){
            if(input[i].name == input[a].name){
                input[a] = {};
            }
        }
    }
}

function cleanSections(input, output){
    if(input != null){
        input.entries.forEach(element => {
            element.items.forEach(element =>{
                let jsonElement = {
                    "name": element.name,
                    "image": element.images.icon,
                }
                output.push(jsonElement);
            })
        });
    }
}

module.exports= {
    execute(){
        // Falta checar que sucede si no hay imagen
        https.get(fortniteURL, res => {
            let data = [];
    
            res.on('data', chunk => {
                data.push(chunk);
            });

            res.on('end', () => {
                let objetcts = JSON.parse(Buffer.concat(data).toString());
                let cleanObjects = cleanData(objetcts);
                // console.log(cleanObjects);
                facebook.execute(cleanObjects);
            });
        });
    }
}