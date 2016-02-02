import nlpData from 'nlp-data'
var fs = require('fs')
import clone from './src/clone.tweets'

const es_param = {
    Host: "ip.or.host",
    Port: 9200,
}
const outDir = "./.clone_data/"

let ct = new clone.TweetsClone()
ct.start({
    es_param,
    outDir,
    callBack : (error,response) =>{
        
    }
})
