# 2021_2_Good_Vibes
Ozon by Good Vibes team
https://goodvibesazot.tk/

Наша команда:  
Лида Ленкова        https://github.com/lida24    
Сулейман Кадыров    https://github.com/KadyrovSuleyman  
Сергей Куст https://github.com/BUSH1997  
Рудых Евгений https://github.com/Lyalyashechka/  
  
  
Менторы:   
Нозим Юнусов  https://github.com/zelflod  
Григорий Ролдугин https://github.com/Grishameister  
  
   
API Documentation  
текущий backend https://ozonback.herokuapp.com      
1) Регистрация юзера (POST/backend/signup)  
   Post data format: json  
   Sample:    
   ```
   {
    "username" : "newUser",
    "email" : "newEmail@gmail.com",
    "password" : "12ddfgfhsFd3df45."    
   }
   ```
   Input Format:  
   | Description | Returned Code | Returned Data |
   |-------------|---------------|---------------|
   | Succeeded   |200            |See bellow     |
   | Error data            | 400              |  {"error code": 21,"error description": "can not validate data"} |  
   |User already exist |401                 | {"error code": 32,"error description": "user already exists"}|

     
     
   Results Returned Successfully:
    ```
   {
    "username" : "newUser",
    "email" : "newEmail@gmail.com",
    "password" : "12ddfgfhsFd3df45."    
   }
   ```
2) Логин (POST/backend/login)  
   Post data format: json  
   Sample:    
   ```
   {
    "username" : "newUser",
    "password" : "12ddfgfhsFd3df45."    
   }
   ```
   Input Format:  
   | Description | Returned Code | Returned Data |
   |-------------|---------------|---------------|
   | Succeeded   |200            |See bellow     |
   | Error data            | 400              | {"error code": 20,"error description": "can not bind data"}|  
   |No user |401                 | {"error code": 30,"error description": "user does not exist"}|

     
     
   Results Returned Successfully:
    ```
   {
    "username": "newUser",
    "password": "12ddfgfhsFd3df45."
   }
 3) Логаут (GET/backend/logout)
    Post data format: none  
    Input Format:  
      
    | Description | Returned Code | Returned Data |
    |-------------|---------------|---------------|
    | Succeeded   |200            |               |
    | No login    | 400           |               |  
    |No user      |401            |               |
  
 4) Каталог (GET/backend/homepage)
    Post data format: none  
    Input Format:  
      
    | Description | Returned Code | Returned Data |  
    |-------------|---------------|---------------|  
    | Succeeded   |200            | See  bellow            |  
    | Error |400           | {"error code": 40,"error description": "can not connect db"}|    
    
    ```
    [
    {
        "id": 3,
        "image": "images/shirt1.png",
        "name": "Кофта мужская",
        "price": 10000,
        "rating": 2.5
    },
    {
        "id": 4,
        "image": "images/smartphone.png",
        "name": "Смартфон чёрный цвет",
        "price": 10000,
        "rating": 2.5
    },
    {
        "id": 7,
        "image": "images/phone3.png",
        "name": "Смартфон поддержанный",
        "price": 10000,
        "rating": 2.5
    },
    ]
    ``` 
  5) Один товар (GET/backend/product?id=1)  
     POST data format: none        
     Input Format:  
    
     | Description | Returned Code | Returned Data |  
     |-------------|---------------|---------------|  
     | Succeeded   |200            | See  bellow            |  
     | Bad id |200           | {"error code": 40, "error description": "product does not exist"}|  
     | Error |400           | {"error code": 40,"error description": "can not connect db"}|   
     ```
     {
     "id": 1,
     "image": "images/shoe2.png",
     "name": "Кроссовки adidas голубые",
     "price": 250,
     "rating": 4
      }
      ```
