const {interval, from, Observable, of, merge,} = require("rxjs");
const {map, filter, mergeMap, take, mapTo} = require("rxjs/operators");

/**
 * Observable demo
 */
/*const interval1$ = new Observable(subscriber => {
  setInterval(() => {
    subscriber.next('hi');
  }, 1000)
});
interval1$.subscribe(val => console.log("stream 1 => " + val))*/

/**
 * interval func
 */
/*const interval2$ = interval(1000);
interval2$.subscribe(val => console.log("stream 2 => " + val))*/


//---Other functions to create an observable---

/**
 * takes a sequence of values and converts it into a stream
 */
// of(1, 2, 3, 'Hello', 'World').subscribe(value => console.log(value))


/**
 * converts to observable from array or an array-like object,
 * a Promise, an iterable object, or an Observable-like object.
 */
/*from([1, 2, 3]).subscribe(console.log)
from(Promise.resolve('Hello World')).subscribe(console.log)*/

/**
 * Ajax
 * fromFetch
 * ... full list: https://rxjs.dev/guide/operators
 * */

//---RxJs operators---

/**
 * map takes a single argument function
 * and applies a projection on each element in the stream:
 */
/*of(1, 2, 3, 4, 5).pipe(
  map(i=> i * 2)
).subscribe(console.log)*/

/**
 * filter takes a single argument
 * and removes values from the stream which return false for the given function:
 * */
/*of(1, 2, 3, 4, 5).pipe(
  map(i => i * i),
  filter(i => i % 2 === 0)
).subscribe(console.log)*/


/**
 * merge(): merges items from two streams in the order in which they arrive:
 * take(): toke only the first count of vals
 * mapTo(): Emits the given constant value on the output Observable every time the source Observable emits a value.
 * */
/*merge(
  interval(150).pipe(take(5), mapTo('A')),
  interval(250).pipe(take(5), mapTo('B'))
).subscribe(console.log)*/


/**
 * Projects each source value to an Observable which is merged in the output Observable.
 * https://rxmarbles.com/#mergeMap
 * */
/*const result = of('a', 'b', 'c').pipe(
  mergeMap(x => interval(1000).pipe(map(i => x+i))),
);
result.subscribe(x => console.log(x));*/
