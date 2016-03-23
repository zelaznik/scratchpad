def method_missing(func):
    def __getattribute__(self, name):
        try:
            return object.__getattribute__(self, name)
        except AttributeError:
            pass
        return func(self, name)
    return __getattribute__
