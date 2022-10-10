# besv-sfcc
BESV SFCC website

Make sure you have node al least 14.x in order to start the code compilation:
Open Git bash/Terminal inside besv-sfcc.

Start the compilation process from SFRA base cartridge:
1) cd storefront-reference-architecture
2) npm install
3) npm run compile:fonts
4) npm run compile:scss
5) npm run compile:js
6) cd ..

Compile the plugin cartridge:
1) cd plugin_newsletter
2) npm install
3) npm run compile:js
4) cd ..

Compile the link cartride:
1) cd link_stripe
2) npm install
3) npm run compile:scss
4) npm run compile:js
5) cd ..


Compile the brand cartride:
1) cd besv-storefront
2) npm install
3) npm run compile:fonts
4) npm run compile:scss
5) npm run compile:js

Thats all!



