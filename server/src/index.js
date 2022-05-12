const express = require('express');
const server = require('./server');


(function(expressInstance){
    const PORT = 5200;
    expressInstance.listen(PORT, ()=>{
        console.log(`server running on port ${PORT}`)
    })
})(server)