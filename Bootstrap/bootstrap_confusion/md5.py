from hashlib import md5 as _md5
import sys

def file_md5(path):
    with open(path, 'rb') as src:
        data = src.read()
    return _md5(data).hexdigest()

if __name__ == '__main__':
    path = sys.argv[1]
    print(file_md5(path))