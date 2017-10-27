const Spa = require('./reporter').Spa
const Suit = require('./suit').Suit
const Test = require('./test').Test

const spaReporter = new Spa()

global.spaReporter = spaReporter.buidPublickApi()

const myReporter = {
    jasmineStarted: function (suiteInfo) {
    },
    suiteStarted: function (result) {
        spaReporter.runSuit(new Suit(result.description))
    },
    specStarted: function (result) {
        if (spaReporter.currentSuit) {
            spaReporter.currentSuit.startTest(new Test(result.description))
        }
    },
    specDone: function (result) {
        spaReporter.getCurrentSuit().endTest()
    },
    suiteDone: function (result) {
        spaReporter.endSuit()
    },
    jasmineDone: function () {
        spaReporter.createReport()
    }
}

module.exports = {
    myReporter
}