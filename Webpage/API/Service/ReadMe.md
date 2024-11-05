### Purpose of the functions in API/Service is a simple cache. 
You can either load everything on startup which is not recommended as it will cost u some load time. 

However, u will have everything in cache afterwards which might help you later. I would recommend loading the entity that u need into cache. 

Using it then as u need.
 If u update  the entities table (change a row or delete it), then u always **need to clear and refresh the cache !!**

Some Entities do not have a Cache as we think that they will get updated too often which might not be useful.