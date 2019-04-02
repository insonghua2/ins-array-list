var expect = require('chai').expect
const ArrayList = require('../index')

describe('ins-array-list API test', () => {
  let testList
  let mList
  beforeEach('spring initing', (done) => {
    testList = [
      {
        id: 1,
        name: 'Alicy',
        gender: 2
      },
      {
        id: 2,
        name: 'Anna',
        gender: 2
      },
      {
        id: 3,
        name: 'Tom',
        gender: 1
      }
    ]
    mList = new ArrayList(testList, 'id')
    done()
  })
  describe('constructor', () => {
    it('should be ok if no value was setted', () => {
      const fn = function () {
        let mList = new ArrayList()
      }
      expect(fn).to.not.throw(Error)
      let mList = new ArrayList()
      expect(mList.source).to.deep.equal([])
      expect(mList.uniqueKey).to.equal('id')
    })
    it('should throw error if one or more list item has not unqiuey key', () => {
      const fn1 = function () {
        let mList = new ArrayList([1, 2, 3])
      }
      const fn2 = function () {
        let mList = new ArrayList([{ name: 'Anna' }])
      }
      const fn3 = function () {
        let mList = new ArrayList([{ id: 2, name: 'Anna' }], 'fooKey')
      }
      const fn4 = function () {
        let mList = new ArrayList([{ fooKey: 1, id: 1, name: 'Bar' }, { id: 2, name: 'Anna' }], 'fooKey')
      }
      // expect(fn1).to.throw(Error)
      expect(fn2).to.throw(Error)
      expect(fn3).to.throw(Error)
      expect(fn4).to.throw(Error)
    })
    it('should be ok if array list items are given with unqiue key', () => {
      const fn = function () {
        let mList = new ArrayList([{ id: 2, namge: 'Anna' }], 'id')
      }
      expect(fn).to.not.throw(Error)
    })
  })

  describe('public property .source', () => {
    it('should return the origin source of the array list', () => {
      expect(mList.source).to.deep.equal(testList)
    })
  })
  describe('size()', () => {
    it('should return the size of the array list', () => {
      expect(mList.size()).to.be.equal(3)
    })
  })
  describe('isReduplicated(obj)', () => {
    it('should throw error if obj has not the unique key of the array list', () => {
      const fn = function () {
        mList.isReduplicated({ name: 'Anna', gender: 2 })
      }
      expect(fn).to.throw(Error)
    })
    it('should throw the result whether obj is existed in the array list', () => {
      expect(mList.isReduplicated({ id: 2, name: 'Anna', gender: 2 })).to.be.true
      expect(mList.isReduplicated({ id: 8, name: 'Bar', gender: 1 })).to.be.false
    })
  })

  describe('contains(item)', () => {
    it('should return false when the array list is empty', () => {
      const unItem = { id: 1, name: 'Alicy', gender: 1 }
      mList.clear()
      expect(mList.contains(unItem)).to.be.false
    })
    it('should return false when the array list does not contain item', () => {
      const unItem = { id: 4, name: 'Steve', gender: 1 }
      expect(mList.contains(unItem)).to.be.false
    })
    it('should return when the array list contains item', () => {
      const item = { id: 2, name: 'Anna', gender: 2 }
      expect(mList.contains(item)).to.be.true
    })
  })
  describe('indexOf(item)', () => {
    it('should  throw error if item has not uniqueKey as the array list', () => {
      const fn = function () {
        mList.indexOf({ name: 'Anna', gender: 2 })
      }
      expect(fn).to.throw(Error)
    })
    it('should return -1 if item was not found as the array list', () => {
      const index = mList.indexOf({ id: 8, name: 'Foo', gender: 2 })
      expect(index).to.equal(-1)
    })
    it('should return correct indexif item was  found as the array list', () => {
      const index = mList.indexOf({ id: 2, name: 'Anna', gender: 2 })
      expect(index).to.equal(1)
    })
  })
  describe('clear()', () => {
    it('should clear all items in the array list', () => {
      mList.clear()
      expect(mList.size()).to.be.equal(0)
    })
  })
  describe('isEmpty()', () => {
    it('should return false when the array list is not empty', () => {
      expect(mList.isEmpty()).to.be.false
    })
    it('should return when the array list is empty ', () => {
      mList.clear()
      expect(mList.isEmpty()).to.be.true
    })
  })

  describe('get(index)', () => {
    it('should return null if index is out of bound', () => {
      expect(mList.get(-1)).to.be.null
    })
    it('should return item at index of the array list', () => {
      expect(mList.get(0)).to.deep.equal({
        id: 1,
        name: 'Alicy',
        gender: 2
      })
    })
  })

  describe('set(index,item)', () => {
    const newItem = { id: 4, name: 'Steve', gender: 2 }
    it('should throw error if given index is out of bound', () => {
      let fn = function () {
        mList.set(-1, newItem)
      }
      expect(fn).to.throw(Error)
      testList.forEach((testItem) => {
        expect(mList.source).to.deep.include.members([testItem])
      })
    })
    it('should return item at index of the array list', () => {
      mList.set(0, newItem)
      expect(mList.get(0)).to.deep.equal(newItem)
    })
  })

  describe('add(item)', () => {
    it('should throw error if item has not unique key', () => {
      const fn = function () {
        mList.add('foo')
      }
      expect(fn).to.throw(Error)
    })
    it('should return false if add dupulicated item', () => {
      expect(mList.add({ id: 3, name: 'Steve', gender: 1 })).to.be.false
    })
    it('should work when add new item', () => {
      expect(mList.add({ id: 4, name: 'Steve', gender: 1 })).to.be.true
    })
  })
  describe('add(index,item)', () => {
    it('should return false if add dupulicated item', () => {
      expect(mList.add(2, { id: 3, name: 'Steve', gender: 1 })).to.be.false
      expect(mList.size()).to.be.equal(3)
    })
    it('should thorw error of outOfBound', () => {
      var fn = function () {
        mList.add(5, { id: 4, name: 'Steve', gender: 1 })
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('should work when add correct item', () => {
      expect(mList.add(2, { id: 4, name: 'Steve', gender: 1 })).to.be.true
      expect(mList.size()).to.be.equal(4)
    })
  })
  describe('addAll(items)', () => {
    it('should return false if items contains dupulicated item', () => {
      var fn = function () {
        const items = [
          {
            id: 3,
            name: 'Steve',
            gender: 1
          },
          {
            id: 4,
            name: 'Miya',
            gender: 2
          }
        ]
        mList.addAll(items)
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('should work when given new items', () => {
      const items = [
        {
          id: 4,
          name: 'Steve',
          gender: 1
        },
        {
          id: 5,
          name: 'Miya',
          gender: 2
        }
      ]
      expect(mList.addAll(items)).to.be.true
      expect(mList.size()).to.be.equal(5)
    })
  })
  describe('addAll(index,items)', () => {
    let items, wrongItems
    beforeEach('init data', (done) => {
      wrongItems = [
        {
          id: 3,
          name: 'Steve',
          gender: 1
        },
        {
          id: 4,
          name: 'Miya',
          gender: 2
        }
      ]
      items = [
        {
          id: 4,
          name: 'Steve',
          gender: 1
        },
        {
          id: 5,
          name: 'Miya',
          gender: 2
        }
      ]
      done()
    })
    it('should throw error when given items contains dupulicated item', () => {
      var fn = function () {
        mList.addAll(1, wrongItems)
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('should thorw error of outOfBound', () => {
      var fn = function () {
        mList.addAll(6, items)
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('should work when add correct item', () => {
      expect(mList.addAll(1, items)).to.be.true
      expect(mList.size()).to.be.equal(5)
    })
  })
  describe('remove(index)', () => {
    it('should thorw error of outOfBound', () => {
      var fn1 = function () {
        mList.remove(5)
      }
      var fn2 = function () {
        mList.remove(-1)
      }
      expect(fn1).to.throw(Error)
      expect(fn2).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('works when given correct index', () => {
      expect(mList.remove(1)).to.be.true
      expect(mList.size()).to.be.equal(2)
    })
  })
  describe('remove(item)', () => {
    it('should thorw false if the array list does not cointains item', () => {
      var unExitItem = { id: 4, name: 'Steve', gender: 1 }
      expect(mList.remove(unExitItem)).to.be.false
      expect(mList.size()).to.be.equal(3)
    })
    it('works when given correct item', () => {
      expect(mList.remove({ id: 2, name: 'Anan', gender: 2 })).to.be.true
      expect(mList.size()).to.be.equal(2)
    })
  })
  describe('removeAll(items)', () => {
    it('should thorw error if some item of given items do not exsit in the array list', () => {
      let fn = function () {
        let unExitItem = { id: 4, name: 'Steve', gender: 1 }
        let items = [
          {
            id: 2,
            name: 'Anna',
            gender: 2
          }
        ]
        items.push(unExitItem)
        mList.removeAll(items)
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('works when given correct item', () => {
      let items = [
        {
          id: 2,
          name: 'Anna',
          gender: 2
        },
        {
          id: 3,
          name: 'Tom',
          gender: 1
        }
      ]
      expect(mList.removeAll(items)).to.be.true
      expect(mList.size()).to.be.equal(1)
    })
    it('works when given empty item', () => {
      let items = []
      expect(mList.removeAll(items)).to.be.false
      expect(mList.size()).to.be.equal(3)
    })
  })

  describe('removeIf(predicator)', () => {
    it('should throw error if predicator is not a function ', () => {
      const fn = function () {
        mList.removeIf('foo')
      }
      expect(fn).to.throw(Error)
    })
    it('should remove the items in the array list by predicator ', () => {
      mList.removeIf((item, i) => item.gender === 1)
      expect(mList.size()).to.be.equal(2)
    })
  })
  describe('iterate(iterator)', () => {
    it('should throw error if iterator is not a function ', () => {
      const fn = function () {
        mList.iterate('foo')
      }
      expect(fn).to.throw(Error)
    })
    it('should iterate the items in the array list and then call callback method iterator  ', () => {
      mList.iterate((item, i, arr) => {
        expect(item).to.be.deep.equal(testList[i])
        expect(item).to.be.deep.equal(arr[i])
      })
    })
  })

  describe('subList(formIndex, toEndIndex)', () => {
    it('should thorw false if formIndex or toEndIndex is out of bound ', () => {
      let fn1 = function () {
        mList.subList(-1, 1)
      }
      let fn2 = function () {
        mList.subList(0, 5)
      }
      expect(fn1).to.throw(Error)
      expect(fn2).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('should thorw false if formIndex is larger than toEndIndex', () => {
      let fn = function () {
        mList.subList(1, 0)
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })

    it('should return sub list from formIndex to toEndIndex of the array list ', () => {
      let subList = mList.subList(0, 1)
      expect(subList.length).to.be.equal(2)
      expect(mList.size()).to.be.equal(3)
    })
  })
  describe('shuffle()', () => {
    it('shuflles the items in the array list', () => {
      const items = [
        {
          id: 4,
          name: 'Steve',
          gender: 1
        },
        {
          id: 5,
          name: 'Miya',
          gender: 2
        }
      ]
      testList = testList.concat(items)
      mList.addAll(items)
      mList.shuffle()
      while (mList.get(0) === testList[0]) {
        mList.shuffle()
      }
      expect(mList.size()).to.be.equal(5)
      expect(testList.length).to.be.equal(5)
      testList.forEach((testItem, i) => {
        expect(mList.source).to.deep.include.members([testItem])
      })
      let isShuffled = testList.find((item, i) => {
        if (item.id !== mList.get(i).id) {
          return true
        }
      })
      expect(!!isShuffled).to.be.true
    })
  })

  describe('sort(predicator)', () => {
    it('should throw error if predicator is not a function ', () => {
      const fn = function () {
        mList.sort('foo')
      }
      expect(fn).to.throw(Error)
    })

    it('sort the items in the array list by predicator ', () => {
      mList.sort((a, b) => a.gender - b.gender)
      expect(mList.size()).to.be.equal(3)
      testList.forEach((testItem, i) => {
        expect(mList.source).to.deep.include.members([testItem])
      })
      let isSorted = testList.find((item, i) => {
        if (item.id !== mList.get(i).id) {
          return true
        }
      })
      expect(!!isSorted).to.be.true
    })
  })
})
