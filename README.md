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

| 参数名称 | 类型   | 是否必选 | 描述 |
| -------- | ------ | -------- | ---- |
| file     | number | 是       | 页码 |

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

### 获取歌曲列表

#### 地址

```
/songs
```

#### 方式

```
GET
```

#### 参数类型

| 参数名称 | 类型   | 是否必选 | 描述     |
| -------- | ------ | -------- | -------- |
| pageNum  | number | 是       | 页码     |
| pageSize | number | 是       | 每页数量 |

#### 返回示例

##### 成功

```json

```

##### 失败

```json

```

