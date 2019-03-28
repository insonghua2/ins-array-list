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

class ArrayList {
  /**
   *Creates an instance of ArrayList.
   * @param {Object[]} listData
   * @param {string} uniqueKey
   * @memberof ArrayList
   */
  constructor (listData, uniqueKey) {
    this.listData = [...listData] || []
    this.uniqueKey = uniqueKey || 'id'

    addMethod(this, 'add', function (item) {
      if (this.isDeplicated(item)) {
        return false
      }
      this.listData.push(item)
      return true
    })
    addMethod(this, 'add', function (index, item) {
      if (this.isDeplicated(item)) {
        return false
      }
      if (this[_outOfBound](index)) {
        // return false;
        throw new Error(`index is out of bound`)
      }
      this.listData.splice(index, 0, item)
      return true
    })
    addMethod(this, 'addAll', function (items) {
      const isDeplicated = items.find((item) => {
        if (this.isDeplicated(item)) {
          return true
        }
      })
      if (isDeplicated) {
        throw new Error('should not contains deplicated item')
      }

      this.listData = this.listData.concat(items)
      return true
    })
    addMethod(this, 'addAll', function (index, items) {
      const isDeplicated = items.find((item) => {
        if (this.isDeplicated(item)) {
          return true
        }
      })
      if (isDeplicated) {
        throw new Error('should not contains deplicated item')
      }
      if (this[_outOfBound](index)) {
        return false
      }
      Array.prototype.splice.apply(this.listData, [index, 0, ...items])
      return true
    })
  }

  /**
   *
   * private methods inner class
   * @param {*} index
   * @returns
   * @memberof ArrayList
   */
  [_outOfBound] (index) {
    return index < 0 || index > this.size() - 1
  }

  isDeplicated (obj) {
    const key = this.uniqueKey
    const found = this.listData.find((item) => item[key] === obj[key])
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
    if (type === 'object' && !this.isDeplicated(arg)) {
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
    const isUnExist = list.find((item) => {
      if (!this.isDeplicated(item)) {
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
    if (typeof predicator === 'function') {
      this.listData = this.listData.filter((item, i) => {
        return !predicator(item, i)
      })
    } else {
      throw new Error('predicator must be a function')
    }
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
      throw new Error('predicator must be a function')
    }
    for (let i = 0; i < this.size(); i++) {
      iterator(this.get(i), i)
    }
  }

  /**
   *
   *
   * @param {Function} predicator
   * @memberof ArrayList
   */
  sort (predicator) {
    if (typeof predicator === 'function') {
      this.listData.sort(predicator)
    }
  }

  /**
   *
   *
   * @memberof ArrayList
   */
  shuffle () {
    this.listData.sort((a, b) => Math.random() - 0.5)
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
