# React Native

This is our implementation of React Native. It is best viewed running ```npm start``` from ```./pimp-mobile``` and open the app using Expo on mobile.

## Implementation

The project asked us to "Make the adjustments necessary, but recycle as much as possible".
This turned out being close to impossible. The methods we used in the web-app (since we were noobs in React going into the project)
were really hard to translate to mobile. I chose not to implement React Native's equivalent of localstorage,
 since it seemed it was not a part of the specification (it asked us specifically to use HTML localstorage, so I understood that as not having to use AsyncStorage in Native). 
Much of our code in the web-app used localstorage directly as a part of the logic. Much of the code also had HTML injected left and right.
This made the rewrite to React Native a tedious job.

The functionality ported to React Native is the basic add/delete notes, todos, and events. The clock is also ported to mobile.
I elected to keep the calendar out of the React Native app as it was not finished in the time of porting, and would probably not look good on mobile.

The mobile app does not sort the events based on the date as the web-app does. I tried to implement it as I did on the web-app, but Expo crashed every time I ran code that sorted an array.
Since it was impossible to test code that wouldn't run, I chose not to implement it. The unfinished code is commented out on line 69 in EventContainer.js