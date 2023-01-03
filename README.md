# niwai-music-server

## 服务器地址

```
http://localhost:8888
```

## 登录

### 地址

```
/login
```

### 方式

```
POST
```

### 参数类型

| 参数名称 | 类型   | 是否必选 | 描述   |
| -------- | ------ | -------- | ------ |
| username | string | 是       | 用户名 |
| password | string | 是       | 密码   |

### 返回示例

#### 成功

```json
{
    "status": 1,
    "data": [
        {
            "id": 2,
            "username": "腻歪音乐",
            "create_time": "2023-01-03T04:58:17.000Z",
            "role": ""
        }
    ],
    "message": "登录成功！",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzI3MjE5MjEsImV4cCI6MTY3MjcyMTk4MX0.J1cyosfE6sd1poVk5GlIysabCjNMKabzLCepkWJ2v5o"
}
```

#### 失败

```json
{
    "status": 0,
    "data": null,
    "message": "该用户不存在！"
}

{
    "status": 0,
    "data": null,
    "message": "密码不正确！"
}
```



