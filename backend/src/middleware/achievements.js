const moment = require('moment');

const achievements = async (req, res, next) => {
    let achievement;
    const registeredAt = req.user.createdAt;
    const acheivements = [];
    const {vote, label} = req.body;
    const exsistingAcheivements = req.user.achievements.map( achv => achv.achievement);

    if (!!label){
        const startOfTheWeek = moment().startOf('week').format('l');
        const endOfTheWeek = moment().endOf('week').format('l');

        const startOfTheMonth = moment().startOf('month').format('l');
        const endOfTheMonth = moment().endOf('month').format('l');

        const startOfTheYear = moment().startOf('year').format('l');
        const endOfTheYear = moment().endOf('year').format('l');

        //const labeled = req.user.labeledImagesID.map( image => moment(image.timestamp).format('l') );

        const counter = req.user.counter+1;
        const today = labeled.filter(image => image === moment().format('l') ) + 1;
        const week = labeled.filter(image => moment(image).isBetween(startOfTheWeek, endOfTheWeek, undefined, [])) + 1;
        const month = labeled.filter(image => moment(image).isBetween(startOfTheMonth, endOfTheMonth, undefined, [])) +1;
        const year = labeled.filter(image => moment(image).isBetween(startOfTheYear, endOfTheYear, undefined, [])) + 1;

        // Switch case for counter ( first section of the demand list )
        switch (counter) {
            case 100000:
                achievement = {
                    achievement: "Master of the universe",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;
            case 50000:
                achievement = {
                    achievement: "At the top",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;
            case 20000:
                achievement = {
                    achievement: "Cyborg",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;
            case 10000:
                achievement = {
                    achievement: "Grand Master",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;
            case 5000:
                achievement = {
                    achievement: "Strike!",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;
            case 1000:
                achievement = {
                    achievement: "You are a Winner",
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
            case 10:
                achievement = {
                    achievement: "Beginner",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;
            case 1:
                achievement = {
                    achievement: "The First of Many",
                    date: moment().format().substr(0,10)
                }
                break;
            default:
                break;
        }

        // 100 in a day
        if((today >= 100) && !exsistingAcheivements.includes("Too Fast!")){
            achievement = {
                achievement: "Too Fast!",
                date: moment().format().substr(0,10)
            }
            acheivements.push(achievement);
        }


        // Switch case for weekly labelings ( second section of the demand list )
        switch (week) {
            case 5000:
                achievement = {
                    achievement: "Hell of a week!",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;
            case 2000:
                achievement = {
                    achievement: "Addict",
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
            case 500:
                achievement = {
                    achievement: "Hustler",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;    
            default:
                break;
        }
        //Switch case for monthly labelings
        switch (month) {
            case 10000:
                achievement = {
                    achievement: "Unstoppable Force",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;
            case 5000:
                achievement = {
                    achievement: "Hell of a month",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;
            case 2000:
                achievement = {
                    achievement: "Explorer",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;
            case 1000:
                achievement = {
                    achievement: "Elite",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;
            case 500:
                achievement = {
                    achievement: "Getting the hang of it",
                    date: moment().format().substr(0,10)
                }
                acheivements.push(achievement);
                break;    
            default:
                break;
        }

    }

    // Switch case for time on platform ( third section of the demand list )
    switch (registeredAt) {
        case (moment(registeredAt) >= moment().subtract(730, "days") &&  !exsistingAcheivements.includes("Two years anniversary")):
            achievement = {
                achievement: "2 Years!",
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
        default:
            break;
    }

    if (acheivements.length > 0 ){
        console.log('achievements', acheivements);
        req.user.achievements = req.user.achievements.concat(acheivements);
        res.newAchievments = acheivements;
        await req.user.save();
    }

    next();
}

module.exports = achievements;