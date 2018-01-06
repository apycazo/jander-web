Using dates in javascript uses the class `Date`, and contains several methods to access data:

method | returned value | sample
------ | --------------- | -------
getDate | Day of the month | 13
getDay | Day of the week | 6
getFullYear | Year | 2018
getHours | Hour 0..23 | 15
getMilliseconds | Milliseconds 0..999 | 103
getTime | Milliseconds from 1970 | 1515857296103
getMinutes | Minutes 0..59 | 28
toISOString | Date formatted following iso standard | 2018-01-013T15:28:16.103Z

There are also methods to read time in UTC format, just include UTC in the method name, like:

* getDate -> getUTCDate
* getFullYear -> getUTCFullYear

The different one would be `getTime()`, which would be `UTC()`
