def is_sorted_desc(arr):
    for i in range(1, len(arr)):
        if arr[i] > arr[i - 1]:
            return False
    return True

def _make_change(amount, coins = ()):
    assert is_sorted_desc(coins)
    if amount < 0:
        raise ValueError("Amount must be non-negative.")
    elif (amount > 0) and (not coins):
        raise ValueError("Cannot make change with no coins.")
    elif amount == 0:
        return ()
    else:
        coins = tuple(coins)

    success = False

    try:
        change_with_first_coin = coins[:1] + _make_change(amount - coins[0], coins)
        len_with_first_coin = len(change_with_first_coin)
        success = True
    except ValueError:
        len_with_first_coin = float('inf')    

    try:
        change_drop_first_coin = _make_change(amount, coins[1:])
        len_drop_first_coin = len(change_drop_first_coin)
        success = True
    except ValueError:
        len_drop_first_coin = float('inf')

    if not success:
        msg = "Impossible to make change for %s, with %r"
        raise ValueError(msg % (amount, coins))

    if len_with_first_coin <= len_drop_first_coin:
        return change_with_first_coin
    else:
        return change_drop_first_coin
    
def make_change(amount, coins=()):
    assert is_sorted_desc(coins), "Coins not sorted in desc order."
    return _make_change(amount, coins)