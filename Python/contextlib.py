# Reimplementation of the Python contextlib module.

class ContextWrapper(object):
    def __init__(self, args, kw):
        self.args, self.kw = args, kw

    def __enter__(self):
        f = self.func(*self.args, **self.kw)
        self.step = step = iter(f)
        try:
            return next(step)
        except StopIteration:
            raise RuntimeError("Generator didn't yield.")

    def __exit__(self, *exc):
        try:
            next(self.step)
        except StopIteration:
            pass

    def __repr__(self):
        c = self.__class__.__name__
        args = ", ".join(repr(a) for a in self.args)
        kw = ", ".join("%s=%r" % (k,v) for k,v in self.kw.items())
        splitter = ", " if (args and kw) else ""
        return '%(c)s(%(args)s%(splitter)s%(kw)s)' % locals()

def contextmanager(func):
    from functools import wraps

    Wrapper = type(
        func.__name__,
        (ContextWrapper,),
        {'func': func})

    @wraps(func)
    def _wrapper(*args, **kw):
        return Wrapper(args, kw)

    return _wrapper

if __name__ == '__main__':
    # Real world examples.    
    @contextmanager
    def my_file(*args, **kw):
        f = open(*args, **kw)
        yield f
        f.close()

