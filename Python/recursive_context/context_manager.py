class contextmanager:
    ''' A pure python implementation of the contextmanager decorator.
        @contextmanager
        def hypotenuse(x, y):
            print("Do this before")
            yield (x**2+y**2)**0.5
            print("Do this after")

        with hypotenuse(3,4) as h:
            print("Hypotenuse == %s" % (h,))
        >>> "Do this before"
        >>> "Hypotenuse == 5.0"
        >>> "Do this after"
    '''

    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kw):
        # We can't call the function right away.
        # This needs to be deferred.
        self.args = args
        self.kw = kw
        return self

    def __enter__(self):
        f = self.func(*self.args, **self.kw)
        self.step = iter(f)
        return next(self.step) # Get back any value yielded from the function.

    def __exit__(self, err_type, err_val, traceback):
        # Forces the last line to run, but with nothing
        # left to yield, we get a StopIteration, which we handle.
        try:
            next(self.step)
        except StopIteration:
            pass
