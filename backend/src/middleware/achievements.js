const User = require('../models/user');
const moment = require('moment');


const achievements = async (req, res, next) => {

    const today = moment().subtract(10, 'days').calendar();
    const thisWeek = moment().add(-7, 'days').calendar();

    const newCount = req.user.labeledImagesID.length+1;

    const labeledToday = req.user.labeledImagesID.filter(
        image => moment(image.timestamp) === moment(today)).length + 1;

    const labeledThisWeek = req.user.labeledImagesID.filter(
        image => moment(image.timestamp) >= moment(thisWeek)
            && moment(image.timestamp) < moment(today)).length + 1;

    const registeredAt = req.user.createdAt;

    let achievement;
    const acheivements = [];
    const exsistingAcheivements = req.user.achievements.map( achv => achv.achievement);

    // Switch case for counter ( first section of the demand list )
    switch (newCount) {
        case 10000:
            achievement = {
                achievement: "Master of the universe",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
        case 5000:
            achievement = {
                achievement: "Grand Master",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
        case 1000:
            achievement = {
                achievement: "Labelr",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
        case 500:
            achievement = {
                achievement: "Mom would be proud",
                date: moment().format().substr(0, 10)
            }
            acheivements.push(achievement);
            break;
        case 100:
            achievement = {
                achievement: "Newcomer",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
        case 50:
            achievement = {
                achievement: "Getting the hang of it",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
        case 10:
            achievement = {
                achievement: "Starter",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
        default:
            break;
    }

    // 100 in a day / 500 in a week
    if((labeledToday >= 100 || labeledThisWeek >= 500) && !exsistingAcheivements.includes("They wont label themselfs")){
        achievement = {
            achievement: "They wont label themselfs",
            date: moment().format().substr(0,10)
        }
        acheivements.push(achievement);
    }


    // Switch case for weekly labelings ( second section of the demand list )
    switch (labeledThisWeek) {
        case 5000:
            achievement = {
                achievement: "Hell of a week!",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
        case 2000:
            achievement = {
                achievement: "Monday through sunday",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
        case 1000:
            achievement = {
                achievement: "Work work work",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
        default:
            break;
    }

    // Switch case for time on platform ( third section of the demand list )
    switch (registeredAt) {
        case (moment(registeredAt) >= moment().subtract(730, "days") &&  !exsistingAcheivements.includes("Two years anniversary")):
            achievement = {
                achievement: "Two years anniversary",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
        case (moment(registeredAt) >= moment().subtract(365, "days") &&  !exsistingAcheivements.includes("Yeariversary")):
            achievement = {
                achievement: "Yeariversary",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
        case (moment(registeredAt) >= moment().subtract(30, "days") &&  !exsistingAcheivements.includes("Month on the run")):
            achievement = {
                achievement: "Month on the run",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
            break;
    }

    if (acheivements.length > 0 ){
        req.user.acheivements.concat(acheivements);
        res.newAchievments = acheivements;
        await req.user.save();
    }

    next();
}