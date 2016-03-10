/**
 * Created by caoyangkaka on 3/5/16.
 */
function Food(name, price) {
    this.name = name;
    this.price = price;
}

Food.prototype.toString = function() {
    return this.name + ' is sold with $' + this.price + '.';
}

module.exports = Food;