#  niwai-music-server

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



## 歌单

### 添加歌单

#### 地址

```
/sheets
```

#### 方式

```
/POST
```

#### 参数类型

| 参数名称      | 类型   | 是否必选 | 描述       |
| ------------- | ------ | -------- | ---------- |
| name          | string | 是       | 歌单名字   |
| describe      | string | 是       | 歌单描述   |
| cover         | string | 否       | 歌单封面   |
| create_author | string | 是       | 歌单创建人 |
| song_id       | string | 否       | 歌曲ID     |

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": [
        {
            "id": 7,
            "name": "叹古惜史｜回首历史浮梦，唯剩感慨万千",
            "describe": "华夏五千年，十二个朝代\n造就了一批批千古风流人物\n而他们的一个个故事又组成了历史\n他们的故事在史书上，或浓墨重彩，或一笔带过\n他们的功绩，或名垂青史，或终究遗憾\n——\n山河寥落殇天涯，英雄跌宕报兴亡\n故国江山如云烟，千秋功过百代论\n有人流芳亦流亡，千人千样敬月亮\n美人堂前舞繁华，朱颜孤身终华发\n文臣尽忠勤治国，将军跃马赴疆场\n知己离别多合少，情人天地两相隔\n历史故事几万千，幸得载入史册传\n\n千百年前您们改写历史，旷世事迹流传\n千百年后我读尽您们一生，唯剩感慨万千\n多么想穿越时空，会您们一面\n内心的一切思念，唏嘘不已\n——\n总起《历书·乌衣》，概括多数历史\n结尾《思》，所有旧事，都化作说书人，惊堂目一响，故人难忘\n\n◎歌曲按人物的朝代排序\n此歌单为精选集，完整集歌单以及历史人物名单\n→《忆千古风流人物》",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-06T01:28:36.000Z",
            "create_author": "珩萧雨溪",
            "song_id": null
        }
    ],
    "message": "添加成功！"
}
```

##### 失败

```json
{
    "status": 0,
    "data": null,
    "message": "请求失败：ER_NO_SUCH_TABLE: Table 'test.ts1' doesn't exist"
}
{
    "status": 0,
    "data": null,
    "message": "歌单已存在！"
}
```

### 获取所有用户歌单

#### 地址

```
/sheets
```

#### 方式

```
GET
```

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": [
        {
            "id": 1,
            "name": "古风纯音乐微雨入梦",
            "describe": "纯音乐，请欣赏，没有歌词，只有曲调。纵使筝会断弦，许君我心不变。雨落荷兮，微雨入梦见山是山，水光山色古风纯音乐 古韵尚存 上善若水兮",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-05T01:56:38.000Z",
            "create_author": "弄熊来",
            "song_id": null
        },
        {
            "id": 2,
            "name": "zxop",
            "describe": "nasdadsa",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-05T10:18:18.000Z",
            "create_author": "弄熊来",
            "song_id": null
        },
        {
            "id": 3,
            "name": "伤感古风歌曲情在字里行间",
            "describe": "落叶藏在封面，在字里行间，多少锦绣字句，眼眸中流转，隔人海 与千山。陌路回转不见君，朝如青丝暮成雪。绾青丝 浅回眸，何以寄牵挂。人间虚妄，红尘苦海，尘缘寻梦，终归是匆匆而过。",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-05T10:22:10.000Z",
            "create_author": "弄熊来",
            "song_id": null
        },
        {
            "id": 4,
            "name": "国风新潮大赏 | 歌声岂合世间闻",
            "describe": "随着继承并弘扬传统文化的呼声日益高涨，诸多制作精良的古装影视作品问世，广受都市人们的喜爱。同时，结合中国元素的流行歌曲，也备受瞩目。\n\n本歌单收录了含人声的国风摇滚、说唱、电子、戏腔、民谣。当然还有国风爵士等类型少量收录，有机会会继续收录哒！\n\n此刻，就让我们沉溺在不一样的国风浪潮中，感受华夏大地的悠扬古韵吧！",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-06T01:16:25.000Z",
            "create_author": "弄熊来",
            "song_id": null
        },
        {
            "id": 5,
            "name": "伤感古风歌曲情在字里行间",
            "describe": "落叶藏在封面，在字里行间，多少锦绣字句，眼眸中流转，隔人海 与千山。陌路回转不见君，朝如青丝暮成雪。绾青丝 浅回眸，何以寄牵挂。人间虚妄，红尘苦海，尘缘寻梦，终归是匆匆而过。",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-06T01:21:06.000Z",
            "create_author": "珩萧雨溪",
            "song_id": null
        },
        {
            "id": 6,
            "name": "想开家茶馆，放首民谣给从前",
            "describe": "想开那么一家茶馆，过往的人能暂且休憩，安放内心深处难以释怀的感情，听那么一首民谣，想想从前，想起了曾爱过的姑娘。当这杯茶落在你面前，是否这袅袅升起的热气，能忆起你容颜。\n\n让民谣与记忆叙个旧吧",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-06T01:26:12.000Z",
            "create_author": "珩萧雨溪",
            "song_id": null
        },
        {
            "id": 7,
            "name": "叹古惜史｜回首历史浮梦，唯剩感慨万千",
            "describe": "华夏五千年，十二个朝代\n造就了一批批千古风流人物\n而他们的一个个故事又组成了历史\n他们的故事在史书上，或浓墨重彩，或一笔带过\n他们的功绩，或名垂青史，或终究遗憾\n——\n山河寥落殇天涯，英雄跌宕报兴亡\n故国江山如云烟，千秋功过百代论\n有人流芳亦流亡，千人千样敬月亮\n美人堂前舞繁华，朱颜孤身终华发\n文臣尽忠勤治国，将军跃马赴疆场\n知己离别多合少，情人天地两相隔\n历史故事几万千，幸得载入史册传\n\n千百年前您们改写历史，旷世事迹流传\n千百年后我读尽您们一生，唯剩感慨万千\n多么想穿越时空，会您们一面\n内心的一切思念，唏嘘不已\n——\n总起《历书·乌衣》，概括多数历史\n结尾《思》，所有旧事，都化作说书人，惊堂目一响，故人难忘\n\n◎歌曲按人物的朝代排序\n此歌单为精选集，完整集歌单以及历史人物名单\n→《忆千古风流人物》",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-06T01:28:36.000Z",
            "create_author": "珩萧雨溪",
            "song_id": null
        }
    ],
    "message": "获取成功"
}
```

##### 失败

```json
{
    "status": 0,
    "data": null,
    "message": "请求失败：ER_NO_SUCH_TABLE: Table 'test.ts1' doesn't exist"
}
```

### 根据username获取用户歌单

#### 地址

```
/sheets/:username
```

#### 方式

```
GET
```

#### 参数类型

| 参数名称 | 类型   | 是否必选 | 描述   |
| -------- | ------ | -------- | ------ |
| username | string | 是       | 用户名 |

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": [
        {
            "id": 1,
            "name": "古风纯音乐微雨入梦",
            "describe": "纯音乐，请欣赏，没有歌词，只有曲调。纵使筝会断弦，许君我心不变。雨落荷兮，微雨入梦见山是山，水光山色古风纯音乐 古韵尚存 上善若水兮",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-05  09:56:38",
            "create_author": "弄熊来",
            "song_id": null
        },
        {
            "id": 2,
            "name": "zxop",
            "describe": "nasdadsa",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-05  18:18:18",
            "create_author": "弄熊来",
            "song_id": null
        },
        {
            "id": 3,
            "name": "伤感古风歌曲情在字里行间",
            "describe": "落叶藏在封面，在字里行间，多少锦绣字句，眼眸中流转，隔人海 与千山。陌路回转不见君，朝如青丝暮成雪。绾青丝 浅回眸，何以寄牵挂。人间虚妄，红尘苦海，尘缘寻梦，终归是匆匆而过。",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-05  18:22:10",
            "create_author": "弄熊来",
            "song_id": null
        }
    ],
    "message": "获取成功！"
}
```

##### 失败

```json
// 请求成功，没有数据。
{
    "status": 0,
    "data": null,
    "message": "获取失败！"
}
// 请求失败。
{
    "status": 0,
    "data": null,
    "message": "请求失败：ER_NO_SUCH_TABLE: Table 'test.ts1' doesn't exist"
}
```

### 根据id修改歌单

#### 地址

```
/sheets/:id
```

#### 方式

```
PUT
```

#### 参数类型

| 参数名称 | 类型   | 是否必选 | 描述     |
| -------- | ------ | -------- | -------- |
| name     | string | 否       | 歌单名字 |
| describe | string | 否       | 歌单描述 |
| cover    | string | 否       | 歌单封面 |

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": [
        {
            "id": 7,
            "name": "2023全网超好听热门歌曲推荐（持续更新）",
            "describe": "祝你新的一年，平安喜乐！\n2023全网超好听热门流行歌曲分享，持续更新，欢迎投稿，欢迎收藏推荐，蟹蟹小伙伴们支持哦~♥",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-06T01:28:36.000Z",
            "create_author": "珩萧雨溪",
            "song_id": null
        }
    ],
    "message": "修改成功！"
}
```

##### 失败

```json
// 请求失败。
{
    "status": 0,
    "data": null,
    "message": "请求失败：ER_NO_SUCH_TABLE: Table 'test.ts1' doesn't exist"
}
```

### 根据id删除歌单

#### 地址

```
/sheets/:id
```

#### 方式

```
DELETE
```

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": {},
    "message": "删除成功！"
}
```

##### 失败

```json
// 请求失败。
{
    "status": 0,
    "data": null,
    "message": "请求失败：ER_NO_SUCH_TABLE: Table 'test.ts1' doesn't exist"
}
```

### 获取推荐歌单

#### 地址

```
/sheets/recommend
```

#### 方式

```
GET
```

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": [
        {
            "id": 12,
            "name": "开口即惊艳｜爱意东升西落，浪漫至死不渝",
            "describe": "“我在黄昏写上一封书信，载着落日的余晖和银河的浪漫，寄给你，寄给温柔本身。”",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-06T06:13:22.000Z",
            "create_author": "弄熊来",
            "song_id": null
        },
        {
            "id": 9,
            "name": "华语｜难以被复制，声线极具特色女歌手",
            "describe": "华语乐坛向来不乏缺少好声音，然而真正具有鲜明特质的声音还是不多，这些鲜明的特质一方面包括声音的穿透、力度以及感染度，同时，当这样的一个具有鲜明特质的声音一出来，就会让听歌的人感觉到“未见其人，先闻其声。”",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-06T02:12:16.000Z",
            "create_author": "弄熊来",
            "song_id": null
        },
        {
            "id": 7,
            "name": "2023全网超好听热门歌曲推荐（持续更新）",
            "describe": "祝你新的一年，平安喜乐！\n2023全网超好听热门流行歌曲分享，持续更新，欢迎投稿，欢迎收藏推荐，蟹蟹小伙伴们支持哦~♥",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-06T01:28:36.000Z",
            "create_author": "珩萧雨溪",
            "song_id": null
        },
        null,
        {
            "id": 15,
            "name": "好好生活 慢慢相遇",
            "describe": "希望你有永远的朋友 自己喜欢的工作 然后有可以将你从坏情绪中打捞起来的爱好 能轻易到达的喜爱风景 有充足的睡眠 独处也不焦躁的快乐 最后如果还有时间才是爱情 希望你有更多的自由 爱情只是你自由之外的快乐",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-06T08:36:38.000Z",
            "create_author": "弄熊来",
            "song_id": null
        },
        {
            "id": 8,
            "name": "[华语私人订制] 最懂你的华语推荐 每日更新35首",
            "describe": "全都是耐听的华语好歌\n这里是你的专属华语日推\n收藏订阅，歌荒，不存在的事",
            "cover": null,
            "tag": null,
            "create_time": "2023-01-06T02:10:14.000Z",
            "create_author": "弄熊来",
            "song_id": null
        }
    ],
    "message": "获取成功！"
}
```

##### 失败

```json
// 请求失败。
{
    "status": 0,
    "data": null,
    "message": "请求失败：ER_NO_SUCH_TABLE: Table 'test.ts1' doesn't exist"
}
```

## 上传文件

### 上传图片

#### 地址

```
/upload
```

#### 方式

```
POST
```

#### 参数类型

| 参数名称 | 类型 | 是否必选 | 描述     |
| -------- | ---- | -------- | -------- |
| image    | file | 是       | 图片文件 |

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": {
        "name": "niwaiyinyue_1c53ed7fd2ea46a11a16af200.png",
        "url": "http://localhost:8888/image/niwaiyinyue_1c53ed7fd2ea46a11a16af200.png"
    },
    "message": "上传成功！"
}
```

##### 失败

```json
{
    "status": 0,
    "data": null,
    "message": "不支持的文件格式！"
}
```

### 根据名字删除图片

#### 地址

```
/upload/picture/:name
```

#### 方式

```
DELETE
```

#### 返回示例

##### 成功

```json
{
    "status":1,
    "data":{},
    "message":"删除成功！"
}
```

##### 失败

```json
{
    "status": 0,
    "data": null,
    "message": "文件不存在！"
}
```

### 上传音频

#### 地址

```
/upload
```

#### 方式

```
POST
```

#### 参数类型

| 参数名称 | 类型 | 是否必选 | 描述     |
| -------- | ---- | -------- | -------- |
| audio    | file | 是       | 音频文件 |

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": {
        "name": "niwaiyinyue_1c53ed7fd2ea46a11a16af200.MP3",
        "url": "http://localhost:8888/image/niwaiyinyue_1c53ed7fd2ea46a11a16af200.MP3"
    },
    "message": "上传成功！"
}
```

##### 失败

```json
{
    "status": 0,
    "data": null,
    "message": "不支持的文件格式！"
}
{
    "status": 0,
    "data": null,
    "message": "上传失败！"
}
```

### 根据名字删除音频

#### 地址

```
/upload/audio/:name
```

#### 方式

```
DELETE
```

#### 返回示例

##### 成功

```json
{
    "status":1,
    "data":{},
    "message":"删除成功！"
}
```

##### 失败

```json
{
    "status": 0,
    "data": null,
    "message": "删除失败！"
}
```

### 上传歌词 （后缀lrc文件）

#### 地址

```
/upload
```

#### 方式

```
POST
```

#### 参数类型

| 参数名称 | 类型 | 是否必选 | 描述     |
| -------- | ---- | -------- | -------- |
| lyrics   | file | 是       | 歌词文件 |

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": {
        "name": "niwaiyinyue_1c53ed7fd2ea46a11a16af200.lrc",
        "url": "http://localhost:8888/image/niwaiyinyue_1c53ed7fd2ea46a11a16af200.lrc"
    },
    "message": "上传成功！"
}
```

##### 失败

```json

{
    "status": 0,
    "data": null,
    "message": "上传失败！"
}
```

### 根据名字删除歌词

#### 地址

```
/upload/lyrics/:name
```

#### 方式

```
DELETE
```

#### 返回示例

##### 成功

```json
{
    "status":1,
    "data":{},
    "message":"删除成功！"
}
```

##### 失败

```json
{
    "status": 0,
    "data": null,
    "message": "删除失败！"
}
```

## 歌曲

### 搜索关键字获取歌曲列表

#### 地址    keyword的值singer、song或all

```
/songs/search/:keywordType/:keyword/:create_author/:pageNum/:pageSi ze
```

#### 方式

```
GET
```

参数类型

| 参数名称      | 类型   | 是否必选 | 描述                                    |
| ------------- | ------ | -------- | --------------------------------------- |
| create_author | string | 是       | 用户名                                  |
| pageNum       | number | 是       | 页数                                    |
| pageSize      | number | 是       | 每页的数量                              |
| keywordType   | string | 三选一   | 默认获取歌曲列表  **值：all**           |
| keywordType   | string | 三选一   | 根据歌手搜索(歌手名字)   **值：singer** |
| keywordType   | string | 三选一   | 根据歌曲搜索(歌曲名字)   **值：song**   |
| keyword       | string | 否       | 搜索关键字                              |

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": [
        {
            "id": 1,
            "song_name": "东风破",
            "author_id": 1,
            "author_name": "周杰伦",
            "lyrics": null,
            "image": "http://localhost:8888/image/niwaiyinyue_21c37db2-d7a0-402f-a871-7df916e09d2e.jpeg",
            "album_name": "叶惠美",
            "album_id": 1,
            "url": "http://localhost:8888/audio/niwaiyinyue_286a84ca-a7ce-4f61-b1a5-cb05e3ff15a6.mp3",
            "create_time": "2023-01-10T05:26:54.000Z",
            "create_author": "弄熊来"
        }
    ],
    "message": "请求成功！"
}
```

##### 失败

```json
{
    "status": 0,
    "data": null,
    "message": "请求失败：ER_EMPTY_QUERY: Query was empty"
}
```

### 添加歌曲

#### 地址

```
/songs
```

#### 方式

```
POST
```

#### 参数类型

| 参数名称    | 类型   | 是否必选 | 描述             |
| ----------- | ------ | -------- | ---------------- |
| song_name   | string | 是       | 歌名             |
| author_name | number | 是       | 歌手名字         |
| lyrics      | number | 否       | 歌词 后缀lrc文件 |
| image       | string | 否       | 歌曲封面         |
| album_name  | string | 否       | 专辑名字         |
| url         | string | 是       | 音频地址         |

#### 返回示例

##### 成功

```json
{
  "status": 1,
  "data": {
    "id": 43,
    "song_name": "烟花易冷",
    "author_id": null,
    "author_name": "周杰伦",
    "lyrics": "http://localhost:8888/lyrics/niwaiyinyue_f30c9be4-00b9-478b-98f0-a8e24c6ca78a.lrc",
    "image": "http://localhost:8888/image/niwaiyinyue_ca51991d-aacc-4d94-b308-7957d5d46213.jpg",
    "album_name": "跨时代",
    "album_id": null,
    "url": "http://localhost:8888/audio/niwaiyinyue_4d3ae513-2bef-4c0e-87e5-274632c4b750.mp3",
    "create_time": "2023-01-19T03:02:26.000Z",
    "create_author": "弄熊来"
  },
  "message": "添加成功！"
}
```

##### 失败

```json
{
  "status": 0,
  "data": null,
  "message": "添加失败！"
}
```

### *根据id删除歌曲*

#### 地址

```
/songs/:id
```

#### 方式

```
DELETE
```

#### 返回示例

##### 成功

```json
{
  "status": 1,
  "data": {},
  "message": "删除成功！"
}
```

##### 失败

```json
{
  "status": 0,
  "data": null,
  "message": "删除失败！"
}
```

### 根据id修改歌曲

#### 地址

```
/songs/:id
```

#### 方式

```
PUT
```

#### 类型参数

| 参数名称    | 类型   | 是否必选 | 描述             |
| ----------- | ------ | -------- | ---------------- |
| song_name   | string | 是       | 歌名             |
| author_name | string | 是       | 歌手名字         |
| lyrics      | string | 否       | 歌词 后缀lrc文件 |
| image       | string | 否       | 歌曲封面         |
| album_name  | string | 否       | 专辑名字         |
| url         | string | 是       | 音频地址         |

#### 返回示例

##### 成功

```json
{
  "status": 1,
  "data": [
    {
      "id": 45,
      "song_name": "红颜如霜",
      "author_id": null,
      "author_name": "周杰伦",
      "lyrics": "http://localhost:8888/lyrics/niwaiyinyue_8113e65c-9939-4418-bb9f-38a0e5e5f9eb.lrc",
      "image": "http://localhost:8888/image/niwaiyinyue_2778e79b-cefa-4818-b713-bb43243c1f52.jpg",
      "album_name": "最伟大的作品",
      "album_id": null,
      "url": "http://localhost:8888/audio/niwaiyinyue_1fffcba1-90e7-4984-9249-b1e37350529e.mp3",
      "create_time": "2023-01-19T03:05:04.000Z",
      "create_author": "弄熊来"
    }
  ],
  "message": "修改成功！"
}
```

##### 失败

```json
{
  "status": 0,
  "data": null,
  "message": "修改失败！"
}
```

## 角色

### 获取角色列表

#### 地址

```
/roles
```

#### 方式

```
GET
```

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": [
        {
            "id": 1,
            "role_name": "管理员",
            "create_time": "2023-01-19  12:56:45",
            "auth_time": null,
            "auth_name": "弄熊来"
        },
        {
            "id": 2,
            "role_name": "测试1",
            "create_time": "2023-01-19  13:11:07",
            "auth_time": null,
            "auth_name": null
        }
    ],
    "message": "获取成功！"
}
```

##### 失败

```json
{
    "status": 0,
    "data": null,
    "message": "获取失败！"
}
```

### 添加角色

#### 地址

```
/roles
```

#### 方式

```
POST
```

#### 参数类型

| 参数名称  | 类型   | 是否必选 | 描述     |
| --------- | ------ | -------- | -------- |
| role_name | string | 是       | 角色名字 |

#### 返回示例

##### 成功

```json
{
    "status": 1,
    "data": {
        "id": 2,
        "role_name": "测试1",
        "create_time": "2023-01-19T05:11:07.000Z",
        "auth_time": null,
        "auth_name": null
    },
    "message": "添加成功！"
}
```

##### 失败

```json
{
    "status": 0,
    "data": null,
    "message": "添加失败！"
}
```

### 角色授权

#### 地址

```
/roles/:id  
```

#### 方式

```
PUT
```

#### 参数类型

| 参数名称  | 类型   | 是否必选 | 描述        |
| --------- | ------ | -------- | ----------- |
| auth_name | string | 是       | 授权人      |
| menus     | array  | 是       | 权限key数组 |

#### 返回示例

##### 成功

```json
{
  "status": 1,
  "data": {
    "id": 1,
    "role_name": "管理员",
    "create_time": "2023-01-19T04:56:45.000Z",
    "auth_time": "2023-01-20T02:47:06.000Z",
    "auth_name": "弄熊来",
    "menus": "[\"home\",\"sheet\",\"song\",\"manage\",\"role\"]"
  },
  "message": "授权成功！"
}
```

##### 失败

```json
{
  "status": 0,
  "data": null,
  "message": "授权失败！"
}
```

