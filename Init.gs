// endpoint
const ENDPOINT_ROOT = 'https://api.coinbase.com';

// fetch headers
const ACCEPT_HEADER = 'application/json';
const ACCESS_KEY_HEADER = 'CB-ACCESS-KEY';
const TIMESTAMP_HEADER = 'CB-ACCESS-TIMESTAMP';
const SIGNATURE_HEADER = 'CB-ACCESS-SIGN';

// path
const path_ = (res) => '/api/v3/brokerage'.concat(res);

// order side
const ORDER_SIDE = {
  UNKNOWN: 'UNKNOWN_ORDER_SIDE', BUY: 'BUY', SELL: 'SELL'
}

// granularity enum
const GRANULARITY = {
  UNKNOWN: 'UNKNOWN_GRANULARITY',
  ONE_M: 'ONE_MINUTE', FIVE_M: 'FIVE_MINUTE', FIFTEEN_M: 'FIFTEEN_MINUTE', THIRTY_M: 'THIRTY_MINUTE',
  ONE_H: 'ONE_HOUR', TWO_H: 'TWO_HOUR', SIX_H: 'SIX_HOUR',
  ONE_D: 'ONE_DAY'
}

function init(api_key,secret){
  this.api_key = api_key;
  this.secret = secret;
}
