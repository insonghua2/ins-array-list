[![npm](https://img.shields.io/npm/v/ins-array-list.svg?style=flat-square)](https://www.npmjs.com/package/ins-array-list)
[![Travis (.org)](https://img.shields.io/travis/insonghua2/ins-array-list.svg?style=flat-square)](https://travis-ci.org/insonghua2/ins-array-list)
[![Coveralls github](https://img.shields.io/coveralls/github/insonghua2/ins-array-list.svg?style=flat-square)](https://coveralls.io/github/insonghua2/ins-array-list)
[![npm](https://img.shields.io/npm/dt/ins-array-list.svg?style=flat-square)](https://www.npmjs.com/package/ins-array-list)

>   Simple array list implementation in Javascript like in Java ,Only 8kb size.
>
> *When called API,as below scene*:
> 1. `index` is out of bound 
> 2. `item` has not unique key
> 3. add an reduplicated or remove unExisted item
>
> it will fail and throw corresponding error which helps developers to catch and konw what happens



## Install

```bash
  $ npm install ins-array-list --save
```

## Usage

```js
const ArrayList=require('ins-array-list')
const mData=[
  {
    id:1,
    name:'Alicy',
    gender:2
  },
  {
    id:2,
    name:'Anna',
    gender:2
  },
  {
    id:3,
    name:'Tom',
    gender:1
  },
]
//ArrayList(listData,unqiueKey) unqiueKey default "id"
// const mList=new ArrayList(mData)
const mList=new ArrayList(mData,'id')
//do something by api below ...

//get list data after each api operation if wanted
console.log(mList.source)
// ...more  API as below

```

## API 

#### .add(item)
`Type:Object item`

It adds item to the end of the array list

```js
  const item={
  id:4,
  name:'Steve',
  gender:1
  }
  mList.add(item)//=>true
```


#### .add(index,item)
`Type:Number index`

`Type:Object item`

It inserts item to the index of the array list

```js
  const item={
  id:4,
  name:'Steve',
  gender:1
  }
  mList.add(1,item)//=>true
```


#### .addAll(items)
`Type:Object items`

It adds all items to the array list
```js
  const items=[
    {
    id:4,
    name:'Steve',
    gender:1
    },
    {
    id:5,
    name:'Miya',
    gender:2
    }
  ]
  mList.addAll(items)//=>true
```
#### .addAll(index,items)
`Type:Number index`

`Type:Object items`

It inserts items to the index of the array list
```js
  const items=[
    {
    id:4,
    name:'Steve',
    gender:1
    },
    {
    id:5,
    name:'Miya',
    gender:2
    }
  ]
  mList.addAll(1,items)//=>true
```

#### .remove(index)
`Type:Number index`

It removes the item at index of the array list.
```js
  //say mList.size()==5
  mList.remove(3)//=>true
```

#### .remove(item)
`Type:Object item`

It removes the item in the array list.
```js
  //say mList.size()==5
  const item={
    id:4,
    name:'Steve',
    gender:1
  }
  mList.remove(item)//=>true
```

#### .removeAll(sublist)

It removes all items of sublist in the array list 
```js
  //say mList.size()==5
  const subList=[
    {
    id:1,
    name:'Alicy',
    gender:2
    },
    {
      id:3,
      name:'Tom',
      gender:1
    },
    {
      id:4,
      name:'Steve',
      gender:1
    }
  ]
  mList.removeAll(subList)//=>true
```

#### .removeIf(predicator)
`Type:Function(item,index)`

It removes the items that meets predicator.
```js
  //remove then gender==1
  mList.removeIf((item,index)=>{
    return item.gender==1
  })
```

#### .sort(predicator)
`Type:Function(a,b)`

It sorts the items that meet the predicator.it used like normal
arr.sort((index,i)=>{...}) but inner implementation is sorted by shell method,which make it sort highly efficient

```js
  //sortBy gender:item with gender of 1 is before one with gender of 2
  mList.sort((a,b)=>{
    return a.gender-b.gender
  })
```

#### .iterate(iterator)
`Type:Function(item,index)`

It iterates all the elements in the array list and then do by iterator
```js
  //sort by gender
  mList.iterate((item,index,arr)=>{
    //do something
    console.log(`item ${index}:`+item)
  })
```

#### .shuffle()

It shuffles the elements in the array list
```js
  mList.shuffle()
```

#### .subList(formIndex, toEndIndex)
`Type:Number`

`Type:Number`

It returns new child array without change source
```js
  //say mList.size()==5
  const newItems=mList.subList(1,3)
  console.log(newItems.length)//=>3
  mList.size()//=>5
```



#### .contains(item)
`Type:Object`

It returns whether the arrray list contains the item judge by the uniqueKey
```js
  mList.contains({id:1,name:'Alicy',gender:2})//=>true
```


#### .isEmpty()
It returns whether the arrray list is empty
```js
  mList.isEmpty()//=>false
  mList.clear()
  mList.isEmpty()//=>true
```

#### .clear()
It removes all the items in the array list.
```js
  mList.isEmpty()//=>false
  mList.clear()
  mList.isEmpty()//=>true
```

#### .indexOf(item)
`Type:Object item`

It returns the index of item in the array list
```js
  mList.indexOf({id:2,name:'Anna',gender:2})//=>1
```

#### .get(index)
`Type:Number index`

It gets the element at index in the array list
```js
  mList.get(1)//=>{id:2,name:'Anna',gender:2}
```

#### .set(index,newItem)
`Type:Number index`

`Type:Object newItem`

It sets the newItem at index in the array list
```js
  mList.set(1,{id:2,name:'Anny',gender:2})
```

#### .size()
It returns the length of the array list
```js
  mList.size()//=>3
```

#### .source
It returns the array list

## License

MIT © [insonghua2](https://github.com/neohua).





