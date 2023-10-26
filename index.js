const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = './data.json';

const makeCommit = async (n) => {
    // Dynamically import the `random` module
    const random = await import('random');

    if (n === 0) return simpleGit().push();
    
    const x = random.default.int(0, 54);
    const y = random.default.int(0, 6);
    const DATE = moment().subtract(1, 'y').add(1, 'd')
    .add(x, 'w').add(y, 'd').format();
    const data = {
        date: DATE
    };

    console.log(DATE);
    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE },
        makeCommit.bind(this, --n));
    });
};

// Execute the function
(async () => {
    await makeCommit(500);
})();