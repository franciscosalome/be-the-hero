const express = require('express');

const app = express();
var teste
app.get('/',(request, response) => {

    return response.json({
        evento : 'semana oministack',
        segundo : 'teste'
    });
});

app.get('/t',(request,response)=>{
    //teste = str(request);
    if(request==1){
        return response.json({
            teste1 : 'semana oministack',
            teste2 : 'teste'
        });
    }else{
        return response.json({
            passou:teste,
            tambem:'não'
        })
    };
});
app.listen(3333);
