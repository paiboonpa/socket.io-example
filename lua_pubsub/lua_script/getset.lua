local productStockLeft = tonumber( redis.call('get', KEYS[1]) )
local amount = tonumber( ARGV[1] )
if productStockLeft > 0 then
    productStockLeft = productStockLeft - amount
else
    return redis.error_reply('Out of stock')
end

redis.call('set', KEYS[1], productStockLeft)
return productStockLeft