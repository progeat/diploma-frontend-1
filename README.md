Области хранения данных:

-   база данных на json-server (--port 3005)
-   BFF
-   Redux store

Сущности приложения:

-   пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
-   роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использование на клиенте)
-   счёт: БД (список счетов), стор (отображение в браузере)
-   категория: БД (список категорий), стор (отображение в браузере)
-   операция: БД (список операций), стор (отображение в браузере)
-   комментарий к операции: БД (список комментариев), стор (отображение в браузере)

Таблицы БД:

-   пользователи - users: id / login / password / registed_at / role_id
-   роли - roles: id / name
-   счета - accounts: id / title / type / amount / icon / created_at
-   категории - categories: id / title / type / icon / created_at
-   операции - operations: id / account_id / category_id / amount / comment_id / created_at
-   комментарии - comments: id / content

Схема состояния на BFF:

-   сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

-   user: id / login / roleId / session
-   accounts: массив account: id / title / type / amount / icon
-   account: id / title / type / amount / icon / createdAt
-   categories: массив category: id / title / type / icon
-   category: id / title / type / icon / createdAt
-   operations: массив operation: id / accountId / categoryId / amount / commentId / createdAt
-   operation: id / accountId / categoryId / amount / commentId / createdAt
-   comments: массив comment: id / content
-   users: массив user: id / login / registeredAt / role
