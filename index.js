// methods override
function addMethod (obj, fnName, fn) {
  var old = obj[fnName]
  obj[fnName] = function () {
    if (arguments.length === fn.length) {
      return fn.apply(this, arguments)
    } else if (typeof old === 'function') {
      return old.apply(this, arguments)
    }
  }
}

// private methods
const _outOfBound = Symbol('_outOfBound')
const hasOwn = {}.hasOwnProperty

class ArrayList {
  /**
   *Creates an instance of ArrayList.
   * @param {Object[]} listData
   * @param {string} uniqueKey
   * @memberof ArrayList
   */
  constructor (listData = [], uniqueKey = 'id') {
    if (listData && !Array.isArray(listData)) {
      throw new TypeError('Expect Array,got' + typeof listData)
    }

    this.uniqueKey = uniqueKey
    let len = listData.length
    let hasError = false
    while (len > 0 && !hasError) {
      if (!hasOwn.call(listData[len - 1], this.uniqueKey)) {
        hasError = true
        throw new Error('one or more list item has not unqiuey key as' + this.uniqueKey)
      }
      len--
    }
    // this.listData = listData ? [...listData] : []
    this.listData = listData.slice()

    addMethod(this, 'add', function (item) {
      if (this.isReduplicated(item)) {
        return false
      }
      this.listData.push(item)
      return true
    })
    addMethod(this, 'add', function (index, item) {
      if (this.isReduplicated(item)) {
        return false
      }
      if (this[_outOfBound](index)) {
        throw new Error(`index is out of bound`)
      }
      this.listData.splice(index, 0, item)
      return true
    })
    addMethod(this, 'addAll', function (items) {
      const isReduplicated = items.find(item => {
        if (this.isReduplicated(item)) {
          return true
        }
      })
      if (isReduplicated) {
        throw new Error('should not contains deplicated item')
      }

      this.listData = this.listData.concat(items)
      return true
    })
    addMethod(this, 'addAll', function (index, items) {
      const isReduplicated = items.find(item => {
        if (this.isReduplicated(item)) {
          return true
        }
      })
      if (isReduplicated) {
        throw new Error('should not contains deplicated item')
      }
      if (this[_outOfBound](index)) {
        throw new Error('index is out of bound')
      }
      Array.prototype.splice.apply(this.listData, [index, 0, ...items])
      return true
    })
  }

  /**
   *
   * private methods inner class
   * @param {number} index
   * @returns {Boolean}
   * @memberof ArrayList
   */
  [_outOfBound] (index) {
    return index < 0 || index > this.size() - 1
  }

  isReduplicated (obj) {
    const key = this.uniqueKey
    if (!hasOwn.call(obj, key)) {
      throw new Error('Expected object has property of' + key)
    }
    const found = this.listData.find(item => item[key] === obj[key])
    return !!found
  }

  /**
   *
   *
   * @memberof ArrayList
   */
  clear () {
    this.listData = []
  }

  /**
   *
   *
   * @param {(Object|number)} arg
   * @returns {Boolean}
   * @memberof ArrayList
   */
  remove (arg) {
    const type = typeof arg
    if (type === 'object' && !this.isReduplicated(arg)) {
      return false
    }
    const index = type === 'number' ? arg : this.indexOf(arg)
    if (this[_outOfBound](index)) {
      throw new Error(`index is out of bound`)
    }
    this.listData.splice(arg, 1)
    return true
  }

  /**
   *
   *
   * @param {ObjectArray} list
   * @returns {Boolean} result
   * @memberof ArrayList
   */
  removeAll (list) {
    if (!list.length) {
      return false
    }
    const isUnExist = list.find(item => {
      if (!this.isReduplicated(item)) {
        return true
      }
    })
    if (isUnExist) {
      throw new Error('should not contains unexisted item')
    }

    for (let i = 0; i < list.length; i++) {
      this.remove(list[i])
    }
    return true
  }

  /**
   *
   * @callback predicatorCb
   * @param {Object} item
   * @param {number} index
   * @param {predicatorCb} predicator
   * @memberof ArrayList
   */
  removeIf (predicator) {
    if (typeof predicator !== 'function') {
      throw new TypeError('Expected Function, got ' + typeof predicator)
    }

    this.listData = this.listData.filter((item, i) => {
      return !predicator(item, i)
    })
  }

  /**
   *
   *
   * @param {number} formIndex
   * @param {number} toEndIndex
   * @returns
   * @memberof ArrayList
   */
  subList (formIndex, toEndIndex) {
    if (this[_outOfBound](formIndex)) {
      throw new Error('index is out of bound')
    }
    if (this[_outOfBound](toEndIndex)) {
      throw new Error('index is out of bound')
    }
    if (formIndex > toEndIndex) {
      throw new Error('formIndex should not larger than toEndIndex ')
    }
    return this.listData.slice(formIndex, toEndIndex + 1)
  }

  /**
   *
   *
   * @param {Function} iterator
   * @memberof ArrayList
   */
  iterate (iterator) {
    if (typeof iterator !== 'function') {
      throw new TypeError('Expected Function, got ' + typeof iterator)
    }
    for (let i = 0; i < this.size(); i++) {
      iterator(this.get(i), i, this.source)
    }
  }

  /**
   *
   *
   * @param {Function} predicator
   * @memberof ArrayList
   */
  sort (predicator) {
    if (typeof predicator !== 'function') {
      throw new TypeError('Expected Function, got ' + typeof predicator)
    }
    // sortBy shell sort
    let arr = this.listData
    let len = arr.length
    let item
    let gap = 1
    while (gap < len / 5) {
      gap = gap * 5 + 1
    }
    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
      for (var i = gap; i < len; i++) {
        item = arr[i]
        for (var j = i - gap; j >= 0 && predicator(item, arr[j]) < 0; j -= gap) {
          arr[j + gap] = arr[j]
        }
        arr[j + gap] = item
      }
    }
  }

  /**
   *
   *
   * @memberof ArrayList
   */
  shuffle () {
    let rand
    let tmp
    let arr = this.listData.slice()
    let len = arr.length
    let ret = arr.slice()

    while (len) {
      rand = Math.floor(Math.random() * len--)
      tmp = ret[len]
      ret[len] = ret[rand]
      ret[rand] = tmp
    }
    this.listData = ret.slice()
  }

  /**
   *
   *
   * @param {Object} item
   * @returns
   * @memberof ArrayList
   */
  contains (item) {
    if (!this.listData.length) {
      return false
    }
    const key = this.uniqueKey
    if (!hasOwn.call(item, key)) {
      return new Error('Expected object has property of' + key)
    }
    const isFound = this.listData.find(data => {
      return data[key] === item[key]
    })
    return !!isFound
  }

  /**
   *
   *
   * @param {Object} obj
   * @returns
   * @memberof ArrayList
   */
  indexOf (obj) {
    const key = this.uniqueKey
    if (!hasOwn.call(obj, key)) {
      throw new Error('Expected object has property of' + key)
    }
    const index = this.listData.findIndex((item, i) => {
      return item[key] === obj[key]
    })
    return index
  }

  /**
   *
   *
   * @returns
   * @memberof ArrayList
   */
  size () {
    return this.listData.length
  }

  /**
   *
   *
   * @returns
   * @memberof ArrayList
   */
  isEmpty () {
    return this.size() === 0
  }

  /**
   *
   *
   * @param {number} index
   * @returns
   * @memberof ArrayList
   */
  get (index) {
    if (this[_outOfBound](index)) {
      return null
    }
    return this.listData[index]
  }

  /**
   *
   *
   * @param {number} index
   * @param {Object} item
   * @returns
   * @memberof ArrayList
   */
  set (index, item) {
    if (this[_outOfBound](index)) {
      throw new Error('index is out of bound')
    }
    this.listData[index] = item
  }

  /**
   *
   * @returns {ObjectArray}
   * @memberof ArrayList
   */
  get source () {
    return this.listData
  }
  set source (listData) {}
}

module.exports = ArrayList
