Using dates in javascript uses the class `Date`, and contains several methods to access data:

method | returned value | sample
------ | --------------- | -------
getFullYear | Year | 2018
getMonth | Month 0..11 | 0 (january)
getDate | Day of the month (1..31) | 13
getDay | Day of the week (0..6) | 6
getHours | Hour 0..23 | 15
getMinutes | Minutes 0..59 | 28
getSeconds | Seconds 0..59 | 16
getMilliseconds | Milliseconds 0..999 | 103
getTime | Milliseconds from 1970 | 1515857296103
toISOString | Date formatted following iso standard | 2018-01-013T15:28:16.103Z

There are also methods to read time in UTC format, just include UTC in the method name, like:

* getDate -> getUTCDate
* getFullYear -> getUTCFullYear
* ...

The different one would be `getTime()`, which would be `UTC()`.
