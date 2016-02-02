import nlpData from 'nlp-data'
var fs = require('fs')

export namespace clone {

    export class TweetsClone {


        private _isStop = false
        private _isExecuting = false
        private _stoppped: { () }
        private _size = 15000
        constructor() { }

        start(param: TweetsCloneParam) {

            if (this._isExecuting) {
                throw new Error("executing!!")
            }

            this._isExecuting = true
            this._isStop = false

            const client = nlpData.ESClientFactory.Create(param.es_param)
            let cnt = 0
            let index = 0

            const cb = (error, response) => {
                //stop
                if (this._isStop) {
                    this._isExecuting = false
                    if (this._stoppped) {
                        this._stoppped()
                    }
                    return
                }
                //callback
                if (param.callBack) {
                    param.callBack(error, response)
                }
                //error
                if (error) {
                    return
                }
                
                //count up and log
                index += 1
                cnt += response.hits.hits.length
                const persentage = cnt / response.hits.total * 100
                console.log("save " + cnt + "/" + response.hits.total + " items [" + persentage + "% done]")

                if (cnt <= 9100000) {
                    client.scroll({
                        scrollId: response._scroll_id,
                        scroll: '3m',
                        size: this._size,
                    }, cb)
                } else {
  
                    // collect items
                    const items = response.hits.hits.map((hit) => {
                        return hit._source
                    })

                    // save as file
                    const fileName = param.outDir + "tweets." + index + ".json"
                    const text = JSON.stringify({ items })
                    fs.writeFile(fileName, text, (err) => {
                        console.log(err)
                    }, () => {
                        if (response.hits.total > cnt) {
                            // now we can call scroll over and over
                            client.scroll({
                                scrollId: response._scroll_id,
                                scroll: '3m',
                                size: this._size,
                            }, cb)

                        } else {
                            console.log('completed to save all items.')
                        }
                    })
                }
            }

            client.search({
                index: 'twdata2',
                scroll: '3m',
                search_type: 'scan',
                size: this._size,
                body: {
                    query: {
                        match_all: {}
                    }
                }
            }, (error, response) => {
                if (error) {
                    console.log(error)
                    return
                }

                client.scroll({
                    scrollId: response._scroll_id,
                    scroll: '3m',
                    size: this._size,
                }, cb)
            })
        }
        stop(stopped: { () }) {
            this._stoppped = stopped
            this._isStop = true
        }

    }
    export interface TweetsCloneParam {
        outDir: string,
        callBack?: { (error, respornse) },
        es_param: nlpData.Models.IElasticSearchClientParam
    }


}

export default clone






