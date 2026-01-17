# **Multi-Media Cover Extractor (MCE) \- 多媒体封面提取插件使用手册**

## **1\. 系统简介**

MCE 是一个基于 Nonebot2 (OneBot V11) 的多功能多媒体封面提取工具。  
该插件旨在解决群聊中快速获取视频、音乐封面的需求，支持 Bilibili 和网易云音乐两大平台，能够智能解析各种复杂链接。  
**核心特性：**

* **多源支持**：覆盖 Bilibili 视频及网易云音乐的单曲、专辑、电台节目。  
* **智能解析**：内置正则表达式引擎，精准识别混杂在聊天记录或复杂 URL 参数中的核心 ID。  
* **静默拦截**：白名单机制配合静默过滤，非授权群组使用时自动隐身，不干扰正常聊天。  
* **统一输出**：标准化的状态反馈与卡片式信息展示。

## **2\. 用户指令指南 (User Guide)**

所有指令统一前缀为 /gc (Get Cover)。

### **基础操作**

| 指令格式 | 功能描述 | 支持输入 | 示例 |
| :---- | :---- | :---- | :---- |
| /gc \-b \[ID/Link\] | **B站封面**：提取 Bilibili 视频封面。 | BV号、完整视频链接 | /gc \-b BV1GJ411x7h7 |
| /gc \-ws \[ID/Link\] | **网易云单曲**：提取单曲封面。 | 歌曲ID、单曲分享链接 | /gc \-ws 186016 |
| /gc \-wa \[ID/Link\] | **网易云专辑**：提取专辑封面。 | 专辑ID、专辑分享链接 | /gc \-wa 18896 |
| /gc \-wd \[ID/Link\] | **网易云电台**：提取电台/播客封面。 | 节目ID、节目分享链接 | /gc \-wd 2503731119 |

### **操作提示**

* **容错性**：指令对大小写不敏感（如 /gc \-B 也可以）。  
* **链接识别**：你无需手动剔除链接中的 ?spm\_id\_from= 或 \&userid= 等后缀，直接复制完整链接粘贴即可，系统会自动提取核心 ID。

## **3\. 开发者文档 (Developer Reference)**

### **3.1 运作逻辑 (Operation Logic)**

插件采用 **"路由 \-\> 鉴权 \-\> 解析 \-\> 请求 \-\> 渲染"** 的流式处理架构：

1. **指令捕获**：监听 /gc 指令，阻断 (block=True) 后续事件。  
2. **前置鉴权**：校验 event.group\_id 是否在白名单 (WHITE\_LIST) 中。不在则直接 return，实现静默拦截。  
3. **参数清洗**：将用户输入拆解为 flag 和 content。  
4. **正则提取**：不依赖字符串切割，使用 Regex 从 content 中提取 ID，抗干扰能力强。  
5. **异步请求**：通过 httpx.AsyncClient 并发请求 API。  
6. **统一渲染**：输出格式统一为 Type | Title \+ 图片。

### **3.2 API 接口文档**

插件使用各平台的 Web 端公开接口（无需 Cookie 鉴权）：

| 平台 | 类型 | Endpoint | 参数 | 备注 |
| :---- | :---- | :---- | :---- | :---- |
| **Bilibili** | 视频 | https://api.bilibili.com/x/web-interface/view | bvid | 返回 data.pic |
| **Netease** | 单曲 | http://music.163.com/api/song/detail | id, ids=\[id\] | 需带 Referer 头 |
| **Netease** | 专辑 | http://music.163.com/api/album/{id} | \- | 路径参数 |
| **Netease** | 电台 | http://music.163.com/api/dj/program/detail | id | \- |

### **3.3 正则匹配策略 (Regex Strategy)**

为兼容纯数字 ID 和复杂 URL，系统采用以下正则逻辑：

* **Bilibili**: (?i)BV\[a-zA-Z0-9\]{10}  
  * 说明：忽略大小写，优先匹配带 BV 前缀的 10 位字符串。  
* **网易云**: \[?&\]id=(\\d+)  
  * 说明：精准匹配 URL 参数中的 id，自动忽略 & 后的干扰参数。  
  * Fallback：如果未匹配到 URL 参数，则回退尝试匹配纯数字 \\b\\d+\\b。

### **3.4 状态码说明**

* ⚠️ Format Error: 用户指令格式错误。  
* ⚠️ Invalid ID: 正则提取失败，未发现有效 ID。  
* ⚠️ Network Error: 网络层异常 (Timeout / DNS Error)。  
* 🚫 API Error: 业务层异常 (如视频被删除，返回 code \!= 0)。