/**
 * List Accounts
 *
 * @param {Object} options See https://docs.cloud.coinbase.com/advanced-trade-api/reference/retailbrokerageapi_getaccounts
 * @return {Object} Get a list of authenticated accounts for the current user.
 */
function listAccounts(options){
  let resource = '/accounts', query = options ? query_(options) : null;
  return fetch_get_(resource,query);
}

/**
 * Get Account
 *
 * @param {string} account_uuid The account's UUID.
 * @return {Object} Get a list of information about an account, given an account UUID.
 */
function getAccount(account_uuid){
  if(!account_uuid){ throw 'account_uuid is required'};
  return fetch_get_(`/accounts/${account_uuid}`);
}

/**
 * Create Order
 *
 * @param {string} product_id The product this order was created for e.g. 'BTC-USD'
 * @param {string} side Possible values: [UNKNOWN_ORDER_SIDE, BUY, SELL]. U can user ORDER_SIDE enum.
 * @param {Object} order_configuration See https://docs.cloud.coinbase.com/advanced-trade-api/reference/retailbrokerageapi_postorder
 * @return {Object} Create an order with a specified product_id (asset-pair), side (buy/sell), etc.
 */
function createOrder(product_id,side=ORDER_SIDE.UNKNOWN,order_configuration){
  if( !product_id ){ throw 'product_id is required'};
  let body = { product_id, client_order_id: Utilities.getUuid(), side, order_configuration};
  return fetch_post_('/orders',body);
}

/**
 * Cancel Orders
 *
 * @param {string[]} order_ids The IDs of orders cancel requests should be initiated for
 * @return {Object[]} Initiate cancel requests for one or more orders.
 */
function cancelOrders(order_ids=[]){
  return fetch_post_('/orders/batch_cancel',{order_ids});
}

/**
 * List Orders
 *
 * @param {Object} options See https://docs.cloud.coinbase.com/advanced-trade-api/reference/retailbrokerageapi_gethistoricalorders
 * @return {Object} Get a list of orders filtered by optional query parameters (product_id, order_status, etc).
 */
function listOrders(options={limit:100}){
  if(!options.limit){ throw 'options.limit is required'; }
  let resource = '/orders/historical/batch', query = options ? query_(options) : null;
  return fetch_get_(resource,query);
}

/**
 * List Fills
 *
 * @param {Object} options See https://docs.cloud.coinbase.com/advanced-trade-api/reference/retailbrokerageapi_getfills
 * @return {Object} Get a list of fills filtered by optional query parameters (product_id, order_id, etc).
 */
function listFills(options){
  let resource = '/orders/historical/fills', query = options ? query_(options) : null;
  return fetch_get_(resource,query);
}

/**
 * Get Order
 *
 * @param {string} order_id The ID of the order to retrieve.
 * @return {Object} Get a single order by order ID.
 */
function getOrder(order_id){
  if(!order_id){ throw 'order_id is required'};
  return fetch_get_(`/orders/historical/${order_id}`);
}

/**
 * List Products
 *
 * @param {Object} options See https://docs.cloud.coinbase.com/advanced-trade-api/reference/retailbrokerageapi_getproducts
 * @return {Object[]} Get a list of the available currency pairs for trading.
 */
function listProducts(options){
  let resource = '/products', query = options ? query_(options) : null;
  return fetch_get_(resource,query);
}

/**
 * Get Product
 *
 * @param {string} product_id The trading pair to get information for.
 * @return {Object} Get information on a single product by product ID.
 */
function getProduct(product_id){
  if(!product_id){ throw 'product_id is required'};
  return fetch_get_(`/products/${product_id}`);
}

/**
 * Get Product Candles
 *
 * @param {string} product_id The trading pair.
 * @param {string} start Timestamp for starting range of aggregations, in UNIX time.
 * @param {string} end Timestamp for ending range of aggregations, in UNIX time.
 * @param {string} granularity The time slice value for each candle.
 * @return {Object[]} Get rates for a single product by product ID, grouped in buckets.
 */
function getProductCandles(product_id,start,end,granularity){
  if(!product_id || !start || !end || !granularity){ throw 'missing required parameters'; }
  let resource = `/products/${product_id}/candles`, query = query_({start,end,granularity});
  try{
    return fetch_get_(resource,query);
  } catch(e){
    Logger.log('This function may not work correctly '.concat(e.message));
  }
}

/**
 * Get Market Trades
 *
 * @param {string} product_id The trading pair, i.e., 'BTC-USD'.
 * @param {number} limit Number of trades to return.
 * @return {Object} Get snapshot information, by product ID, about the last trades (ticks), best bid/ask, and 24h volume.
 */
function getMarketTrades(product_id='BTC-USD',limit=62){ return fetch_get_(`/products/${product_id}/ticker`,query_({limit})); }

/**
 * Get Transactions Summary
 *
 * @param {Object} options See https://docs.cloud.coinbase.com/advanced-trade-api/reference/retailbrokerageapi_gettransactionsummary
 * @return {Object} Get a summary of transactions with fee tiers, total volume, and fees.
 */
function getTransactionsSummary(options){
  let resource = '/transaction_summary', query = options ? query_(options) : null;
  return fetch_get_(resource,query);
}
