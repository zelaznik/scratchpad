def radix(words, i=0):
  print("Level = %d, words = %r" % (i, words))
  input("pause")
  if i >= 26 or len(words) < 2:
    return words

  #Place each of the words in the right bucket
  buckets = [[] for c in range(26)]
  for word in words:
    pos = ord(word[i]) - ord('a')
    buckets[pos].append(word)

  print("buckets == %r" % (buckets,))
  input("pause")

  #Sort each of the buckets.
  for i, bucket in enumerate(buckets):
    buckets[i] = radix(bucket, i+1)

  #Flatten the buckets back into single array
  results = []
  for bucket in buckets:
    for word in bucket:
      results.append(word)

  return results

if __name__ == '__main__':
  words = ['it',
   'was',
   'the',
   'best',
   'of',
   'times',
   'it',
   'was',
   'the',
   'worst',
   'far',
   'better',
   'rest']

  print(radix(words))