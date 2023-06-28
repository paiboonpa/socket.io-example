local myVar = 1
local myTable = {}
local myArray = {1,2,3}
table.insert(myArray , 4)
local myObject = {key1 = 1, key2 = 2}
myObject['key3'] = '333'

print(myVar)
print(myTable[1])
print(myArray[2])
print(myObject['key3'])

for j=1, #myArray ,1 do
   print(myArray[j])
  end

for key,value in pairs(myObject) do
  print(myObject[key])
end

local myFunc =  function(p1, p2,p3,p4) 
  print(p1,p2,p3,p4)
end 
myFunc(1,2,3,4)
myFunc(table.unpack(myArray))