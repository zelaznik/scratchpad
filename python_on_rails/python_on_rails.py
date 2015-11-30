class table_pointer(object):
    valid_types = frozenset(['integer','float','datetime','string','text','binary'])
    def __init__(self, tbl):
        self.tbl = tbl

    def timestamps(self):
        self.tbl.make_column('timestamp','created_at')
        self.tbl.make_column('timestamp','updated_at')

    @method_missing
    def __getattribute__(self, name):
        if name not in self.valid_types:
            raise AttributeError(name)

        data_type = name
        def field_maker(col_name, **kw):
            self.tbl.make_column(data_type, col_name, **kw)
        field_maker.__name__ = name
        field_maker.__module__ = self
        return field_maker

    def __enter__(self):
        return self

    def __exit__(self, err_type, err_val, traceback):
        pass

class create_table(object):
    def __init__(self, table_name):
        self.table_name = table_name
        self.columns = OrderedDict()

    def make_column(self, data_type, col_name, **kw):
        self.columns[col_name] = data_type

    def commit(self):
        print(self.columns)

    def __enter__(self):
        return table_pointer(self)

    def __exit__(self, err_type, err_val, traceback):
        if not err_type: self.commit()

with create_table('users') as t:
    t.string('username', null=False)
    t.string('session_token', null=False)
    t.binary('attachment')
    t.timestamps()

if __name__ == '__main__':
    pass
