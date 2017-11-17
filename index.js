const { Spa, Suit, Test, Hook } = require('spa-base')

const spaReporter = new Spa()

global.spaReporter = spaReporter.buidPublickApi()

const myReporter = {
    jasmineStarted: function (suiteInfo) {
    },
    _getTestcaseStatus: function (status) {
        console.log(status)
    },
    _getTestcaseError: function (error) {
        console.log(error)
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
        const date = {
            state: result.pending ? 'pending' : result.status,
            speed: 'fast'
        }
        spaReporter.getCurrentSuit().endTest(date)
    },
    suiteDone: function (result) {
        spaReporter.endSuit()
    },
    jasmineDone: function (stats) {
        spaReporter.createReport(stats)
    }
}

module.exports = {
    myReporter
}