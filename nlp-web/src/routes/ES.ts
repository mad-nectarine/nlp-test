import * as express from 'express';
import * as fs from 'fs'
import * as path from 'path'
import { createLocation } from 'history';
import * as App from '../apps/EsApp'
import EApp from '../app_endpoints/EsApp.server'
import nlpData from 'nlp-data'
import * as ReactDom from 'react-dom/server';
import AppConfig from '../config/appconfig'

const router = express.Router();
const maxSearchCount = 100
const getEsParam = () => {
    let appconfig = AppConfig.get()
    let es_param = {
        Host: appconfig.es.host,
        Port: appconfig.es.port,
        Index: appconfig.es.index,
        Auth : null
    }
    if(appconfig.es.auth){
        es_param.Auth = {
            name : appconfig.es.auth.name,
            password: appconfig.es.auth.password
        }
    }
    return es_param
}
const getIndexName = () => {
    return AppConfig.get().es.index
}
const createTweetsProxy = () => {
    return new nlpData.Tweets.Tweets(getEsParam(),getIndexName())
}
const createConfigProxy = () => {
    return new nlpData.Config.Config(getEsParam(),getIndexName())
}


//View
router.get('/view/*', function(req: express.Request, res: express.Response, next: Function) {

    let isDevelopment = process.env.NODE_ENV === 'development'
    var ReduxRouter = require('redux-router/server');
    let initialState = {
        es_search: {}
    }
    let store = App.CreateServerStore(initialState, isDevelopment)
    const location = createLocation(req.url)
    store.dispatch(ReduxRouter.match(location, (error, redirectLocation) => {
        if (error) {
            // handle error
        } else if (redirectLocation) {
            // handle redirect
        } else {
            // Everything is fine, render like normal
            //res.render('EsApp', { title: 'Elastic Search', store, isDevelopment });
            let component = new EApp.EsApp({ 
                title: 'Elastic Search', 
                store, 
                isDevelopment })
            let html = ReactDom.renderToString(component.render());
            res.end(html)
        }
    }))
})

//Data
router.post('/search', function(req: express.Request, res: express.Response, next: Function) {
    //validation
    if (!req.body.searchText) {
        res.json({ isSuccess: false, message: '検索ワードを入力してください.' })
        return
    }
    
    const searchText = req.body.searchText == null ? "" : req.body.searchText  
    const proxy = createTweetsProxy()
    const start = new Date()
    proxy.Search(searchText, maxSearchCount).then(x => {
        const end = new Date()
        const span = (end.getTime() - start.getTime()) / 1000;
        
        res.json({ 
            isSuccess: true,
            items: x.Data,
            totalCount: x.TotalCount,
            searchSeconds: span
        })
    }).catch(x => {
        res.json({ 
            isSuccess: true,
            message: x.Error.message
        })
    })
})

router.post('/count', function(req: express.Request, res: express.Response, next: Function) {
    
    const searchText = req.body.searchText == null ? "" : req.body.searchText  
    const proxy = createTweetsProxy()
    proxy.Count(searchText).then(x => {
        res.json({ 
            isSuccess: true,
            count: x.Data
        })
    }).catch(x => {
        res.json({ 
            isSuccess: true,
            message: x.Error.message
        })
    })
})

router.post('/info/createat', function(req: express.Request, res: express.Response, next: Function) {
      
    const proxy = createTweetsProxy()
    proxy.InformationOfCreateAt().then(x => {
        res.json({ 
            isSuccess: true,
            info: x.Data
        })
    }).catch(x => {
        res.json({ 
            isSuccess: true,
            message: x.Error.message
        })
    })
})

router.post('/info/id', function(req: express.Request, res: express.Response, next: Function) {
      
    const proxy = createTweetsProxy()
    proxy.InformationOfId().then(x => {
        res.json({ 
            isSuccess: true,
            info: x.Data
        })
    }).catch(x => {
        res.json({ 
            isSuccess: true,
            message: x.Error.message
        })
    })
})

router.post('/conf/list', function(req: express.Request, res: express.Response, next: Function) {  
    const proxy = createConfigProxy()
    proxy.All().then(x => {
        res.json({ 
            isSuccess: true,
            items: x.Data,
            totalCount: x.TotalCount
        })
    }).catch(x => {
        res.json({ 
            isSuccess: true,
            message: x.Error.message
        })
    })
})

router.post('/conf/save', function(req: express.Request, res: express.Response, next: Function) {
    //validation
    if (!req.body.input || !req.body.input.key || !req.body.input.value) {
        res.json({ isSuccess: false, message: '登録内容を入力してください.' })
        return
    }
    const proxy = createConfigProxy()
    const input = {
        key : req.body.input.key,
        value : req.body.input.value,
    }
    proxy.Save(input).then(x => {
        res.json({ 
            isSuccess: true
        })
    }).catch(x => {
        res.json({ 
            isSuccess: true,
            message: x.Error.message
        })
    })
})

router.post('/conf/delete', function(req: express.Request, res: express.Response, next: Function) {
    //validation
    if (!req.body.key) {
        res.json({ isSuccess: false, message: 'Keyを指定してください.' })
        return
    }
    const proxy = createConfigProxy()
    proxy.Delete(req.body.key).then(x => {
        res.json({ 
            isSuccess: true
        })
    }).catch(x => {
        res.json({ 
            isSuccess: true,
            message: x.Error.message
        })
    })
})

router.get('/info/log', function(req: express.Request, res: express.Response, next: Function) {
    
    const _onError = (error: Error) => {
        res.json({
            isSuccess: false,
            error : error.message
        })
    }
    fs.readdir("/opt/app_crawler/logs",(error,files) => {
        if(error){
            _onError(error)
            return
        }
        let file = null
        let date = null
        files.forEach(x => {
            let spl = x.split("-")
            let cdate = new Date(
                    Number.parseInt(spl[0]),
                    Number.parseInt(spl[1]) - 1,
                    Number.parseInt(spl[2]),
                    Number.parseInt(spl[3].split(".")[0]),
                    0,0,0)  
            if(file == null){
                file = x
                date = cdate
            } else if(date < cdate){
                file = x
                date = cdate
            }
        })
        fs.readFile("/opt/app_crawler/logs/" + file,(error,data) => {
            if(error){
                _onError(error)
                return
            }
            let dataList = data.toString() //buffer to string
                               .split("\n") //text to lines
                               .filter(x => x.trim() != "") //filter empty line
                               .slice(-300) //get latest 300 lines
                               .reverse() //sort latest to top 
            res.json({
                isSuccess : true,
                fileName: file,
                data: dataList
            })
        })
    })
})

export default router;
module.exports = router;
