require 'rspec'
require 'special_numbers'

describe "ones_places" do
  describe "handles large numbers" do
    it "ones_places(2**50 - 1) yields range [49,48,47,...2,1,0]" do
      expect(ones_places(2**50-1)).to eq((0..49).to_a.reverse)
    end
    it "ones_places(2**50 - 2) yields range [49,48,47,...2,1]" do
      expect(ones_places(2**50-2)).to eq((1..49).to_a.reverse)
    end
  end

  describe "handles regular numbers" do
    it "ones_places(1000000) returns [19, 18, 17, 16, 14, 9, 6]" do
      expect(ones_places(1000000)).to eq([19, 18, 17, 16, 14, 9, 6])
    end
    it "ones_places( 999999) returns [19, 18, 17, 16, 14, 9, 5, 4, 3, 2, 1, 0]" do
      expect(ones_places(999999)).to eq([19, 18, 17, 16, 14, 9, 5, 4, 3, 2, 1, 0])
    end
    it "ones_places(297) returns [8,5,3,0]" do
      expect(ones_places(297)).to eq([8,5,3,0])
    end
    it "ones_places(7) returns [2,1,0]" do
      expect(ones_places(7)).to eq([2,1,0])
    end
    it "ones_places(8) returns [3]" do
      expect(ones_places(8)).to eq([3])
    end
    it "ones_places(0) returns []" do
      expect(ones_places(0)).to eq([])
    end
    it "raises error with negative numbers" do
      expect {ones_places(-1)}.to raise_error(ArgumentError)
    end
  end
end

describe "n_choose_k" do
  it "n_choose_k(5,3) == 10" do
    expect(n_choose_k(5,3)).to eq(10)
  end

  it "n choose zero equals 1" do
    expect(n_choose_k(5,0)).to eq(1)
  end

  it "n choose 1 equals n" do
    expect(n_choose_k(5,1)).to eq(5)
  end

  it "n choose (n-1) equals n" do
    expect(n_choose_k(5,4)).to eq(5)
  end

  it "n chose n equals 1" do
    expect(n_choose_k(5,5)).to eq(1)
  end
end

describe 'ones needed' do
  it 'ones_needed(3, 1) == [1]' do
    expect(ones_needed(3, 1)).to eq([1])
  end
  it "ones_needed(2, 3) == [2]" do
    expect(ones_needed(2,3)).to eq([2])
  end
  it "ones_needed(1, 5) == [0,3]" do
    expect(ones_needed(1, 5)).to eq([0,3])
  end
  it "ones_needed(0, 8) == [1,4]" do
    expect(ones_needed(0, 8)).to eq([1,4])
  end
end

describe 'matches in range' do
  it 'matches_less_than(3, 1) == 1' do
    expect(matches_in_range(3,1)).to eq(1)
  end
  it 'matches_less_than(2,3) == 3' do
    expect(matches_in_range(2,3)).to eq(3)
  end
  it 'matches_less_than(1, 5) == 11' do
    expect(matches_in_range(1,5)).to eq(11)
  end
  it 'matches_less_than(0, 8) == 78' do
    expect(matches_in_range(0,8)).to eq(78)
  end
end

describe "matches_less_than" do
  describe "handles large numbers" do
    it "matches_less_than(1188950301625810944) == 91123319271860503" do
      expect(matches_less_than(1188950301625810944)).to eq(91123319271860503)
    end
  end

  describe "handles_regular_numbers" do
    it "matches_less_than(297) == 93" do
      expect(matches_less_than(297)).to eq(93)
    end
    it "matches_less_than(296) == 92" do
      expect(matches_less_than(296)).to eq(92)
    end
  end
end

describe "matches_between" do
  it "does not include zero" do
    expect(matches_between(0, 5)).to eq(3)
  end

  it "includes the lower bound" do
    expect(matches_between(2, 3)).to eq(1)
  end

  it "includes the upper bound" do
    expect(matches_between(1,2)).to eq(2)
  end
end
