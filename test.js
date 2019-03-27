var expect = require('chai').expect
const ArrayList =require('./index')


describe('ins-array-list API test',()=>{
  let testList
  beforeEach('spring initing', (done) => {
      testList=[
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
    mList = new ArrayList(testList,'id')
    done()
  })
  describe('public property .source',()=>{
    it('should return the origin source of the array list',()=>{
      expect(mList.source).to.deep.equal(testList)
    })
  })
  describe('size()',()=>{
    it('should return the size of the array list',()=>{
      expect(mList.size()).to.be.equal(3)
    })
  })
  describe('contains(item)',()=>{
    it('should return false when the array list does not contain item',()=>{
      const unItem={id:4,name:'Steve',gender:1}
      expect(mList.contains(unItem)).to.be.false
    })
    it('should return when the array list contains item',()=>{
      const item={id:2,name:'Anna',gender:2}
      expect(mList.contains(item)).to.be.true
      

    })
  })
  describe('clear()',()=>{
    it('should clear all items in the array list',()=>{
      mList.clear();
      expect(mList.size()).to.be.equal(0)
    })
  })
  describe('isEmpty()',()=>{
    it('should return false when the array list is not empty',()=>{
      expect(mList.isEmpty()).to.be.false
    })
    it('should return when the array list is empty ',()=>{
      mList.clear()
      expect(mList.isEmpty()).to.be.true
    })
  })

  describe('get(index)',()=>{
    it('should return null if index is out of bound',()=>{
      expect(mList.get(-1)).to.be.null
    })
    it('should return item at index of the array list',()=>{
      expect(mList.get(0)).to.deep.equal({
        id:1,
        name:'Alicy',
        gender:2
      })
    })
  })

  describe('set(index,item)',()=>{
    const newItem={id:4,name:'Steve',gender:2}
    it('should throw error if given index is out of bound',()=>{
      let fn=function(){
        mList.set(-1,newItem)
      }
      expect(fn).to.throw(Error)
      testList.forEach((testItem)=>{
        expect(mList.source).to.deep.include.members([testItem])
      })
    })
    it('should return item at index of the array list',()=>{
      mList.set(0,newItem)
      expect(mList.get(0)).to.deep.equal(newItem)
    })
  })
  
  describe('add(item)',()=>{
      it('should return false if add dupulicated item',()=>{
        expect(mList.add({id:3,name:'Steve',gender:1})).to.be.false
      })
      it('should work when add new item',()=>{
        expect(mList.add({id:4,name:'Steve',gender:1})).to.be.true
      })
  })
  describe('add(index,item)',()=>{
    it('should return false if add dupulicated item',()=>{
      expect(mList.add(2,{id:3,name:'Steve',gender:1})).to.be.false
      expect(mList.size()).to.be.equal(3)
    })
    it('should thorw error of outOfBound',()=>{
      var fn=function(){
        mList.add(5,{id:4,name:'Steve',gender:1})
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('should work when add correct item',()=>{
      expect(mList.add(2,{id:4,name:'Steve',gender:1})).to.be.true
      expect(mList.size()).to.be.equal(4)
    })
  })
  describe('addAll(items)',()=>{
    it('should return false if items contains dupulicated item',()=>{
      var fn=function(){
        const items=[
          {
            id:3,
            name:'Steve',
            gender:1
          },
          {
            id:4,
            name:'Miya',
            gender:2
          }
        ]
        mList.addAll(items)
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('should work when given new items',()=>{
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
      expect(mList.addAll(items)).to.be.true
      expect(mList.size()).to.be.equal(5)


    })
  })
  describe('addAll(index,items)',()=>{
    let items,wrongItems
    beforeEach('init data', (done) => {
      wrongItems=[
        {
          id:3,
          name:'Steve',
          gender:1
        },
        {
          id:4,
          name:'Miya',
          gender:2
        }
      ]
      items=[
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
      done()
    })
    it('should throw error when given items contains dupulicated item',()=>{
      var fn=function(){
        mList.addAll(1,wrongItems)
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('should thorw error of outOfBound',()=>{
      var fn=function(){
        mList.add(5,items)
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('should work when add correct item',()=>{
      expect(mList.addAll(1,items)).to.be.true
      expect(mList.size()).to.be.equal(5)
    })
  })
  describe('remove(index)',()=>{
    it('should thorw error of outOfBound',()=>{
      var fn1=function(){
        mList.remove(5)
      }
      var fn2=function(){
        mList.remove(-1)
      }
      expect(fn1).to.throw(Error)
      expect(fn2).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('works when given correct index',()=>{
      expect(mList.remove(1)).to.be.true
      expect(mList.size()).to.be.equal(2)
    })
  })
  describe('remove(item)',()=>{
    it('should thorw false if the array list does not cointains item',()=>{
      var unExitItem={id:4,name:'Steve',gender:1}
      expect(mList.remove(unExitItem)).to.be.false
      expect(mList.size()).to.be.equal(3)
    })
    it('works when given correct item',()=>{
      expect(mList.remove({id:2,name:'Anan',gender:2})).to.be.true
      expect(mList.size()).to.be.equal(2)
    })
  })
  describe('removeAll(items)',()=>{
    it('should thorw error if some item of given items do not exsit in the array list',()=>{
      let fn=function(){
        let unExitItem={id:4,name:'Steve',gender:1}
        let items=[
          {
            id:2,
            name:'Anna',
            gender:2
          },
        ]
        items.push(unExitItem)
        mList.removeAll(items)
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('works when given correct item',()=>{
      let items=[
        {
          id:2,
          name:'Anna',
          gender:2
        },
        {
          id:3,
          name:'Tom',
          gender:1
        }
      ]
      expect(mList.removeAll(items)).to.be.true
      expect(mList.size()).to.be.equal(1)
    })
  })

  describe('removeIf(predicator)',()=>{
    it('should remove the items in the array list by predicator ',()=>{
      mList.removeIf((item,i)=>item.gender===1)
      expect(mList.size()).to.be.equal(2)
    })
  })
  describe('iterate(iterator)',()=>{
    it('should iterate the items in the array list and then call callback method iterator  ',()=>{
      mList.iterate((item,i)=>{
        expect(item).to.be.deep.equal(testList[i])
      })
    })
  })
  


  describe('subList(formIndex, toEndIndex)',()=>{
    it('should thorw false if formIndex or toEndIndex is out of bound ',()=>{
      let fn1=function(){
        mList.subList(-1,1)
      }
      let fn2=function(){
        mList.subList(0,5)
      }
      expect(fn1).to.throw(Error)
      expect(fn2).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })
    it('should thorw false if formIndex is larger than toEndIndex',()=>{
      let fn=function(){
        mList.subList(1,0)
      }
      expect(fn).to.throw(Error)
      expect(mList.size()).to.be.equal(3)
    })

    it('should return sub list from formIndex to toEndIndex of the array list ',()=>{
      let sub_list=mList.subList(0,1)
      expect(sub_list.length).to.be.equal(2)
      expect(mList.size()).to.be.equal(3)
    })
  })
  describe('shuffle()',()=>{
    it('shuflles the items in the array list',()=>{
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
      testList=testList.concat(items)
      mList.addAll(items)
      mList.shuffle()
      mList.shuffle()

      expect(mList.size()).to.be.equal(5)
      expect(testList.length).to.be.equal(5)
      testList.forEach((testItem,i)=>{
        expect(mList.source).to.deep.include.members([testItem])
      })
      let isShuffled=testList.find((item,i)=>{
        if(item.id!==mList.get(i).id){
          return true
        }
      })
      expect(!!isShuffled).to.be.true
    })
  })

  describe('sort(predicator)',()=>{
    it('sort the items in the array list by predicator ',()=>{
      
      mList.sort((a,b)=>a.id<b.id)
      expect(mList.size()).to.be.equal(3)
      testList.forEach((testItem,i)=>{
        expect(mList.source).to.deep.include.members([testItem])
      })
      let isSorted=testList.find((item,i)=>{
        if(item.id!==mList.get(i).id){
          return true
        }
      })
      expect(!!isSorted).to.be.true
    })
  })


  

  
})


