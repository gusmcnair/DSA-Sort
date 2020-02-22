/*



1. Understanding merge sort
Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

What is the resulting list that will be sorted after 3 recursive calls to mergesort?

[21, 1, 26, 45] (This assumes that the first call, which includes all 16 numbers, is counted, otherwise the answer is [21, 1].)

What is the resulting list that will be sorted after 16 recursive calls to mergesort?

[9]

What are the first 2 lists to be merged?

[21] and [1]

Which two lists would be merged on the 7th merge?
[1, 21, 26, 45] and [2, 9, 28, 29]


2. Understanding quicksort
1) Suppose you are debugging a quicksort implementation that is supposed to sort an array in ascending order. 
After the first partition step has been completed, the contents of the array is in the following order: 3 9 1 14 17 24 22 20. 
Which of the following statements is correct about the partition step? Explain your answer.

The pivot could have been 17, but could not have been 14
The pivot could have been either 14 or 17
Neither 14 nor 17 could have been the pivot
The pivot could have been 14, but could not have been 17

It could be either 17 or 14, as each have only larger numbers to their right and smaller ones to their left. This is only the case for these two numbers.

2) Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12 show the resulting list after the second 
partitioning according to the quicksort algorithm.

When using the last item on the list as a pivot
[3, 9, 10, 12, 14, 17, 13, 15, 19, 16]

When using the first item on the list as a pivot
[10, 3, 9, 12, 13, 14, 17, 15, 19, 16]
*/

//3. Implement quicksort

function quickSort(array, start = 0, end = array.length){
    if(start >= end){return array}
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
  }

  function partition(array, start, end){
    const pivot = array[end - 1];
    let j = start;
    for(let i = start; i < end - 1; i ++){
      if(array[i] < pivot){
        swap(array, i ,j);
        j++
      }
    }
    swap(array, end - 1, j);
    return j;
  }

  function swap(array, i, j){
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp;
  }

//4. Implement merge sort

function mergeSort(array){
    if(array.length <=1){
      return array
    }
    const middle = Math.floor(array.length / 2)
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length)
    
    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right, array)
  }

function merge(left, right, array){
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    
    while(leftIndex < left.length && rightIndex < right.length){
      if(left[leftIndex] < right[rightIndex]){
        array[outputIndex ++] = left[leftIndex++]
      } else {
        array[outputIndex ++] = right[rightIndex ++]
      }}
     for (let i = leftIndex; i < left.length; i ++){
        array[outputIndex ++] = left[i]}
     
     for(let i = rightIndex; i < right.length; i ++){
       array [outputIndex ++] = right[i]}
    return array
  }

//5. Merge sort a linked list

function mergeSort(linkedList) {
    if(listSize(linkedList) <= 1){
      return linkedList
    }
    const middle = Math.floor(listSize(linkedList)/2)
    let LeftList = new LinkedList()
    let RightList = new LinkedList()
    let prevNode = linkedList.head
    let currNode = linkedList.head
    let index = 0
    while(currNode !== null){
      if(index < middle){LeftList.insertLast(currNode.value)}
      if(index >= middle){RightList.insertLast(currNode.value)}
      prevNode = currNode
      currNode = currNode.next
      index ++
    }
     return merge(mergeSort(LeftList), mergeSort(RightList))
  }

  function merge (LeftList, RightList) {
    let leftNode = LeftList.head
    let rightNode = RightList.head
    let Result = new LinkedList()
    while(leftNode !== null && rightNode !== null){
      if(leftNode.value < rightNode.value){
        Result.insertLast(leftNode.value)
        LeftList.remove(leftNode.value)
        leftNode = LeftList.head
      } else {
        Result.insertLast(rightNode.value)
        RightList.remove(rightNode.value)
        rightNode = RightList.head
      }}
    while(leftNode !== null){
      Result.insertLast(leftNode.value)
      LeftList.remove(leftNode.value)
      leftNode = LeftList.head
    }
    while(rightNode !== null){
      Result.insertLast(rightNode.value)
      RightList.remove(rightNode.value)
      rightNode = RightList.head
    }
    return Result
  }



  //6. Bucket sort

  function bucketSort(array, min, max){
    let buckets = []
    let finArr = []
    let bucketsCount = Math.floor((max -min)/ 4) + 1;
    for(let i = 0; i < bucketsCount; i ++){
      buckets[i] = []
    }
    
    for(let i = 0; i < array.length; i++){
      buckets[Math.floor((array[i] - min)/4)].push(array[i])
    }
    array.length = 0;
    for(let i = 0; i < buckets.length; i ++){
      mergeSort(buckets[i])
      finArr.push(buckets[i])
    }
    let result = [].concat.apply([], finArr)
    return result
  }



  //7. Shuffle an array in place

  function shuffle(array, start = 0, end = array.length){
    if(start >= end){return array}
    const middle = shufflePar(array, start, end);
    array = shuffle(array, start, middle)
    array = shuffle(array, middle + 1, end)
    return array;
  }
  
  function shufflePar(array, start, end){
    const pivot = array[end - 1]
    let j = start
    for (let i = start; i < end - 1; i++){
     if(array[i] < pivot){
        randomSwap(array, i, j);
       j++
        }
    }
    randomSwap(array, end - 1, j);
    return j;
  }
  
  function randomSwap(array, i, j){
    const randomNum = Math.floor(Math.random() * array.length)
    const tmp = array[i]
    array[i] = array[randomNum]
    array[randomNum] = tmp;
  }



  //8. Sorting books

  let booksArray = ['Bob Dole: A Life', 'A Life: Bob Dole', 'Dole Life: A Bob', 'Life Bob: A Dole', 'Something Completely Different: A Book Unrelated to Bob Dole', 'Harry Potter']


function sortBooks(booksArray){
  if(booksArray.length <= 1){
    return booksArray
  }
  const middle = Math.floor(booksArray.length/2)
  let left = booksArray.slice(0, middle)
  let right = booksArray.slice(middle, booksArray.length)
  
  left = sortBooks(left)
  right = sortBooks(right)
  
  return merge(left, right, booksArray)
}


