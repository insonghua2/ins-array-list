[![npm](https://img.shields.io/npm/v/ins-array-list.svg?style=flat-square)](https://www.npmjs.com/package/ins-array-list)
[![Travis (.org)](https://img.shields.io/travis/insonghua2/ins-array-list.svg?style=flat-square)](https://travis-ci.org/insonghua2/ins-array-list)
[![Coveralls github](https://img.shields.io/coveralls/github/insonghua2/ins-array-list.svg?style=flat-square)](https://coveralls.io/github/insonghua2/ins-array-list)
[![npm](https://img.shields.io/npm/dt/ins-array-list.svg?style=flat-square)](https://www.npmjs.com/package/ins-array-list)

>   simple array list implementation in javascript like java 



## InStall

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
//ArrayList(listData,unqiueKey) default unqiueKey=id
const mList=new ArrayList(mData,'id')

const newItem={
  id:4,
  name:'Steve',
  gender:1
}
mList.add(newItem)
//get list data
console.log(mList.source)
// ...more  API as below

```

## API 

#### .add(item)
`Type:Object item`

It adds item to the end of the array list

#### .add(index,item)
`Type:Number index`

`Type:Object item`

It inserts item to the index of the array list


#### .addAll(items)
`Type:Object items`

It adds all items to the array list

#### .addAll(index,items)
`Type:Number index`

`Type:Object items`

It inserts items to the index of the array list

#### .remove(index)
`Type:Number index`

It removes the item at index of the array list.

#### .remove(item)
`Type:Object item`

It removes the item in the array list.

#### .removeAll(sublist)

It removes all items of sublist in the array list 

#### .removeIf(predicator)
`Type:Function(item,index)`

It removes the items that meets predicator.

#### .sort(predicator)
`Type:Function(a,b)`

It sorts the items that meet the predicator.

#### .iterate(iterator)
`Type:Function(item,index)`

It iterates all the elements in the array list and then do by iterator

#### .shuffle()

It shuflles the elements in the array list

#### .subList(formIndex, toEndIndex)
`Type:Number`

`Type:Number`

It returns new child array



#### .contains(item)
`Type:Object`

It returns whether the arrray list contains the item judge by the uniqueKey

#### .isEmpty()
It returns whether the arrray list is empty

#### .clear()
It removes all the items in the array list.

#### .get(index)
`Type:Number index`

It gets the element at index in the array list

#### .set(index,newItem)
`Type:Number index`

`Type:Object newItem`

It sets the newItem at index in the array list

#### .size()
It returns the length of the array list

#### .source
It returns the array list

## License

MIT © [insonghua2](https://github.com/neohua).





