cdef class itemgetter:
    cdef object key
    def __cinit__(self, key):
        self.key = key

    def __call__(self, obj):
        return obj[self.key]

cdef class enumerate:
    cdef object items
    cdef int i

    def __cinit__(self, seq):
        self.i = 0
        self.items = iter(seq)

    def __iter__(self):
        return self
    
    def __next__(self):
        val = next(self.items)
        i = self.i
        self.i += 1
        return (i, val)

    next = __next__

cdef class property:
    cdef object fget, fset, fdel, __doc__
    def __cinit__(self, fget=None, fset=None, fdel=None, doc=None):
        self.fget, self.fset, self.fdel = fget, fset, fdel
        if doc is None and fget is not None:
            doc = fget.__doc__
        self.__doc__ = doc

    def __get__(self, obj, cls):
        if obj is None:
            return self

        try:
            return self.fget(obj)
        except TypeError as e:
            if self.fget is not None:
                raise

        raise AttributeError("unreadable attribute")

    def __set__(self, obj, value):
        try:
            self.fset(obj, value)
            return
        except TypeError as e:
            if self.fset is not None:
                raise

        raise AttributeError("can't set attribute")

    def __delete__(self, obj):
        try:
            self.fdel(obj)
            return
        except TypeError as e:
            if self.fdel is not None:
                raise

        raise AttributeError("can't delete attribute")

    def getter(self, fget):
        return type(self)(fget, self.fset, self.fdel, self.__doc__)

    def setter(self, fset):
        return type(self)(self.fget, fset, self.fdel, self.__doc__)

    def deleter(self, fdel):
        return type(self)(self.fget, self.fset, fdel, self.__doc__)

from functools import wraps

cdef class classmethod:
    cdef object fget, wrapped

    def __cinit__(self, fget):
        self.fget = fget

    def __get__(self, obj, cls):
        if obj is None:
            return self

        if self.wrapped:
            return self.wrapped

        @wraps(self.fget)
        def wrapped(*args, **kw):
            return self.fget(cls, *args, **kw)

        self.wrapped = wrapped
        return wrapped

cdef class staticmethod:
    cdef object fget
    def __cinit__(self, fget):
        self.fget = fget

    def __get__(self, obj, cls):
        return self.fget
