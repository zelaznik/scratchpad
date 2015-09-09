def radix(words, i=0):

  #Get the base cases taken care of
  if len(words) < 2:
    return words
  elif i >= max(len(word) for word in words):
    return words

  #Place each of the words in the right bucket
  #leave a place at the beginning to accomodate blanks.
  buckets = [[] for c in range(26 + 1)]
  for word in words:
    if i < len(word):
      pos = ord(word[i]) - ord('a') + 1
    else:
      pos = 0

    buckets[pos].append(word)

  #Sort each of the buckets.
  for x, bucket in enumerate(buckets):
    buckets[x] = radix(bucket, i+1)

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

  print("radix == %r" % (radix(words),))
  print("sorted == %r" % (sorted(words),))
  input("pause...")
