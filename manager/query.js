// manager/query.js

// Get temporary stored data from session
function getStoredSearch(req, res, next) {
    //
    var placeId = req.session.placeId
    var searchText = req.session.searchText
    //
    res.status(200).json({
        data: {
            placeId: placeId || null,
            searchText: searchText || null
        }
    })
}

module.exports = {
    getStoredSearch: getStoredSearch
}