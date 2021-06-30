# Construction

A community made list which shows if a construction object is a small, medium or large construction kill event or engineer turret destroy event. This list was put together by testing on the private Jaeger server as this can't be retrieved from the API.

The item ID's are only for the items with item_type_id of 26 and a item_category_id of 139. Some construction objects might be multiple items, like the weapons which might have an item that has the vehicle weapon category specified as well as the infantry ability (139).

Use the raw.githubusercontent.com/*FilePath* if you want to pull from the live files as and when they get updated.

## Instructions

File formats:
* `size-list.csv` (csv file used as source)
* `size-list.csv` (generated json file)

There's an NPM script to sort the human list and compile it into the machine list:
* `npm run sort` (will sort the source list)
* `npm run compile` (will compile the json list from the csv source)
* `npm run sort-compile` (will run both above commands)

## Suggesting Updates

If there are construction objects missing, or you would like to add an amendment, submit a pull request or open an issue with the proposed changes.

If you're submitting your own pull request, please run the `npm run sort-compile` command before submitting.

## Points of Discussion / Known Issues / TODO
