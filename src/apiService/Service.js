import axios from 'axios'

export default {
    getData: () =>
    axios({
        'method':'GET',
        'url':'https://example.com/query',
        'headers': {
            'content-type':'application/octet-stream',
        },
        'params': {
            'search':'parameter',
        },
    })
}