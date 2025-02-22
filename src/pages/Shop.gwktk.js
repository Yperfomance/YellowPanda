import wixData from 'wix-data';

$w.onReady(function () {
  $w('#registerButton').onClick(() => {
    const email = $w('#emailInput').value;

    if (!email.includes('@')) {
      $w('#resultText').text = 'Будь ласка, введіть коректний e-mail';
      return;
    }

    // Перевіряємо, чи e-mail вже існує
    wixData.query('RegisteredUsers')
      .eq('email', email)
      .find()
      .then((results) => {
        if (results.items.length > 0) {
          $w('#resultText').text = 'Цей e-mail вже зареєстрований!';
        } else {
          // Додаємо новий запис без явного _id
          wixData.insert('RegisteredUsers', {
            email: email,
            createdAt: new Date()
          })
          .then(() => {
            $w('#resultText').text = 'Реєстрація успішна! 🎉';
            $w('#registrationContainer').hide();
            $w('#wheelContainer').show();
          })
          .catch((err) => {
            console.log(err);
            $w('#resultText').text = 'Сталася помилка. Спробуйте ще раз.';
          });
        }
      });
  });
});
