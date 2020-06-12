local myJson = cjson.decode(ARGV[1])
local arrayForHmset = {}
for key,value in pairs(myJson) do
    redis.call('set', key, value)
    table.insert(arrayForHmset, key)
    table.insert(arrayForHmset, value)
end

return redis.call('hmset','allProducts', unpack(arrayForHmset))