const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

function fib(teamMemberName) {
    console.log(teamMemberName);
    switch (teamMemberName) {
        case 'omri' :
            return 'מה זה הרעש הזה? רון? חאלס עם המטבעות פוקר האלה, מה יהיה ענת עם ההקלדות, מה זה המוזיקה הזאת';
        case 'ido' :
            return 'טוב אני הולך, הייתי נשאר אבל לא בא לי - הוד השרון שולטת';
        case 'raz' :
            return 'רז מה הזמנת לאכול? פיאנו פיאנו סניף חדרה';
        case 'anat':
            return 'מי נגע במזגן?  - "השלט אצלה ביד"';
        case 'matthew' :
            return 'תגיד אתה הזמנת כבר מסמסונג יפן? שמעתי יש לו 3 אחוז הנחה על בטריות';
        case 'ron' :
            return 'אני נראה לי הולך לשולץ מי בא לשולץ רוצה שולץ.. מזמין להסלטה';
        case 'yafit' :
            return 'לא לגעת בספרינט 6 אני עליו , גם לא ב5 או 4 3 2 1 , למה מה אתה צריך?';
        case 'guyw' :
            return 'מאז שאני אוכל לה סלטה יש לי כאבי בטן .. מזמין לה סלטה';
        case 'guys' :
            return '-10:30 בדיוק- אין דילי?';
        case 'oleg' :
            return '- צועק בטון שלדעתו נחמד - חברים אני סיימתי פי איצ די שאתם כתבתם "שלום עולם" בפעם הראשונה';
        default:
            return 'No permissions, go to devops';
    }
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(message));
});
sub.subscribe('insert');
