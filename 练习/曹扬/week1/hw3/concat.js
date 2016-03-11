/**
 * Created by caoyangkaka on 3/9/16.
 *
 * concat a list of buffer, then return a new Buffer with the length of size
 * @param list: a array, which contains the buffers
 * @param length: the return length of buffer
 * @return bf: return the new built buffer
 */
function concat(list, length) {
    if (!Array.isArray(list)) {
        throw new Error('USAGE: Buffer.concat(list, [length])');
    }

    var bf = null;
    if (list.length === 0) {
        bf = new Buffer(0);
        return bf;
    } else if(list.some(function(li) {
            return !Buffer.isBuffer(li);
        })) {
        console.log(1);
        throw new Error('list must a Buffer list.');
    }
    else if (list.length === 1) {
        return list[0];
    }

    if (typeof length !== 'number') {
        length = 0;
        list.forEach(function(li) {
           length += li.length;
        });
    }

    bf = new Buffer(length);
    var pos = 0;
    list.forEach(function(li) {
        li.copy(bf, pos);
        pos += li.length;
    });
    return bf;
}

module.exports.concat = concat;