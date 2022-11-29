# DND Map Maker
In DND this app creates what is known as the "Fog of War". It can take any map image url and cover it in hexagon/square tiles that can be clicked to reveal the map underneath. The tiles have a "green screen" color to allow the user to overlay any image they would like when using OBS. The map setup form allows you to set the campaign name, img URL, square or hexagon shape, and how many tiles wide you would like the map to be and the algorithm does the rest of the setup. The application will save your progress after each tile change and does not require an account to use. You can make multiple game maps with different save states for each one.

**Link to project:** https://hazelwize.github.io/dnd-map-maker/

![image](https://user-images.githubusercontent.com/97214996/204402874-04821642-f3e3-4512-b19c-c8e6d1d9d3f4.png)

## How It's Made:

**Tech used:** React, HTML, CSS, JS

I started building this app by thinking through the data structure I would need to hold all of my game maps and tiles. I have the tile state (clear or opaque) saved in an array that is created upon form submission. I created an ID linking the game to the tiles in order to keep the game itself separate from the tile state. This makes resetting the tiles much easier and allows the game select screen to load quickly without messing with a fairly large array. The number of tiles wide is used to calculate the total number of tiles in the whole image and creates an array from that number. I used this logic and local storage to build the bulk of this project as well as some CSS to polish it off. 

## Optimizations

Changes I plan on making include setting tile color upon setup, allowing multi-select for the tiles, and having image offset for poorly cropped images. I will also be overlaying a grid to show how the tiles will look before completing setup.

## Lessons Learned:

I learned a lot about data structures and algorithms in a really tangible way. I have studied quite a bit, but the hexagon calculation was a fairly large hurdle to jump. What awaited me on the other side was a great sense of accomplishment.

## Examples:
Take a look at these couple examples that I have in my own portfolio:

**PlayerToo:** https://github.com/Hazelwize/player-two

**ReciPrint:** https://github.com/Hazelwize/reciprint

**Daily Coding (DS & A):** https://github.com/Hazelwize/Daily-Coding



