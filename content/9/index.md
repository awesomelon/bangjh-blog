---
emoji: ☀️
title: MongoDB(BulkWrite)
date: '2023-03-11 19:00:00'
author: Bangjh
tags: mongodb bulkWrite
categories: WIKI
---

![image1](image1.png)

## BulkWrite란?

BulkWrite는 MongoDB 데이터 쓰기 명령( `INSERT`, `UPDATE`, `DELETE` )을 모아서 한 번에 실행할 수 있는 명령입니다.

BulkWrite 명령은 다음과 같은 명령을 한 번에 모아서 실행할 수 있는데, 반드시 하나의 컬렉션에 대해서만 데이터를 변경할 수 있습니다.

### BulkWrite 실행 가능한 명령어

- insertOne
- updateOne
- updateMany
- replaceOne
- deleteOne
- deleteMany

### BulkWrite 실행

BulkWrite 명령의 결과는 `INSERT`와 `UPDATE` 그리고 `DELETE` 등의 명령 단위로 정리해서 적용된 건수를 보여줍니다.

```js
db.testA.bulkWrite([
  {
   insertOne: {
     "document": {
	 "name": "bang",
	 "age": 20
    }
   }
  },
  {
   insertOne: {
	 "document": {
	 "name": "kim",
	 "age": 20,
	 "_id": 5
	 }
   }
  },
  {
	updateOne: {
	 "filter": {"name": "lee"},
     "update": {$set: { age: 50 }}
	}
  }
]);

// response
{
	"acknowledged" : true,
	"deletedCount" : 0,
	"insertedCount" : 2,
	"matchedCount" : 0,
	"upsertedCount" : 0,
	"insertedIds" : {
	  "0" : 4,
		"1" : 5
  },
	"upsertedIds" : { }
}
```

처리 결과 insertedIds 서브 도큐먼트에서는 INSERT된INSERT 된 도큐먼트들의 \_id값을 반환하며,

upsertedIds 서브 도큐먼트에서는 UPDATE 명령의 upsert 플래그가 true일 때 INSERT 된 도큐먼트들의 \_id값을 반환합니다.

BulkWrite 명령에 입력하는 각 하위 명령은 각자의 도큐먼트 포맷을 가지는데 그건 아래에 링크를 걸어두겠습니다.

<br >

### BulkWrite 에러 처리

BulkWrite 명령을 실행하는 도중에 에러가 발생하면 다음과 같이 BulkWriteError가 반환됩니다.

```js
BulkWriteError({
  writeErrors: [
    {
      index: 2,
      code: 11000,
      errmsg:
        'E11000 duplicate key error collection: testDB.testA index: _id_ dup key: { _id: 5.0 }',
      op: {
        _id: 5,
        name: 'kim',
        age: 20,
      },
    },
  ],
  writeConcernErrors: [],
  nInserted: 0,
  nUpserted: 0,
  nMatched: 1,
  nModified: 1,
  nRemoved: 1,
  upserted: [],
});
```

위의 결과에서는 INESRT하는 도큐먼트의 \_id가 이미 존재해서 INSERT에 실패했다는 것을 알 수 있습니다. 그리고 삭제된 도큐먼트가 1건이며 수정된 도큐먼트도 1건이라는 것도 확인할 수 있습니다.

즉, BulkWrite 명령의 실행 결과로 `UPDATE`와 `DELETE`가 각 1건씩 실행됐으며, 이후 INSERT가 실행됐는데 실행 도중 중복 키 에러가 발생하면서 BulkWrite가 실패했다는 것을 알 수 있습니다.

<br >

### BulkWrite ordered?

BulkWrite 명령도 다른 CRUD 명령과 같이 `ordered` 옵션을 사용할 수 있습니다.

이때 `ordered` 옵션이 **`true`** 면 BulkWrite 명령에 주어진 각 하위 명령이 순차적으로 실행되며, 중간에 실패 도큐먼트가 발생하면 지금까지 변경된 도큐먼트는 그대로 유지하고 남은 작업은 모두 포기하고 멈춥니다.

즉, RDBMS의 롤백과 같은 작업은 없습니다.

`ordered` 옵션을 **`false`** 로 설정하면 MongoDB 서버는 BulkWrite의 각 단위 작업을 여러 스레드로 나누어 병렬로 처리하게 되며, 중간에 에러가 발생해도 나머지 작업을 멈추지 않고 모두 처리합니다.

```js
db.testA.bulkWrite(
  [
    {
      insertOne: {
        document: {
          name: 'bang',
          age: 20,
        },
      },
    },
    {
      insertOne: {
        document: {
          name: 'kim',
          age: 20,
          _id: 5,
        },
      },
    },
    {
      updateOne: {
        filter: { name: 'lee' },
        update: { $set: { age: 50 } },
      },
    },
  ],
  { ordered: false },
);
```

ordered 옵션은 단순히 각 하위 명령의 실행 순서만 결정하는 것이 아니라, 멀티 쓰레드로 병렬 처리를 할 수 있는지까지 결정합니다.

만약 MongoDB 라우터를 사용해야 하는 샤드 클러스터 환경에서 ordered 옵션을 true로 설정하면 샤드의 개수와 무관하게 BulkWrite의 각 하위 명령을 하나씩 차례대로 처리할 수밖에 없습니다.

하지만 ordered 옵션을 false로 설정하면 MongoDB 라우터는 BulkWrite의 하위 명령을 멀티 쓰레드로 여러 샤드에서 동시에 실행합니다.

---

이것으로 MongoDB의 BulkWrite에 대해서 알아보았습니다.

[Real MongoDB](https://wikibook.co.kr/real-mongodb/)

[BulkWrite](https://www.mongodb.com/docs/manual/reference/method/db.collection.bulkWrite/)

```toc

```
