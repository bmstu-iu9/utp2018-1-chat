# Сервер

Разработан на Node.js

## Модули

#### Роутер
`application/modules/router`

Принимает запросы к серверу и распределяет их.

#### База данных
`application/modules/db`

Модуль для работы с базой данных (RxDB).

Содержит методы для работы с коллекциями БД.


#### Логгер
`application/modules/log`

Модуль для логирования.

Методы:
* log.info()
* log.warning()
* log.error()
* log.trace()

#### Авторизация
`application/modules/auth`

Методы для входа, регистрации, работы с сессиями.

#### API
`application/modules/api`

Методы API

#### Utils
`application/modules/utils`

Дополнительные методы: парсеры, генераторы и т.д.

