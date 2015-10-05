''' Provides a least-recently-visited cache implementation in Python.
'''


class DoubleLink(object):
    __slots__ = ('key','val','prev','next')
    def __init__(self, key, val, prev=None, next=None):
        self.key, self.val = key, val
        self.prev, self.next = prev, next
        
    def __repr__(self):
        cls = self.__class__.__name__
        next = self.next.key if self.next else None
        prev = self.prev.key if self.prev else None
        args = (cls, self.key, self.val, prev, next)
        return '%s(key=%r, val=%r, prev=%r, next=%r)' % args

class LRUCache(object):
    def __init__(self, callback, limit=500):
        self.front, self.back = None, None
        self.callback = callback
        self.limit = limit
        self.d = {}

    def __len__(self):
        return len(self.d)
        
    def pluck(self, key):
        # Remove obj from cache
        # patch the adjacent links in the list.
        node = self.d[key]
        del self.d[key]
        
        if node is self.back:
            self.back = self.back.next
        if node is self.front:
            self.front = self.front.prev

        if node.prev:
            node.prev.next = node.next
        if node.next:
            node.next.prev = node.prev

        return node.val

    def trim(self):
        while len(self) > self.limit:
            node = self.back
            del self.d[node.key]

            node = node.next
            node.prev = None
            self.back = node
        
    def __getitem__(self, key):
        # Get live results or pull from cache
        if key in self.d:
            val = self.pluck(key)
        else:
            val = self.callback(key)

        # Move the node up to the top
        node = DoubleLink(key, val, self.front, None)
        if self.front:
            self.front.next = node
        self.front = node

        self.d[key] = node
        if not self.back:
            self.back = node                
        self.trim()
        return val

    def __contains__(self, key):
        return key in self.d
        
    def __repr__(self):
        items = [(k,self.d[k].val) for k in self]
        r = ', '.join('%r: %s' % i for i in items)
        return '%s({%s})' % (type(self).__name__, r)

    def __iter__(self):
        link = self.front
        while link:
            yield link.key
            link = link.prev

if __name__ == '__main__':
    from hashlib import md5 as _md5
    def md5(key):
        print("Getting MD5 for key: %s" % key)
        key = key.encode()
        return _md5(key).hexdigest()
    
    c = LRUCache(md5, 4)
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    for letter in alphabet:
        print(c[letter])
