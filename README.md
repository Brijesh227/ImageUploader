
# Project Title

This module containts two services imageuploader service and entity service(user).
imageuploader service stores images in localmemory.
user service containts basic crud functionality as well as upload image using imageuploader service.


## Installation

Install FILEDEMO from google drive

```bash
  open FILEDEMO
  npm install 
  npm run start
```
    
## API Reference

#### Get all items of entity

```http
  GET /user
```

| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `` | `` | |

#### create entity(user)

```http
  POST /user
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. |
| `email`      | `string` | **Required**. |
| `profile_pic`      | `jpeg,png` | upload profile_pic while creating user |
| `profile_pic_link_id`      | `string` | provide profile_pic_link_id if user want to associate previously uploaded image(stored in temp folder) with thier profile |

#### update entity(user)

```http
  PUT /user
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. |
| `email`      | `string` | **Required**. |
| `profile_pic`      | `jpeg,png` | **Required**. update profile_pic |

#### delete id of entity(user)

```http
  DELETE /user/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id(name) of entity. delete associated profile_pic. |

#### upload image

```http
  POST /upload/${entity}/${id}?/${filename_link_id}?
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `entity`      | `string` | **Required**. |
| `id`      | `string` | image will be associated with this id |
| `filename_link_id`      | `string` | associate previously uploaded image(stored in temp folder) with id |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `filename`      | `jpeg,png` | **Required**. upload image |

#### delete associated image of id

```http
  DELETE /${entity}/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `entity`      | `string` | **Required**. |
| `id`      | `string` | **Required**.delete associated image of id |