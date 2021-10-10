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

  updateSulfuras() {
    return;
  }
  updateAgedBrie(item) {
    item.quality = Math.min(50, item.quality + 1);
    item.sellIn = item.sellIn - 1;
  }

  updateBackstagePass(item) {
    item.sellIn = item.sellIn - 1;
    const sellIn = item.sellIn;
    const concertbetween6And10Days = sellIn >= 6 && sellIn < 11 ? 1 : 0;
    const concertInLessThan6Days = sellIn < 6 && sellIn >= 0 ? 1 : 0;
    const concertFinished = sellIn < 0 ? 1 : 0;
    item.quality +=
      concertbetween6And10Days * 2 +
      concertInLessThan6Days * 3 -
      concertFinished * item.quality;
    item.quality = Math.min(50, item.quality);
  }

  updateDefaultItem(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
    item.sellIn = item.sellIn - 1;
  }

  updateConjured(item) {
    item.quality = Math.max(0, item.quality - 2);
    item.sellIn = item.sellIn - 1;
  }
  updateQuality() {
    for (const item of this.items) {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        this.updateSulfuras();
        continue;
      }

      if (item.name == "Aged Brie") {
        this.updateAgedBrie(item);
        continue;
      }

      if (item.name == "Conjured") {
        this.updateConjured(item);
        continue;
      }

      if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        this.updateBackstagePass(item);
        continue;
      }

      this.updateDefaultItem(item);
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
