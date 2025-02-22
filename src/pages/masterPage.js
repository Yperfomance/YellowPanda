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
// Основна логіка для рулетки на WIX Velo

$w.onReady(function () {
  let isSpinning = false;

  // Призи
  const prizes = [
    '10% знижка',
    '20% знижка',
    '50% знижка',
    'Безкоштовна доставка',
    'Подарунок-сюрприз',
    '40% знижка на другий товар'
  ];

  // Перевірка обмеження на одну спробу на день
  function canSpin() {
    const lastSpin = local.getItem('lastSpinDate');
    const today = new Date().toISOString().slice(0, 10);
    return lastSpin !== today;
  }

  // Збереження дати останнього обертання
  function saveSpinDate() {
    const today = new Date().toISOString().slice(0, 10);
    local.setItem('lastSpinDate', today);
  }

  // Функція обертання рулетки
  $w('#spinButton').onClick(() => {
    if (isSpinning) return;

    if (!canSpin()) {
      $w('#resultText').text = 'Ви вже обертали сьогодні. Спробуйте завтра!';
      return;
    }

    const randomDeg = 3600 + Math.floor(Math.random() * 360);
    isSpinning = true;
    $w('#wheelImage').rotate({ angle: randomDeg, duration: 4000, easing: 'easeOutCubic' })
      .then(() => {
        const normalizedDeg = randomDeg % 360;
        const prizeIndex = Math.floor(normalizedDeg / (360 / prizes.length));
        $w('#resultText').text = `Ваш виграш: ${prizes[prizeIndex]}`;
        saveSpinDate();
        isSpinning = false;
      });
  });

  // Перевірка реєстрації через e-mail
  $w('#registerButton').onClick(() => {
    const email = $w('#emailInput').value;
    if (!email.includes('@')) {
      $w('#resultText').text = 'Будь ласка, введіть коректний e-mail';
      return;
    }

    // Збереження e-mail (наприклад, у базі даних WIX)
    wixData.insert('RegisteredUsers', { email: email })
      .then(() => {
        $w('#registrationContainer').hide();
        $w('#wheelContainer').show();
      })
      .catch(() => {
        $w('#resultText').text = 'Сталася помилка. Спробуйте ще раз.';
      });
  });
});


$w('#wheelContainer').onFocus((event) => {
        
})

$w('#wheelContainer').onBlur((event) => {
        
})

$w('#wheelContainer').onMouseIn((event) => {
        
})