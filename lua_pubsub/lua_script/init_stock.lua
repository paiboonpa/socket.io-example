local myJson = cjson.decode(ARGV[1])
for key,value in pairs(myJson) do
    redis.call('set', key, value)
end
  
return 1