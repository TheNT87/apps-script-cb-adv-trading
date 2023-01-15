// convert sha bytes to Hex
const toHex_ = b => { let v = ( b < 0 ? b + 256 : b).toString(16) ;return v.length == 1 ? '0' + v : v; };
// build querystring
const query_ = query => Object.keys(query).map( k => `${k}=${query[k]}`).join('&');

// create signature
function signature_(timestamp,method,path,body=''){
  if(!this.secret){ throw 'please init the API with your secret'; }
  let to_sign = Object.keys(arguments).sort().map( k => arguments[k]).join('');
  return Utilities.computeHmacSha256Signature(to_sign,this.secret).map(toHex_).join('');
}

// get resource
function fetch_get_(resource,query){
  let path = path_(resource), timestamp = Math.floor(Date.now() / 1000).toString(), url = `${ENDPOINT_ROOT}${path}${query ? '?' + query : ''}`;
  if(!this.api_key){ throw 'please init the API with your api_key'; }
  let fetch = UrlFetchApp.fetch(url,{
    method: 'get', headers: {
      [ACCESS_KEY_HEADER]: this.api_key, [TIMESTAMP_HEADER]: timestamp, [SIGNATURE_HEADER]: signature_(timestamp,'GET',path),'Accept': ACCEPT_HEADER
    }
  });
  return JSON.parse(fetch.getContentText());
}

// post resource
function fetch_post_(resource,body){
  let path = path_(resource), timestamp = Math.floor(Date.now() / 1000).toString(), url = `${ENDPOINT_ROOT}${path}`;
  if(!this.api_key){ throw 'please init the API with your api_key'; }
  let payload = JSON.stringify(body)
  let fetch = UrlFetchApp.fetch(url,{
    method: 'post', contentType: ACCEPT_HEADER, headers: {
      [ACCESS_KEY_HEADER]: this.api_key, [TIMESTAMP_HEADER]: timestamp, [SIGNATURE_HEADER]: signature_(timestamp,'POST',path, payload),'Accept': ACCEPT_HEADER
    }, payload
  });
  return JSON.parse(fetch.getContentText());
}
