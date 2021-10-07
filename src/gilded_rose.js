class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === "Sulfuras, Hand of Ragnaros") {
        continue;
      }

      if (this.items[i].name == "Aged Brie") {
        this.items[i].quality = Math.min(50, this.items[i].quality + 1);
        this.items[i].sellIn = this.items[i].sellIn - 1;
        continue;
      }

      if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
        const sellIn = this.items[i].sellIn;
        const concertbetween6And10Days = sellIn >= 6 && sellIn < 11 ? 1 : 0;
        const concertInLessThan6Days = sellIn < 6 && sellIn >= 0 ? 1 : 0;
        const concertFinished = sellIn < 0 ? 1 : 0;
        this.items[i].quality +=
          concertbetween6And10Days * 2 +
          concertInLessThan6Days * 3 -
          concertFinished * this.items[i].quality;
        this.items[i].quality = Math.min(50, this.items[i].quality);

        continue;
      }

      if (this.items[i].quality > 0) {
        this.items[i].quality = this.items[i].quality - 1;
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
