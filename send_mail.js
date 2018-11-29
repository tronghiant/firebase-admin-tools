const nodemailer = require('nodemailer');

const GUESTS = require('./data/guests');
const CONFIG = require('./data/config');
// const GUESTS = require('./data/guests.prod');
// const CONFIG = require('./data/config.prod');

const transporter = nodemailer.createTransport(CONFIG.mail);

const you = guest => (guest.title ? ' ' + guest.title : '');
const I = guest => {
  const flag =
    guest.title.toLocaleLowerCase() === 'anh' ||
    guest.title.toLocaleLowerCase() === 'chị';
  return flag ? 'em' : CONFIG.sender.name;
};

function mkMailContent(guest) {
  return (mailOptions = {
    from: `"🌈🏳️‍🌈${CONFIG.sender.fullName}🏳️‍🌈🌈" <${CONFIG.sender.email}>`,
    to: `${guest.email}`,
    subject: '📢🔔🎊🎉🎀Six years anniversary🎊🎉🎀📢🔔🚨',
    html: `
        <h5>Hi${you(guest)} ${guest.name.split(' ').pop()}</h5><br>

        Chỉ còn 3 tháng nữa là ${I(guest)} làm ở NTT được 6 năm!<br>
        Để kỉ niệm sự kiện rất đáng nhớ nhưng đáng tiếc sẽ không xảy ra này, ${I(guest)} muốn mời${you(guest)} ${guest.name
      .split(' ')
      .pop()} một ly Phúc Long 🍹🍵☕️🍸🍷!<br>
        ${you(guest)} ${guest.name
      .split(' ')
      .pop()} hãy dùng link dưới để chọn nước mình thích!<br><br>

        ${CONFIG.bookingURL}<br><br>

         Br.${CONFIG.sender.fullName}`,
      text: `
            Hi${you(guest)} ${guest.name.split(' ').pop()}

            Chỉ còn 3 tháng nữa là ${I(guest)} làm ở NTT được 6 năm!
            Để kỉ niệm sự kiện rất đáng nhớ nhưng đáng tiếc sẽ không xảy ra này, ${I(guest)} muốn mời${you(guest)} ${guest.name
          .split(' ')
          .pop()} một ly Phúc Long 🍹🍵☕️🍸🍷!
            ${you(guest)} ${guest.name
          .split(' ')
          .pop()} hãy dùng link dưới để chọn nước mình thích!

            ${CONFIG.bookingURL}
            Br.${CONFIG.sender.fullName}
      ` });
}


async function sendMailFor(guests) {
  for (let index = 0; index < guests.length; index++) {
    const mailOptions = mkMailContent(guests[index]);
    console.log(`[${index + 1}/${guests.length}] TO:`, mailOptions.to, 'SUBJECT:', mailOptions.subject);
    // console.log('FROM:', mailOptions.from);
    // console.log('CONTENT', mailOptions.html);
    // console.log('CONTENT (text):', mailOptions.text);

    // send mail with defined transport object
    await new Promise((fullfill, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('MAIL SEND FAIL FOR', mailOptions.to);
          console.error(error);
          reject({
            msg: 'MAIL SEND FAIL FOR ' + mailOptions.to,
            error
          });
        }
        console.log('Message sent: %s', info.messageId);
        fullfill();
      });
    });
  }
}

sendMailFor(GUESTS);

