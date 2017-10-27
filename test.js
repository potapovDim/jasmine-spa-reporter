
const { idGenerator, outputFile } = require('./utils')


function Test(title) {
    this.title = title
    this.steps = []
    this.files = []
    this.currentStep = null
}

Test.prototype.addStep = function (step) {
    this.currentStep = step
    this.steps.push(step)
}

Test.prototype.getCurrentStep = function () {
    return this.currentStep
}

Test.prototype.addFile = function (dir, data) {
    const id = idGenerator(25)
    this.files.push(id)
    outputFile(dir, data, id)
}

Test.prototype.attachFile = function (dir, file) {
    this.getCurrentStep()
        ? this.getCurrentStep().addFile(dir, file)
        : this.addFile(dir, file)
}

Test.prototype.toJSON = function () {
    const self = this
    return {
        title: self.title,
        steps: [...self.steps.map(step => step.toJSON())]
    }
}

module.exports = {
    Test
}