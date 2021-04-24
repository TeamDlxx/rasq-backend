// constants file

COMPANY = 'company/';

requestStatus = {
    newRequest : 1,
    bitSubmitted : 2,
    bitAccepted  : 3,
    payedToExcrow : 4,
    truckAssigned : 5,
    cancelrequest : 6,
    completeRequest  : 7
}

bidResult = {
    bitSubmitted : 0,
    bitaccepted  : 1,
    bitcancel    : 2
}


module.exports = {
    COMPANY,
    bidResult
};
