// 集合
export default function MSet () {
  this.dataStore = []
  this.add = add
  this.remove = remove
  this.size = size
  this.show = show
  this.contains = contains
  this.union = union
  this.intersect = intersect
  this.subset = subset
  this.difference = difference
}
function add (data) {
  if (this.dataStore.indexOf(data) < 0) {
    this.dataStore.push(data)
    return true
  } else {
    return false
  }
}
function remove (data) {
  let pos = this.dataStore.indexOf(data)
  if (pos > -1) {
    this.dataStore.splice(pos, 1)
    return true
  } else {
    return false
  }
}
function size () {
  return this.dataStore.length
}
function show () {
  return this.dataStore
}
function contains (data) {
  if (this.dataStore.indexOf(data) > -1) {
    return true
  } else {
    return false
  }
}
// 并集
function union (set) {
  let tempSet = new MSet()
  for (let i = 0; i < this.dataStore.length; ++i) {
    tempSet.add(this.dataStore[i])
  }
  for (let i = 0; i < set.dataStore.length; ++i) {
    if (!tempSet.contains(set.dataStore[i])) {
      tempSet.dataStore.push(set.dataStore[i])
    }
  }
  return tempSet
}
// 交集
function intersect (set) {
  let tempSet = new MSet()
  for (let i = 0; i < this.dataStore.length; ++i) {
    if (set.contains(this.dataStore[i])) {
      tempSet.add(this.dataStore[i])
    }
  }
  return tempSet
}
// 子集
function subset (set) {
  if (this.size() > set.size()) {
    return false
  } else {
    for (let i = 0; i < this.dataStore.length; ++i) {
      if (!set.contains(this.dataStore[i])) {
        return false
      }
    }
  }
  return true
}
// 差集
function difference (set) {
  let tempSet = new MSet()
  for (let i = 0; i < this.dataStore.length; ++i) {
    if (!set.contains(this.dataStore[i])) {
      tempSet.add(this.dataStore[i])
    }
  }
  return tempSet
}
