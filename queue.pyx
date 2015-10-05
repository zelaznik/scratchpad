cdef class Link:
    cdef public object val, next

    def __cinit__(self, val, next=None):
        self.val, self.next = val, next

cdef class Queue:
    cdef object front, back
    cdef int length

    def __cinit__(self):
        self.front, self.back = None, None
        self.length = 0

    def __len__(self):
        return self.length
        
    def __iter__(self):
        link = self.front
        while link:
            yield link.val
            link = link.next

    def __repr__(self):
        c = self.__class__.__name__
        return '%s(%r)' % (c, list(self))

    def push(self, val):
        self.length += 1
        link = Link(val, None)
        if not self.front:
            self.front = link
            self.back = link
        else:
            self.back.next = link
            self.back = link

    def pop(self):
        if not self.front:
            raise IndexError("pop from empty queue")

        self.length -= 1
        link = self.front
        self.front = self.front.next
        return link.val