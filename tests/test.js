const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should not have quality inferior to 0", function () {
    const items = [
      new Item("+5 Dexterity Vest", 10, 0),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 0),
      new Item("Sulfuras, Hand of Ragnaros", 0, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 0),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();
    for (const updatedItem of updatedItems) {
      expect(updatedItem.quality).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("Aged Brie", () => {
  it("should update if quality is > 50 and sellIn is > 0", () => {
    const items = [new Item("Aged Brie", 3, 50)];

    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toEqual(2);
    expect(updatedItems[0].quality).toEqual(50);
  });

  it("should update if quality is < 50 and sellIn is > 0", () => {
    const items = [new Item("Aged Brie", 2, 30)];

    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toEqual(1);
    expect(updatedItems[0].quality).toEqual(31);
  });
});

describe("Backstage passes to a TAFKAL80ETC concert", () => {
  it("should update if quality is < 50 and 6<sellIn< 11", () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 38),
    ];

    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toEqual(6);
    expect(updatedItems[0].quality).toEqual(40);
  });

  it("should update if quality is < 50 and 0<sellIn<6", () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 38),
    ];

    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toEqual(1);
    expect(updatedItems[0].quality).toEqual(41);
  });

  it("should update if sellIn is negative", () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 38),
    ];

    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toEqual(-2);
    expect(updatedItems[0].quality).toEqual(0);
  });
});
describe("Elixir of the Mongoose", () => {
  it("should update", () => {
    const items = [new Item("Elixir of the Mongoose", 3, 5)];

    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toEqual(2);
    expect(updatedItems[0].quality).toEqual(4);
  });
});

describe("Sulfuras, Hand of Ragnaros", () => {
  it("should not update", () => {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 5, 80)];

    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toEqual(5);
    expect(updatedItems[0].quality).toEqual(80);
  });
});
