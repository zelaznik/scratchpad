from __future__ import print_function

def _attr_or_property(cls, name):
    try:
        return getattr(cls, name)
    except AttributeError:
        return property()

def attr_reader(*attribute_names):
    ''' Class decorator:
        Adds a read-only way to access the equivalent
        private methods of the underlying class. '''
    from operator import attrgetter
    def maker(cls, name):
        private = '_%s__%s' % (cls.__name__, name)
        return attrgetter(private)

    def _attr_reader(cls):
        for name in attribute_names:
            obj = _attr_or_property(cls, name)
            fget = maker(cls, name)
            setattr(cls, name, obj.getter(fget))
        return cls
    return _attr_reader

from abc import ABCMeta
class Context(ABCMeta):
    @staticmethod
    def __new_init(dct):
        old_init = dct.get('__init__')
        if not old_init:
            def old_init(self, *args, **kw):
                pass

        def __init__(self, description, *args, **kw):
            self.description = description
            self._children = []
            old_init(self, *args, **kw)

        dct['__init__'] = __init__
        return dct

    def __new__(mcls, name, bases, dct):
        base_types = [b for b in bases if isinstance(b, Context)]
        if len(base_types) > 1:
            raise TypeError("Cannot resolve inheritance of multiple context types")
        elif len(base_types) == 1:
            parent = base_types[0]
            base_type = parent.base_type
            base_context = parent._context
            instances = parent._instances
        else:
            # This is for a base context type.
            base_type = None
            base_context = None
            instances = []

        dct = mcls.__new_init(dct)
        cls = ABCMeta.__new__(mcls, name, bases, dct)
        cls._instances = instances
        cls.base_type = base_type
        cls._context = base_context
        return cls

    def __iter__(cls):
        for instance in cls._instances:
            for item in instance:
                yield item

# This weird syntax allows metaclasses in both Python2 and 3
BaseContext = Context('BaseContext', () , {})

@attr_reader('level','parent')
class RecursiveContext(BaseContext):
    ''' Allows nesting of recursive with statements. '''
    __slots__ = ('__level','__parent','_children')

    def add_child(self, child):
        self._children.append(child)
        
    def set_level(self, level):
        self.__level = level

    def __enter__(self):
        cls = self.__class__
        parent = self.__parent = cls._context
        if parent is None:
            self.set_level(0)
            cls._instances.append(self)
        else:
            cls._context.add_child(self)
            self.set_level(parent.level + 1)
        cls._context = self
        return self

    def __exit__(self, exc_type, exc_val, traceback):
        cls = self.__class__
        cls._context = self.parent

    def __iter__(self):
        # Yields itself and then recursively
        #iterates through all the children.
        yield self
        for child in self._children:
            for item in child:
                yield item

    def __repr__(self):
        return '%s(%s)' %(type(self).__name__, self.description)

    @classmethod
    def display(cls):
        for instance in cls._instances:
            for item in instance:
                print('\t' * item.level, item)

class test_suite(RecursiveContext):
    pass

class description(test_suite):
    pass

class test(test_suite):
    pass
                
def main():
    """ The original idea of the function was to provide a way 
        to mimic the syntax of rSpec and Rails's jBuilder.
    """
    with description("Function.prototype.memoize"):
        with description("javascript implementation"):
            with test("now we're onto layer 3a"):
                pass
        with description("python implementation"):
            with description("layer 3b"):
                with test("layer 4b"):
                    pass
        with description("ruby implementation"):
            with description("layer 3c"):
                with test("layer 4c"):
                    pass
            with description("layer 3d"):
                with description("layer 4d"):
                    with test("layer 5d"):
                        pass
            with test("layer 3e"):
                pass
            
        with test("layer 2"):
            pass
    
    with description("Function.prototype.inherits"):
        with test("parent constructor is not called"):
            pass
        with test("and we are done!"):
            pass

if __name__ == '__main__':
    main()
    test_suite.display()