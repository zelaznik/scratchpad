# -*- coding: utf-8 -*-
"""
Created on Fri Feb  5 13:46:23 2016

@author: Connect Four
"""

class Board(object):
    COL_CT = 7
    ROW_CT = 6

    @classmethod
    def in_range(cls, row, col):
        if row < 0 or row >= cls.ROW_CT:
            return False
        elif col < 0 or col >= cls.COL_CT:
            return False
        else:
            return True

    def __init__(self):
        self._columns = [[] for _ in xrange(self.COL_CT)]
        
    def get(self, r, c, alt=None):
        try:
            return self._columns[c][r]
        except IndexError:
            return alt

    def drop(self, piece, col_no):
        self._columns[col_no].append(piece)
    
    def row(self, i):
        return [self.get(col, i) for col in self._columns]
    
    def col(self, i):
        col = self._columns[i]
        return [self.get(col, k) for k in xrange(self.ROW_CT)]

    def edges(self):
        # Base Edge
        for col in xrange(self.COL_CT):
            yield 0 , col
        
        # Right Edge
        for row in xrange(1, self.ROW_CT):
            yield row , (self.COL_CT - 1)

        # Left Edge
        for row in xrange(1, self.ROW_CT):
            yield row, 0
            
    def diag(self, start_point, direction = 1):
        output = []
        r, c = start_point
        while self.in_range(r, c):
            output.append((r, c))
            r += 1
            c += direction
        return output
    
    def rows(self):
        for i in xrange(self.ROW_CT):
            yield self.row(i)
            
    def columns(self):
        for i in xrange(self.COL_CT):
            yield self.col(i)
        
    def diagonals(self):
        for direction in (1, -1):
            for edge in self.edges():            
                yield self.diag(edge, direction)
                
    def sequences(self):
        for row in self.rows():
            yield row
        for col in self.columns():
            yield col
        for diag in self.diagonals():
            yield diag

class Game(object):
    def __init__(self):
        self._current_player = 'X'
        self._players = ['X','O']
        self._board = Board()
        self.play()
        
    def play(self):
        while not self.over():
            self.take_turn()
        
    def take_turn(self):
        self.display()
        i = (self._current_player + 1) % len(self._players)
        self._current_player = i
        col = input("Please select a column, player %r: " % self.players[i])
        self.drop(self.players[i], col)
        
    @property
    def COL_CT(self):
        return self._board.COL_CT
    
    @property
    def ROW_CT(self):
        return self._board.ROW_CT
        
    def display(self):
        for row in xrange(self.ROW_CT - 1, -1, -1):
            values = [" %s " % self._board.get(row, col, "-") for col in xrange(self.COL_CT)]
            print("Row(%d): %s" % (row, "".join(values)))
        
        values = [" %d " % col for col in xrange(self.COL_CT)]
        print("  Cols: %s" % ("".join(values),))
            
    def drop(self, piece, col_no):
        self._board.drop(piece, col_no)
        
if __name__ == '__main__':
    g = Game()
    for _ in xrange(3):
        g.drop('X', 1)
    for _ in xrange(4):
        g.drop('O', 5)
    g.display()
    
    