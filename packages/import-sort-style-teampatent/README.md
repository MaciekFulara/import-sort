##### Overview

*style.ts* contains Teampatent's style
*run.ts* is command line utility to run imports sorter

##### Buildining instructions

 - *npm install && npm link* the following modules *import-sort, import-sort-style, import-sort-parser, import-sort-parser-typescript* (*import-sort-parser-typescript* depends on *import-sort-parser* so you need to *npm link* it
 - *npm link* previously installed modules in *import-sort-style-teampatent* and install *import-sort-style-teampatent*
 - set executable bit on *import-sort-style-teampatent/lib/run.js*

##### Running the sorter

Execute *./run.js <path_to_projects_top_level_directory>*
Note that you shouldn't have any comments before/around imports - the utility doesn't seem to handle comments correctly.

To speed up the sorting the sorter doesn't walk *node_modules* directories.