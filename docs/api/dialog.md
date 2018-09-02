# Диалоги

{% api "Получение диалога", method="GET", url="/api/dialog/:id" %}

Получение диалога.

### Параметры:

| Название   | Тип     | Описание                    |
| :--------- | :------ | :-------------------------- |
| **id**  | string  | ID диалога          |


### Ответ:
***200 OK***

При успешной обработки запроса возвращается диалог с переданным id.

```json
{
	"id": string,
	"kind": string,
	"title": string,
	"description": string,
	"avatar": string,
	"date": string,
	"members": array,
	"messages": array,
	"pinned": number
}
```
{% endapi %}

{% api "Создание диалога", method="POST", url="/api/dialog" %}

Получение основной информации о пользователе.

### Параметры [body]:

| Название      | Тип     | Описание                    |
| :---------    | :------ | :-------------------------- |
| **kind**     | string  | Тип диалога         |
| **title**  | string  | Название         |
| **description**      | string  | Описание      |
| **avatar**      | string  | Изображение      |
| **members**      | array  | Участники     |



### Ответ:
***200 OK***

{% endapi %}


