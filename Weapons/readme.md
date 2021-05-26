# Weapons

A community curated sanctions file based on the original DasAnfall Weapons list ([see archive for reference](https://github.com/cooltrain7/Planetside-2-API-Tracker/tree/master/Weapons/Da%20Sanction%20Archive)), which was starting to show its age.

This list defines 'valid' weapons used for grouping weapons and calculating specific stats, such as ACC, HSR, and IVI.

Use the raw.githubusercontent.com/*FilePath* if you want to pull from the live files as and when they get updated.

## Instructions

File formats:
* `sanction-list.csv` (human readable list for editing)
* `sanction-list-machine.csv` (CSV list optimized for machine use, does *not* include items with `none` category)
* `sanction-list-machine.json` (JSON list optimized for machine use, does *not* include items with `none` category)
* `sanction-list-machine-with-none.csv` (CSV list optimized for machine use, does include items with `none` category)
* `sanction-list-machine-with-none.json` (JSON list optimized for machine use, does include items with `none` category)

There's an NPM script to sort the human list and compile it into the machine list:
* `npm run sort` (will sort the human readable list)
* `npm run compile` (will compile the machine readable lists from the human readable list)
* `npm run sort-compile` (will run both above commands)

## Suggesting Updates

If there are items or weapons missing, or you would like to add an amendment, submit a pull request or open an issue with the proposed changes.

If you're submitting your own pull request, please run the `npm run sort-compile` command before submitting.

## Points of Discussion / Known Issues / TODO

* DA excluded generation 1 assault rifles/carbines with UBGL, but sanctioned Yumi.  And there's a few more UBGL weapons out there too.  A decision needs to be made to either ban all, unban all, or leave as is. ([Issue #70](https://github.com/cooltrain7/Planetside-2-API-Tracker/issues/70))
* Are people happy with the naming conventions of these files and formats therein? ([Issue #42](https://github.com/cooltrain7/Planetside-2-API-Tracker/issues/42), [Issue #78](https://github.com/cooltrain7/Planetside-2-API-Tracker/issues/78))
* Need someone to build a Github action to automatically sort/compile on update of the main list
