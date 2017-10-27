const { idGenerator, outputFile } = require('./utils')

function Step(title) {
    this.title = title
    this.files = []
}

Step.prototype.addFile = function (dir, file) {
    const id = idGenerator(25)
    this.files.push(id)
    console.log('add file', id, this.files, typeof outputFile)
    try {
        outputFile(dir, file, id)
    } catch (e) {
        console.log(e)
    }
    //outputFile(dir, data, id)

}

Step.prototype.toJSON = function () {
    const self = this
    return {
        title: self.title,
        files: self.files
    }
}

module.exports = {
    Step
}