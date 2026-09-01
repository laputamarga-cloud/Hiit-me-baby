(() => {
  'use strict';

  const VERSION = '0.8.8';

  const EFFORT_SCALE_MAX = 5;
  // The readable labels mirror exactly what the current effort UI shows.
  // Levels 2–4 are displayed only as their number, so that number is their label.
  const EFFORT_LABELS = Object.freeze({
    1: 'fácil',
    2: '2',
    3: '3',
    4: '4',
    5: 'me quiero morir'
  });

  function withEffortMetadata(workout) {
    if (!workout || typeof workout !== 'object') return workout;
    const effort = Number(workout.effort);
    if (!Number.isInteger(effort) || effort < 1 || effort > EFFORT_SCALE_MAX) {
      return { ...workout };
    }
    return {
      ...workout,
      effort,
      effortLabel: EFFORT_LABELS[effort],
      effortScaleMax: EFFORT_SCALE_MAX
    };
  }

  const STRENGTH = [
    {
      name: 'Full Body A',
      subtitle: 'NORMAL · 9 ejercicios · ≈ 19–20 min con 3 rondas',
      equipment: 'Mancuernas · esterilla · silla estable',
      warmup: 60,
      roundBreak: 30,
      exercises: [
        ['Flexiones', 'Todo lo que puedas con técnica limpia.'],
        ['Peso muerto rumano', 'Cadera atrás; espalda neutra.'],
        ['Remo con mancuernas', 'Codos atrás y espalda estable.'],
        ['Puente de glúteo', 'Sube fuerte y aprieta arriba.'],
        ['Press de hombros', 'Empuja arriba con control.'],
        ['Bicycle abs', 'Rápido, sin tirar del cuello.'],
        ['Curl de bíceps', 'Sin balancear el cuerpo.'],
        ['Elevaciones de piernas', 'Core firme; lumbar pegada.'],
        ['Tríceps con apoyo', 'Silla estable; empuja con brazos.']
      ]
    },
    {
      name: 'Full Body B',
      subtitle: 'NORMAL · 9 ejercicios · ≈ 19–20 min con 3 rondas',
      equipment: 'Mancuernas · esterilla · silla o apoyo estable',
      warmup: 60,
      roundBreak: 30,
      exercises: [
        ['Flexiones inclinadas', 'Ritmo alto sin perder la línea.'],
        ['Remo inclinado', 'Aprieta la espalda al subir.'],
        ['Dead bug', 'Alterna lados; lumbar estable.'],
        ['Press de suelo', 'Empuja fuerte desde el suelo.'],
        ['Puente marchado', 'Cadera arriba y estable.'],
        ['Elevaciones laterales', 'Controla especialmente la bajada.'],
        ['Patada de glúteo derecha', 'Empuja con el talón.'],
        ['Patada de glúteo izquierda', 'Empuja con el talón.'],
        ['Shoulder taps', 'Cadera lo más quieta posible.']
      ]
    },
    {
      name: 'Upper Body',
      subtitle: 'NORMAL · 9 ejercicios · tren superior',
      equipment: 'Mancuernas · esterilla · silla estable',
      warmup: 60,
      roundBreak: 30,
      exercises: [
        ['Flexiones', 'Ritmo alto y recorrido limpio.'],
        ['Remo con mancuernas', 'Tira hacia las costillas.'],
        ['Press de hombros', 'Cadencia viva.'],
        ['Curl de bíceps', 'Sin balancear el cuerpo.'],
        ['Tríceps con apoyo', 'Silla estable; empuja con brazos.'],
        ['Elevaciones laterales', 'Controla especialmente la bajada.'],
        ['Press de suelo', 'Empuja fuerte.'],
        ['Remo vertical', 'Sube hasta el pecho con control.'],
        ['Patada de tríceps', 'Codos quietos.']
      ]
    },
    {
      name: 'Core HIIT',
      subtitle: 'NORMAL · 9 ejercicios · abdomen + estabilidad',
      equipment: 'Esterilla',
      warmup: 60,
      roundBreak: 30,
      exercises: [
        ['Bicycle abs', 'Mantén el ritmo sin tirar del cuello.'],
        ['Plancha', 'Abdomen y glúteos activos.'],
        ['Dead bug', 'Controla cada extensión.'],
        ['Elevaciones de piernas', 'No arquees la lumbar.'],
        ['Plancha lateral derecha', 'Cadera arriba.'],
        ['Plancha lateral izquierda', 'Cadera arriba.'],
        ['Shoulder taps', 'Cadera lo más quieta posible.'],
        ['Puente marchado', 'Que la pelvis no baile.'],
        ['Puente de glúteo', 'Core firme mientras subes.']
      ]
    },
    {
      name: 'Glúteo + posterior',
      subtitle: 'NORMAL · 9 ejercicios · sin impacto',
      equipment: 'Mancuernas · esterilla',
      warmup: 60,
      roundBreak: 30,
      exercises: [
        ['Puente de glúteo', 'Sube y aprieta fuerte.'],
        ['Peso muerto rumano', 'Cadera atrás; espalda neutra.'],
        ['Patada de glúteo derecha', 'Empuja con el talón.'],
        ['Patada de glúteo izquierda', 'Empuja con el talón.'],
        ['Puente marchado', 'Que la pelvis no baile.'],
        ['Elevaciones de gemelo', 'Sube vivo; baja controlando.'],
        ['Dead bug', 'Estabilidad antes que velocidad.'],
        ['Plancha lateral derecha', 'Cadera arriba.'],
        ['Plancha lateral izquierda', 'Cadera arriba.']
      ]
    },
    {
      name: 'Brazos + hombros',
      subtitle: 'NORMAL · 9 ejercicios · mancuernas',
      equipment: 'Mancuernas · esterilla · silla estable',
      warmup: 60,
      roundBreak: 30,
      exercises: [
        ['Curl de bíceps', 'Ritmo vivo sin balanceo.'],
        ['Press de hombros', 'Empuja arriba.'],
        ['Patada de tríceps', 'Codos quietos.'],
        ['Elevaciones laterales', 'No subas por encima del hombro.'],
        ['Remo vertical', 'Sube hasta el pecho con control.'],
        ['Press de suelo', 'Empuja fuerte.'],
        ['Remo con mancuernas', 'Tira hacia las costillas.'],
        ['Tríceps con apoyo', 'Baja y empuja con control.'],
        ['Flexiones inclinadas', 'Cierra fuerte sin perder la línea.']
      ]
    },
    {
      name: 'Push Power',
      subtitle: 'NORMAL · 9 ejercicios · pecho + hombro + tríceps',
      equipment: 'Mancuernas · esterilla · silla o apoyo estable',
      warmup: 60,
      roundBreak: 30,
      exercises: [
        ['Flexiones inclinadas', 'Busca ritmo y buena alineación.'],
        ['Press de suelo', 'Empuja con decisión.'],
        ['Flexiones', 'Las que salgan limpias.'],
        ['Tríceps con apoyo', 'Baja y empuja con control.'],
        ['Press de hombros', 'Cadencia viva.'],
        ['Shoulder taps', 'Cadera lo más quieta posible.'],
        ['Elevaciones laterales', 'Controla la bajada.'],
        ['Patada de tríceps', 'Codos pegados al cuerpo.'],
        ['Remo vertical', 'Sube con control, sin tirón.']
      ]
    },
    {
      name: 'Full Body · Completa',
      subtitle: 'COMPLETA · 11 ejercicios · ≈ 24–25 min con 3 rondas',
      equipment: 'Mancuernas · esterilla · silla o apoyo estable',
      warmup: 90,
      roundBreak: 45,
      exercises: [
        ['Peso muerto rumano', 'Cadera atrás; espalda neutra.'],
        ['Flexiones', 'Técnica limpia; adapta si hace falta.'],
        ['Remo con mancuernas', 'Tira hacia las costillas.'],
        ['Puente de glúteo', 'Aprieta arriba.'],
        ['Press de hombros', 'Empuja arriba con control.'],
        ['Dead bug', 'Lumbar estable.'],
        ['Curl de bíceps', 'Sin balancear el cuerpo.'],
        ['Flexiones inclinadas', 'Mantén una línea sólida.'],
        ['Tríceps con apoyo', 'Silla estable.'],
        ['Bicycle abs', 'Ritmo alto sin tirar del cuello.'],
        ['Elevaciones de gemelo', 'Sube y baja con control.']
      ]
    },
    {
      name: 'Exprés 6',
      subtitle: 'EXPRÉS · 6 ejercicios · ≈ 12–13 min con 3 rondas',
      equipment: 'Mancuernas · esterilla',
      warmup: 30,
      roundBreak: 20,
      exercises: [
        ['Flexiones', 'Empieza fuerte.'],
        ['Peso muerto rumano', 'Cadencia viva.'],
        ['Bicycle abs', 'No pares.'],
        ['Remo con mancuernas', 'Tira fuerte.'],
        ['Puente de glúteo', 'Aprieta arriba.'],
        ['Press de hombros', 'Último empujón.']
      ]
    },
    {
      name: 'Fuerza P1 · Cuerpo completo',
      subtitle: 'HIIT · PESO CORPORAL · 8 ejercicios · ≈ 17:30 con 3 rondas',
      equipment: 'Solo peso corporal · esterilla opcional',
      warmup: 60,
      roundBreak: 30,
      exercises: [
        ['Sentadillas lentas', 'Baja con control y sube con ritmo. Sin rebotes.'],
        ['Flexiones', 'Haz todas las limpias que salgan. Si la técnica se rompe, adapta.'],
        ['Zancada atrás derecha', 'Pierna derecha. Mantén el tronco estable y el ritmo vivo.'],
        ['Zancada atrás izquierda', 'Pierna izquierda. Mantén el tronco estable y el ritmo vivo.'],
        ['Puente de glúteo', 'Sube, aprieta arriba y vuelve a bajar sin perder tensión.'],
        ['Boca abajo: brazos largos → codos', 'Lleva los codos hacia las costillas. Piernas y tronco tranquilos: no es Superman.'],
        ['Plancha de antebrazos', 'Abdomen y glúteos activos. Mantén una línea sólida.'],
        ['Dead bug · contrarios', 'Alterna brazo y pierna contrarios. Lumbar estable y movimiento continuo.']
      ]
    },
    {
      name: 'Fuerza P2 · Cuerpo completo',
      subtitle: 'HIIT · PESO CORPORAL · 8 ejercicios · ≈ 17:30 con 3 rondas',
      equipment: 'Solo peso corporal · esterilla opcional',
      warmup: 60,
      roundBreak: 30,
      exercises: [
        ['Sentadilla sumo', 'Ritmo vivo. Rodillas siguen la línea de los pies.'],
        ['Flexiones con codos cerca', 'Codos cerca del cuerpo. Mantén la técnica y adapta si hace falta.'],
        ['Zancadas atrás alternas', 'Alterna lados sin parar. Paso estable y tronco controlado.'],
        ['Puente marchado', 'Cadera arriba y estable mientras alternas piernas.'],
        ['Boca abajo: brazos en W', 'Junta escápulas y vuelve. Piernas y tronco tranquilos.'],
        ['Plancha lateral derecha', 'Cadera arriba. Mantén el cuerpo alineado durante todo el intervalo.'],
        ['Plancha lateral izquierda', 'Cadera arriba. Mantén el cuerpo alineado durante todo el intervalo.'],
        ['Shoulder taps', 'Plancha alta tocando hombros. Cadera lo más quieta posible.']
      ]
    }
  ];

  const BIKE = [
    {
      name: 'BICI 12 · No negociable',
      subtitle: '12 min · para días sin ganas',
      blocks: [
        [180, 'Fácil', 'Calienta y mueve las piernas.'],
        [360, 'Medio', 'Ritmo cómodo pero constante.'],
        [60, 'Medio-duro', 'Aprieta un minuto.'],
        [120, 'Fácil', 'Suelta piernas y termina.']
      ]
    },
    {
      name: 'BICI 20 · Base',
      subtitle: '20 min · rodaje sencillo',
      blocks: [
        [300, 'Fácil', 'Calentamiento.'],
        [600, 'Medio', 'Ritmo estable y sostenible.'],
        [180, 'Medio-duro', 'Aprieta sin levantarte del sillín.'],
        [120, 'Fácil', 'Vuelta a la calma.']
      ]
    },
    {
      name: 'BICI 20 · Intervalos',
      subtitle: '20 min · cambios de ritmo',
      blocks: [
        [300, 'Fácil', 'Calentamiento.'],
        [60, 'Medio-duro', 'Intervalo 1 de 6.'], [60, 'Fácil', 'Recupera.'],
        [60, 'Medio-duro', 'Intervalo 2 de 6.'], [60, 'Fácil', 'Recupera.'],
        [60, 'Medio-duro', 'Intervalo 3 de 6.'], [60, 'Fácil', 'Recupera.'],
        [60, 'Medio-duro', 'Intervalo 4 de 6.'], [60, 'Fácil', 'Recupera.'],
        [60, 'Medio-duro', 'Intervalo 5 de 6.'], [60, 'Fácil', 'Recupera.'],
        [60, 'Medio-duro', 'Intervalo 6 de 6. Último.'], [60, 'Fácil', 'Recupera.'],
        [180, 'Fácil', 'Vuelta a la calma.']
      ]
    },
    {
      name: 'BICI 24 · Pirámide',
      subtitle: '24 min · sube y baja intensidad',
      blocks: [
        [300, 'Fácil', 'Calentamiento.'],
        [60, 'Medio', 'Sube ritmo.'],
        [60, 'Fácil', 'Recupera.'],
        [120, 'Medio', 'Dos minutos constantes.'],
        [60, 'Fácil', 'Recupera.'],
        [180, 'Medio-duro', 'Tres minutos de trabajo.'],
        [120, 'Fácil', 'Recuperación larga.'],
        [120, 'Medio-duro', 'Vuelve a apretar.'],
        [60, 'Fácil', 'Recupera.'],
        [60, 'Duro', 'Pico de la pirámide: un minuto fuerte.'],
        [300, 'Fácil', 'Cinco minutos para soltar piernas.']
      ]
    },
    {
      name: 'BICI 25 · Bloques',
      subtitle: '25 min · bloques variados',
      blocks: [
        [300, 'Fácil', 'Calentamiento.'],
        [300, 'Medio', 'Ritmo sostenido.'],
        [180, 'Fácil', 'Recupera.'],
        [300, 'Medio-duro', 'Bloque fuerte.'],
        [180, 'Fácil', 'Recupera.'],
        [180, 'Medio', 'Último trabajo.'],
        [60, 'Fácil', 'Termina suave.']
      ]
    },
    {
      name: 'BICI 30 · Fondo',
      subtitle: '30 min · resistencia sostenida',
      blocks: [
        [300, 'Fácil', 'Calentamiento.'],
        [1200, 'Medio cómodo', 'Ritmo sostenible.'],
        [180, 'Medio-duro', 'Último empujón.'],
        [120, 'Fácil', 'Vuelta a la calma.']
      ]
    }
  ];

  // Biblioteca visual completa: todas las rutinas de fuerza usan la misma mujer y el mismo estilo.
  // Las imágenes van incrustadas como WebP para que funcionen también sin conexión.
  const EXERCISE_IMAGES = {
    "flexiones": "data:image/webp;base64,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",
    "puente-gluteo": "data:image/webp;base64,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",
    "remo-mancuernas": "data:image/webp;base64,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",
    "bicycle-abs": "data:image/webp;base64,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",
    "press-hombros": "data:image/webp;base64,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",
    "elevaciones-piernas": "data:image/webp;base64,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",
    "peso-muerto-rumano": "data:image/webp;base64,UklGRvQgAABXRUJQVlA4IOggAADwqACdASqAAkABPmEwlUekIyIhJBQIuIAMCWVu/HA3C7B79nL/y/a2aV8p/bvRjrr+F/s/629mfZX1V5VPln7X/1v8D7Vv8X+unut/rf+V/XT4BP18/ZD3x+iDzBftp+4nugf8X9vPdV/Tv+D7B/88/vX/49qr1YPQ3/dr04/3a+If+u/9D9ovad//+tLKMeFP479K/j/y/9hvQv1C6iPyr7r/rf7/6YeE/ys/yPUR9qf6rgLwBdn99x51fm/nB44OdL6IP+L4H3++9Hz/oCXBMbYe2XlNnVDpE/0Exth7ZeU2dUOkT/QTG2Htl5TZ1Q6RP9BMbYe2XlNnVDpE/0Exth7ZeU2dUOkT/QTG2Htl5TZ1Q6RP9BMbYe1YdoKXTfHsa6Q1Egya74/Hn0YjnRQz3LGFznyCXhC9/vaOVngdhiBN9U/t2JXzvwExuOuH9DFIm+Pk+fusUcmc9gGlC6wMwzMxp1+ltJqdLD+urQk/DXC3wzIoKy0VkyArZMsSRTVIo4q1sPgdbzb65d7epq+vz1lhMGj0rIdGDIv6tDR+1Csvy1Hl4OY/yjagSkqUIys79wg6Nv2fjhC2tpoCEJo1SIh/9gZuDRMSYicEocIkhr0vgtB9DOQGYdEj3Df1QOwJak5MrXIbowTznYY8379AGbhjW01WcEbltoIW73gQ87GUB3dhrJRvMS58gyDuU9uT1XsM44ynZI9xmLJBU/9wfvgctHXL7dCkBuIc8XT7D5eF11wFOMmzXI/95ug30nL3/s2jKCUD/BDQqNzM2g4wUG3hQS8n4wpouYCmj+qxW/NfqdUxTM8KZv35C3iN4W1gH/DF8hYFAOuzCZV4uwXTjWfQXcqXw70xYNlInaVmFA7olYIImGnZtMM0ws6lq4h0uI/y8BnIEP7beP//9tM0VcyXqIBnGSyIwqDjNigWb6XwqRHV+FvBISMn1FUyjsT2qqdAYGRQvPSLzYZ7s/e2kGE3Xbeqt3rXd3Wg4ASDXOCvudZqCmtMGwrOj8SfG73fzZmdJj2w9F07Xhc0yqg8XJTC6jr8xP1U1uxTejHqj8RB9PcXuwNrzOzQau7aFlQDyJ8xhXEqJ1Q8k5FwlIfYRvu8iEJrXZW5bXrAf5MDudUO4DGab7gsjz4K4KoFd/8fV99UHEfrZjGNuYu1dEqCRkY9hlA9VXPa09dPk+Xb6X7xnmcW/q9WSNK6PH3ZSbbvqhoJ+Gc/5sOlP2TJ6SFkUSVzG1967SPnwobFvCCtvReeJ6snFqutMc3jQ82qiaVJHr+jqqzzekBf8z3SQa8C4jlbJLC9c6KktzrpSHQisMoY4cfFH3h+OK+wqq9GaMT1NUenFEs+qLNWsNNNDNyPCu4pV9tT4lH2tTujoJi8tonv2Wy5u3t/2uVsIwqngg8r59E5/AJ6hYD+w11s8NbsqTB0Dv116WiKQgos+gfGv3t556X2CbhILiqnbiI+VHfqPCPzqwBmzZkesEuCdTiL6lRDXcOx2THvhgTv44g6jsSHM9ZYimLcesgMK1v9BMCzz0VFVXoEl5e7Pbse2tt2tEqng1LAzJl+Y3G2G2ECQZBVhkYl0w73uNME1gHEGy8u5uT/QTG2GtBcqsFGrD4R/bt2ZiBAHoQWsT+gKLHHNg0NJ36prQ4mWb9ij/An6rmUu1QO5J+KOoDysHULoa6FSNnIszifvRrUI/xQHWTdh4o5TI4sGPrbpYlcZ4PXsRJ+BzEqzq77AA2MCj7GBRctSohOube1NV6d6kBYwblLS+/b5stl5UJ6odM783sE63djudo5i5ubm5wZ0tqh0iGAAP7+YgAAAAAAAAAAABES2okZRM0V5IG/NyeZzep0TW0YP9D1X4p715SBPqYu+XCvdCkqdIbXcZXCdaWT0f4C1O5LbaRyosTQv39fLx8/hDPfhyiUsLgx7oPX5k+zl48n3DakPa19Kf+rXmchVlvsBM6J7XV9K+5EMaGm4IDfXvZyIxqdneLMORn+etZJ2dfsOcVburPCAV/ctmUHaQOA8RZJZrvA+phpIo4gZK/imC1/JCmG0mn/bRrkJR9kODmiiOc58wUeDp70x709uMjD6GyswBvg7mKNMLirGvPpeNz3DUpw1kITC0FtTQDHZtOItp1vjrDtSE9wWYOn/ouU9XhNhcMTwbLYLgSQ525VHoGYQKaYYmv5XakQLnvDX3ZnJfCD/h26GJW2vtWUiTU/aVdqkBe4nwBPuhmG49IWZ2eA4J8Ez3s5Tf56wH9GwsbtiGBhp6LM/Hlu14Ykk7FbJf31ZdX8GJW63auovoOxvcKGzXSAb6wlBdoTtKMnonfXYbNDSQ3RXDrx5RdGdA4ubCn9xACS9W69xjdfkY+68N41ABlVDLxjtU19ao7MJnSjEIw/WWoVib+AeFblKuUiyBr3NEBvg47x3kClgzgNco0nAACigdQgt3oWHlcw/oJfjDKj0fUCWEjFErdGanfrNvilQH4whePgCksJg49IYPjT8uQHEPmwyfF+bt39+OciH47RbD9oh+bP7zDC+N+uh/uokTO7u2j4tkxrxzmOy7fibsQKP/iS1LQoK4RkmRjDb6b2rWexRukToawKKR82LBz59A+FZONwqI1KV09R7aATXrXZUGFDRH/ADPyPA0RZBFBEIx9DgAWlaoik40XP6l2QWIbuVYfGXlXFpawwY0JbAEOjg36UFmRjC/eLdf9LK65Dq+sbgu3u1GmjnR9k8zm+bE0o0MqBRShluMREpWrH6p9zpjsYPbARyo7kVLoBXr0CCIF8vwZ+HcwSLA7T0gNX+pHZx7uTZgIVojUlHI+MKPeFi3qG/JJxA6/bE7H2/cXfSwYvbIXsgjkBWoXwYK7z6qVuyQF38u14O7OwycChwTXUS0M2swGlFfIdBF/w6bfNlGroPF8q9ci7RDNj7q+0y+XX/OelORnZIWtWZOjzlLAOuopZ08kw7ZtYkqx9R2cuVv7YGwgqGly2yGDvZaJRiou4sw0LYmnv1zao1Db4o31KqQJ24RXv4vvsAAV912xO/MHJxwMW55lUIHvdn+kx1c11ZykgpYZEadtqPlMF0hMFQhJvFoQDyTtcdCvtIMb9q/hvtib4OzgQQmnqvPpZiR3qOmQvMyYvQFNJ3dVMJzqJmOCn8Nv/Cqt9WNN3vNXN/z85syI8UMbNMCwfkuKM2cvMsKs1EDz3r7jtxZ0ByRxUx788kbiP4KiKBLz5Q5wPb0gT011IP2TP2+feDnEA+GAKne0SX/mKPerSTNScx8GD7jvFoF35VxhUYIv5TfinPqxeHvVWnoe0b9QTbPA58wWKtZHNFBYcXuK1yWN0i65GjmHdTKEBDcjtQ9Gf3SLBNRPtpoudovAXIt2gwP4445ArW/EvNVy6DHKheqNthQ3r9CjJCbW3kySX3q6T1JqXd/TzQ58vhYMnXKbJ2NvQRHqvri1gLSaGR+8+h7gfgySbRmVcmbK4uoCFCy8Ytw0ev3KFXOPyVPxoAGq9Z7bgWRDtnQP3QnrcqBa05Pd28fpqkpds7YJgSkAuv/l8WyPlFv0dSIyVZans6+1F7Ys1ffCbNrvpF5S3fRI4HuQ8np8k7jET74oyLjevcvbF0qvEy7BpGPyGzlddYoodzkhxDueoB2aUwWHeVijK8Sbi+uIp3hmJ/NaXwOdOQfX2YntvgVPRzDaGGcQPp+zmBaHvJV6Fg7eEIh/GR0W3KC0yMLr9CX7EHmJ8/eL4HE11LxpfWANKa9z77B2Rk2ageK9XlZa38lAwa4lYn9WjY1T/qdb/FQfpnv3n7HbU2wkNTUb4tmQUY2HAdblx0A4ia5TGiZOq9qIM5iH5sXs7kGXT5eSNyS08AuiseCCLjTtAqW373sncdpZARFbtvUdaqvX7ehRGZcPzgOfVKMHKf1WWuYZ6YlxNZD4kAM7QrRdwzB98Akt/l7vxefiEgUSrpjcxGYBd0QJRALVFpRM/CbM2fLRBtLfna9hn7saCfUKLZ0PpPcwpIjERa6Z7haNYLkk22wlvzHi4F5it9LH3SR/wp2flCurDBUpjXIz5zOXNvUKPFFMEuhXuCGa6dhPCLd6LaSfpSpZBuaK/Fi32Lz+S8KfT14xswID6VlFl4T9VwwbypZxiNxlRcUsOVyT4vPJxMOB+UlAJ9XmXtA/3sM/xEndPzwn+v/fk8za1jVGSy7xMuXqQ9ndQ/GXFj8CrnCJem/s0tYAsAe02yGJvnCakajFVRr4FSKwC1PdL4h3b7zfw+or2Z/rS9oAuoXBoDWW8tfYJlPnDNruEMH+PIlSEGgoTo/vkgAT1ohkEBd1NNRxJeHrHhpQTvIb72HhRFGpCqVeMQ0yThoI1DjLZZ6i8673G0G4QjhQVu+IEGV84Es3UvE9MlUXPO098KAg0m9WvCeuJj89sqDC106HaOEWtgT1e9NRHk7u98V+JFyYgV9FBMRrOS5kZLipY9SRZrkIy3LpD4CXqoMXWleZpX1gbL2IeawKSfLK5QleUyWvFf9eeu6cB34DNdJEbSolL3SW5evBRxFC8WdDH78UPK/7vPqit9Amc6YKuGy7hvZ/S3eUxs4Js5mUEdfFYbQcFs017BS/1Q9K13Ug5Trv978Zlx3KGBv9cGS8NA5rgjVY66mEwCTeWKZe43CBP53DE8cvwdWfh6IXCQpQKukpnfszfZe2Z/tsQHvqd1d9tPXHO99iSnCOzpi8ZU2o7yMqY4ChdsAnKh9+ICvvFOMrMCT2Rq71hNQbmamnjRva2hlaQSDDMrdK7n//nmQZ23D5C2YWDyLP1lbFU8vt9CFikDvpxns8UhExle8CMWh1ZsCBN4cY+ozEeZIzcFbbwWFLYgxun4rvQf9VNsJsLJEQh78aEFXwk0DMvquUk++L5MCywXYLHpUo9B/Tnp9Tdcg9krEuXDk/Dx7iZxXV0KYdnIz8bzQg+oP9xOuex5N/HW+7MfQMsOMoUPqpejk52f+DXF2fZpKgk+lxpB8qSJ++XdoIgdxVaC+dixbBoiAisABUOrTLvZG7btyIYy2MYcFjE1IoJB6L9bt2r1MDDvqtGPMlVxR6zAsRBCfv3rUf6lTT1xXPVI1JjMx795szFZVAQJaNF8nsR9/fCGgGiVvbPtPuGYsA/4Iyq+QzcPFE23uYcbfIOuF+ZSEZ/T6B/vskZUd0E/guKWp6D+kPOrMLqoNwur4iKplpHO6bBkLZqWrxfswk81K1b8rFg1mLOye5C8TlzT+RsdwckX7o8110GX5/edv/qebzLDiEIMa+CXipNyri48/qqA5e3qUIt9TRsUq2d4nMGg0u73myLUalwUguHcUk3vBtRKZlXHVOO5H/P/81Dc4nS1hKknDkGCaARz4iyn40/b0asYoUy2ry6S8ctDxE+0jHB6pjVmqfAthpQwkBSvzCnGH2nF56VAZqrDN0ZVziDIuUlRVZsVdoSJUaiXRLt2NSs8qZwUsx+FohN9ZyLOzAbXYZ4cBY/Gn+wEkMqm8z+3jYSrugbw/4jbx3QTINsbuX41UPXju7GT2zwwg6vWCSyRrTxSjN92W7Axia6I1QMv/2tkZqlpbZz3BpGEpzIMkhl+vntxMFr/210t2cGsC9A9OiEJuRkCzLQFIvhQgwhu7FiDNfwB5Sow+BJV2cf0JhRvXmR11ntTkQS3nbEZGyjaDKLzSyAXv0Haz+3OH6JAC5qlsj8WTC+dZ10LDrv0N+rGI3NmQcGKysQxOFjHApg8SeS9MC8YuebCdxaCZ6nIzd6yBpS/8Fj9m6h3J/q7f+o+RvWYgybDXis4MVXvte/HvQDv8JYn1RJiIj7PA75gPSXBcvoeTVIdZb8HLXRhxeMs3DknTGKjmhUTf3cD7e6I+nxRcjxNMADwzSzfLcgBg+gl7burvMZ68EWl2IP0fU++p5oVMleOc8XsABqe/4eKkV00WzUMu1bOdrWvDwtxc9gh6ZNwppFRrSg7ibuw7omoG5EeGoOmaendJqiZOa4d6aM8fIMcHsgKc5LIHDYrQ+2YlTC+hvmARjz8SyOE888ChfDXHJ5N9zRrabdI/8LBTWMAb5kFEeDohC54lMGzvfyzgdXgzTkzIlurVcB1WmQR6t+dIfcFX5aTcAwSqVudX8ARK8FVODrDGjhnHwxXIks97n9FQGbTO4Wg+3B2zfZrgSrfXUnwNvZ52SjHGTewwVn8Z9D6sEsWxVGEJdJefaCg+t0E/Rc1SCS+DZ/fZkn4HSMdSFgH7QSijWqrGjNwpeOlgspwIvV0YU/A88matzP3X8nXanBtSsLelkIg34a9+pnfX/RcTITE+cVLpKE4MGrNfi3tt42uE7/JxC3FPFc+GEi8B+ElXM6JmSph6X5F2S5BX5tOESDjpewXfJUV8iVEe4AYTQwThTlwXYFcycnWnsnOLNbSmpT7+MZHT/mdppJoIPxGGrXEByK5amYygQcfm9V2wrTBmvQr3NUDNhYPzX8E1evTXcm/x3XLaj8akizXCQxnccjmetYFiVD8ex/3JEMykxgaCPb6+DJscDD3VSA0ptgZ+i2IgRMamWaujdXAgQJ5+CIu39YA/+o09R8Cbi1MX8kYZHP7LS3kp04JgDnL2V4lIiYQHYjxABZcHKZABr59UgqO6haXmeZDLyfR8UWuI7t5YT+2QRH2w4uCupAYHNjxuM22gAI+G9KGHy/ixQ/eQgAfVMUm+vbNPf95xlgvve9W2OzkZ3yNTfqCl05zOFevzWSSIycxwo1GsH5wlNtIajpciemVBFbZjgLlvI9ChnxillA1BhpQ0W8HGuyw7k0mFxyXB6kPsHaZJ4kEBSu4yt+9DXLyevGFz9CkRL72L28CpDO5JOCLa7W2yUeDXC3Na4J5u6YOoSLb4YeI0QXXetNttJ9GJjS3n9j+yFmeEhubkdKeuiPcARb6VQXaC88h4HBTU87vyoauDZlT6W6Z+41G7kvRaOQSBTiAHTrak4vwu7rTvJP3y14Qa0l5b5oBoM0Vj46QAhJ4kmysBU0lm5K8DBtQF/Xo1n2MmiNdLsNxKVXsFmy0L17MMz7cylyd9mvHyvXM9rF3c0o7iUS7CiHpH0599Fkz6n6HfKajJO1hNe/KJhv0OBJc7OPDAqonjcdXIIw0IjNpFXrZgO0UmOMXOj2kY5oiDUGmwZ0Waa/ZZKq8OKDBnviTXkuqXjjtDNqvmiOIs4+UD7d5rg/RYQYxbs0VaWMv6shwwAdHkljePFbdYb0B3L97z1X+g/D+Qd182MPFIZIQv785+3KGae3mCmYz1as46fjZWnBg+HF8RVVKW2glYL6dhoswHaBUeEjzQLz1kqzMMcjxWLem7y/f7Xwo0+IU43sigN8sq7pv2rKL1u+9P1wnxL+36H3dLh94/kqISsPzRzm0EFZNFK8Uzmfp4MjnJAP5AurN8YB0tPzrxMmc2Wkx0MuR79dpY803KYTuCyCs0HIk6kj6oeJvLSezMxpytaHvb07xJcyNP3NfcNJr3I0zsAVCsCRrB8DwGink0FaHMXlkWtaAuL0PajK3iMXomD8nbs+getrjRLKsFwcKYFCv8iRn59OTA21qyD+FTfAVxp+uVrqBWsfDnYmTks6JidV27rnZVDvVu/Wc/ajKo9aSVQSnP7uTAefGa/tgPRd1gTtOYWeIzrpuB8DtifT6akgm9aoJY5DgC1WlI18dlugL4TCheEbCzwdiAYsVkWUmvI0M6kgmyOQUBK+UAA+ZKTdNef2ofRBxoqL5gu9rGvJXus9wSyg+gndxgityLa/KsesdvU6VKI0E5G3cizOpVVoxMB+VaofUB1IE2t+VLc2Lz7J4KU0sjsDR2b6ySlAU6YxbI7xt77169iF3W2Jl9I/ztUJQHltZnQf1rotk48Pb1myDt2oG5ztcR69KI1gTrJMZVKorpo0zNi5/CJmKt5SA12eoWim70C2EqD4YxCtN6zO1X5Se3p/Ng4zdPVERxhHknrRpBhRpSN67RfNLH+A4E4ybu4L2dd7YN/GpiESuusutedZ697t47WG0z9PCuHnpcKJLPgs+R2YFi2/wJGiaFYdqNK+feXziI8MP46rS2PPmTZd8hHG+R1LMXq2KNks0fD8e/njE+DU/1mSt71llkw2KnbiuayGrQGT4q6qR/LwseWDIsrsxqwABEV2h79RIHmo3i5zcKfA3FnBm/UOklyWJmfyYTU4V+kRqIh9R94JDaIIROTjEeB+SgUCzyotXdS5C2DaCAQ/xU3ZD2HbcmqxFB2RbYk3tqPzJfrVMeODZgH/VM6NKl/zgfqX1JMNAy84g2tMrRNZeOh9zlSyTs8s8RnVCx4tdELFhxSgz1OzACdG9QlxPBNsWsVF9vwD30JQLZd/xupdGdtrjl4VFdnXXzTmtGw/XcDMRY+HkPjHwRQFBAM9mpFocpnlKUC6/vWJXbDavb8soaMBut0N3bMyxhZ47hFbi8o1TV4DOepUjowr0ZzUd9QhvEqjZUaCkrr4T+AvS2fkRkprXzGDvDEt+t7cNwAG9eDJixXm3FLLn0v1DoSxkZZ6P7LDJQteOM9ae5Qc/DgN2PROmtRRmvdHsFDC5hf7Jqq12uK0cBs+O/lFwY8L4FpKl3wzflTlsjYcEbS/jt18iP9tsLLe7eL7pVKutstY3c/1FHOTO7BGVhSVbZF8gw9wer0sWu5IGxygY1b4Fuy3OoeYOHGRQ+Vzc6CeOR33u9TGL3/mONXZObHDAn7I1NyRuwydKTRdazRiktsV38nTzVzrWE4oAqTmYiBvHNJ/HiLklr7fE9xoWugYGgCO3qRCk7Qcac6ipMpf2WCw1RVnqGkn5XloQ7blTp918iOJrom9HJNeKV0tfbgMOAparNCp3H6OE2K/c8FZA1DIaYCz0N2l10kR2WLRUvIb9t3tTiq8YeI+h2Hqz60lZ3esu5xwaGMX8DrLRMqvMg6y8yvP7lPoy/as9ENm8wMX6GKEjm2R3ryCwbMrVJcf+YfYG476GaUit2ow3KWOshL7OboXMJSbce315SqDQ/zhR3j16ozdm7ia41P88UcfQqiWOnpfVINofm/V5lHtA9cJtHf6h8AT1HW69LwScZvGe7VVIPyc9FuNwR08vG+onu/Z84ypL7azkyambjxykXzuw73JsSE7F23zctn3+1GSYVPA0IT7CeeIfu06QTLYI4V1lOLyw2je8oddg5stLic0fpzV6Oz3jhPaxKwKqjUTarojGhF7/bYduhux9hZ8JblbUTFy6ywU+P56bKz65ctbhUNxbmDseVCDqju8iC/kGDA3Z0Jzx1f9Q5EJb/jIrYB4aBgj6l1B/8wbODZAnXm5WrK6UlJLy+krPBjKUA8mHDPWRLjULk/kMQMYlr9D9zbpHuMULDGzusvHtUUztF6ywewaZ3k4y5ALWy/obqIDB+69Z2kByjS6UebfYG7KFD8+pd2zgdF+s4kJXKgMIWjEz/YcQyaCRR2zgeBFoiwFjPUKth7hxoZNE2vXN0IzepS43NSLVQoWhaT8h9WDkxMX8zInrdy5hJ+0pTShv92iWTx4CwZG6R/dQvgM0GaaD+MSmEhAQxcynu+xhcvUZBORNVdnQAFey7dYHGnUhkumUUBwH21cMZcyxcf9BhCJM2ml4Ms92rRISvqN3SHvs3eRa9uLDucfA5dRGUe5Nf0kpjrpbpH/2wQChddSdF8h6MqSENs8bu5MblvbD2TcYvHdDA5AiF6P6B9Z2X1HUKQj00+hSVla8UW44yCYO03Hsn+7KNoFr1voX6kVGPTVGeFvSItQ51OKduv1vjPKKkka5jQ2sbpC+mqFN/OfjSzYkIQwo8LJNXHVU1D4ydrguMzFL2bLnl2u3O4eiJy2B1N8MOpgqECB0/2pFZo36Ud1UNVWpmPwiAf+kBYHBMNgaJ7B9KkSxPz+l3s0VSzVVXOWDsJ/MfQxDseTlmhemxFwYRKlQcYePouheTDZerP/fTmKobgd5KMPch+o3fsNGpORCYrX3hz9cjkbsgnh5MqVPmfS+uTMoRTvIKrisydwFQIfgLQYfOWuad0zVj+WyU+zNsOPY7f7BUDXdAgm3VXlsmuoIC+HpO6S3VcLd1/CnEjaCxjLJmZkLkaxkJjXfbxjx38KPVFPCadfpv4sGmYns6ze8NWmPBwVM4siv0pmFPkBu+o0Jl9mGDwfk+/G/56A926yb1M4Rl4oFo7tCIaInyS5d2m9DxH0tFclfT4WRLJm+U8fWQVSXywn3GNJR6PbMi8OK+Iygyg58ujIGZTXw83mXBjQ3ife5cOT6xhv7e3lpj28lha5jRFCfO6lN6enD5ISPd86EA+V/BsvB7yO7tPvMrDf8lQfand4pH/y1BjeghuDOJSy0RSsBYQC9Nhb3+ajRmpRqDSCtJdjS1OxBmkaMJOJpe/gOmZr4z+iThvgrOZmgLapNMAOQWBNtWATT06yRDrHqDXLlZmIEA1GyaOqGOJ7Pc7W09Y/QMxSOj6GmZAEgEmlMsuhlQjLcaGyviMbF7rni27jBURmiihgnsJNrEWZttaWcTjXHOgPEzbSTTwlPDiYKTWY+g/Pr6SkZ5GOHy1aHrUhpwzpJh2v5hyhSNWtriNbsNoWc3BRsjr/4cuhWx/0d9LGy5Urqp36GqJBdhx1xwl5ukzNbV78XcTCp+GUEvKSUuu/jNdTiHbxlWCtHAjQwA7zen5gZbLpUy5oeGDi9lm8yeG4xe6twxBCO+Xl2x6jeiSXxOxz+3KP5v31Mc3YPu891wCTdaQh9ZSddO+LfS4NUWGXtoUB2YnHVHrTcwh975jEr/ITFh/xycqaTnTeZq7xlZL5ZInCN0LxYPfxJ/LTqmnQdYq6+HmwLDioUae/V6dZJSrkEdKaPgLBx06eeFNi6MtccSeVHrJrWA00S9rry5qKTwL5QiPKeodda8h9LBH3Gee5bRwsNj9Ih3wJz28drl/24QTqWLCB7oxpz/qAXjtCXwLU8DBMmRj4lytkpV7f/gt+evawtjXOzua/124Bs3028eCqjf+leuO+3r8fCE9OBGGZVb1M5MYAh/K6wgTakpLpXdTZto2GFQdb6k7KBEiguB2v4VgJcDA54bZ8SyL+Vog0PvHFjlrTvroOgzuL+KgkN8eNc15YHHJyntjI+ARr14mpFEAPHRGEl1h8DxPvZ77W929BITClgRrBs3U+ZOYtTjsUjRrOxYgQjcK9oxv13oya7wA3XDJ1P3ydXsHx0C4TSWz50ZlKyV8JfdNN0VSxSXwkyLGGAAAAAAA=",
    "flexiones-inclinadas": "data:image/webp;base64,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",
    "dead-bug": "data:image/webp;base64,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",
    "puente-marchado": "data:image/webp;base64,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",
    "press-suelo": "data:image/webp;base64,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",
    "curl-biceps": "data:image/webp;base64,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",
    "triceps-apoyo": "data:image/webp;base64,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",
    "elevaciones-laterales": "data:image/webp;base64,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",
    "plancha": "data:image/webp;base64,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",
    "plancha-lateral-derecha": "data:image/webp;base64,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",
    "plancha-lateral-izquierda": "data:image/webp;base64,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",
    "patada-gluteo-derecha": "data:image/webp;base64,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",
    "patada-gluteo-izquierda": "data:image/webp;base64,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",
    "elevaciones-gemelo": "data:image/webp;base64,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",
    "patada-triceps": "data:image/webp;base64,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",
    "remo-vertical": "data:image/webp;base64,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",
    "shoulder-taps": "data:image/webp;base64,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",
  };

  const IMAGE_KEY = {
    "Flexiones": "flexiones",
    "Puente de glúteo": "puente-gluteo",
    "Remo con mancuernas": "remo-mancuernas",
    "Bicycle abs": "bicycle-abs",
    "Press de hombros": "press-hombros",
    "Elevaciones de piernas": "elevaciones-piernas",
    "Peso muerto rumano": "peso-muerto-rumano",
    "Flexiones inclinadas": "flexiones-inclinadas",
    "Dead bug": "dead-bug",
    "Remo inclinado": "remo-mancuernas",
    "Puente marchado": "puente-marchado",
    "Press de suelo": "press-suelo",
    "Curl de bíceps": "curl-biceps",
    "Tríceps con apoyo": "triceps-apoyo",
    "Elevaciones laterales": "elevaciones-laterales",
    "Plancha": "plancha",
    "Plancha lateral derecha": "plancha-lateral-derecha",
    "Plancha lateral izquierda": "plancha-lateral-izquierda",
    "Patada de glúteo derecha": "patada-gluteo-derecha",
    "Patada de glúteo izquierda": "patada-gluteo-izquierda",
    "Elevaciones de gemelo": "elevaciones-gemelo",
    "Patada de tríceps": "patada-triceps",
    "Remo vertical": "remo-vertical",
    "Shoulder taps": "shoulder-taps",
  };

  const $ = (id) => document.getElementById(id);
  const els = {
    library: $('libraryScreen'), mainTabs: $('mainTabs'),
    todayPanel: $('todayPanel'), trainingPanel: $('trainingPanel'), training: $('trainingLibrary'),
    progressPanel: $('progressPanel'), nutritionPanel: $('nutritionPanel'), profilePanel: $('profilePanel'),
    player: $('playerScreen'), complete: $('completeScreen'),
    todayTab: $('todayTab'), trainingTab: $('trainingTab'), progressTab: $('progressTab'), nutritionTab: $('nutritionTab'), profileTab: $('profileTab'),
    strengthTab: $('strengthTab'), bikeTab: $('bikeTab'),
    list: $('routineList'), detail: $('routineDetail'), roundPicker: $('roundPicker'), duration: $('durationEstimate'), start: $('startBtn'),
    todayGreeting: $('todayGreeting'), todayHorizon: $('todayHorizon'), todayPlanSummary: $('todayPlanSummary'),
    todayRecommendation: $('todayRecommendation'), openRecommendation: $('openRecommendationBtn'), todayWeekPlan: $('todayWeekPlan'),
    todayNutritionSummary: $('todayNutritionSummary'), todayReview: $('todayReview'),
    playerRoutine: $('playerRoutine'), playerRound: $('playerRound'), progressText: $('playerProgressText'),
    progress: $('progressBar'), stage: $('stage'), phase: $('phaseLabel'), exercise: $('exerciseName'),
    visual: $('visualCue'), timer: $('timerValue'), coach: $('coachCue'), next: $('nextCue'),
    pause: $('pauseBtn'), skip: $('skipBtn'), quit: $('quitBtn'), back: $('backBtn'),
    confirmWorkout: $('confirmWorkoutBtn'), discardWorkout: $('discardWorkoutBtn'), completeTitle: $('completeTitle'), completeSummary: $('completeSummary'),
    effortPicker: $('effortPicker'), install: $('installBtn'), voiceNotice: $('voiceNotice'),
    progressSummary: $('progressSummary'), measurementDue: $('measurementDue'), measurementForm: $('measurementForm'), measurementDate: $('measurementDate'),
    chartMetric: $('chartMetric'), chartRange: $('chartRange'), chart: $('progressChart'), goals: $('goalStatus'), progressGoalTitle: $('progressGoalTitle'),
    weeklyTraining: $('weeklyTraining'), monthlySummary: $('monthlySummary'), markForm: $('markForm'), markDate: $('markDate'),
    recentHistory: $('recentHistory'), exportBtn: $('exportBtn'), importBtn: $('importBtn'), importInput: $('importInput'), progressMessage: $('progressMessage'),
    nutritionModePill: $('nutritionModePill'), energyEstimate: $('energyEstimate'), nutritionGuidance: $('nutritionGuidance'),
    auditCard: $('auditCard'), auditStatus: $('auditStatus'), startAudit: $('startAuditBtn'), auditForm: $('auditForm'), auditDate: $('auditDate'), auditHistory: $('auditHistory'),
    profileForm: $('profileForm'), profileMessage: $('profileMessage'), profileSummaryCard: $('profileSummaryCard'), redoOnboarding: $('redoOnboardingBtn'),
    onboarding: $('onboardingScreen'), onboardingStepLabel: $('onboardingStepLabel'), onboardingProgressBar: $('onboardingProgressBar'), onboardingLead: $('onboardingLead'),
    onboardingBack: $('onboardingBackBtn'), onboardingNext: $('onboardingNextBtn'), onboardingNav: $('onboardingNav'), onboardingResult: $('onboardingResult'),
    onboardingResultContent: $('onboardingResultContent'), onboardingSave: $('onboardingSaveBtn'), onboardingAdjust: $('onboardingAdjustBtn'), onboardingCancel: $('onboardingCancelBtn')
  };

  const PROGRESS_KEY = 'hmb-progress-v1';
  const PROFILE_KEY = 'hmb-profile-v1';
  const ACTIVE_WORKOUT_KEY = 'hmb-active-workout-v1';
  const ACTIVE_WORKOUT_SCHEMA = 1;
  const ACTIVE_WORKOUT_MAX_AGE_MS = 4 * 60 * 60 * 1000;
  const ONBOARDING_VERSION = 4;
  let progressData = loadProgress();
  let profile = loadProfile();
  let onboardingRequired = !profile || Number(profile.onboardingVersion || 0) < ONBOARDING_VERSION;
  let onboardingStep = 0;
  let onboardingEditing = false;
  let onboardingDraft = null;
  let section = 'today';
  let previousSection = 'today';
  let mode = 'strength';
  let selectedIndex = 0;
  let rounds = Number(localStorage.getItem('hmb-rounds-v6')) || 3;
  if (![1, 2, 3].includes(rounds)) rounds = 3;

  let sequence = [];
  let timeline = [];
  let stepIndex = -1;
  let timerId = null;
  let paused = false;
  let workoutStartedAt = 0;
  let pauseStartedAt = 0;
  let pausedTotalMs = 0;
  let skipOffsetMs = 0;
  let audioContext = null;
  let selectedVoice = null;
  let wakeLock = null;
  let deferredInstallPrompt = null;
  let lastAnnouncedSecond = null;
  let workoutFinished = false;
  let pendingReload = false;
  let lastWorkoutId = null;
  let pendingWorkoutEntry = null;
  let pendingWorkoutEffort = null;
  let currentRecommendation = null;

  const sets = () => mode === 'strength' ? STRENGTH : BIKE;
  const currentRoutine = () => sets()[selectedIndex];
  const currentRoundCount = (routine = currentRoutine()) => Number(routine?.fixedRounds) || rounds;

  function activeWorkoutPhase() {
    if (workoutFinished && pendingWorkoutEntry) return 'complete';
    if (!workoutFinished && workoutStartedAt > 0 && sequence.length) return 'playing';
    return null;
  }

  function saveActiveWorkout() {
    const phase = activeWorkoutPhase();
    if (!phase) return;
    const routine = currentRoutine();
    if (!routine) return;
    try {
      localStorage.setItem(ACTIVE_WORKOUT_KEY, JSON.stringify({
        schema: ACTIVE_WORKOUT_SCHEMA,
        appVersion: VERSION,
        phase,
        mode,
        routine: routine.name,
        selectedIndex,
        rounds: mode === 'strength' ? rounds : null,
        workoutStartedAt,
        pauseStartedAt: paused ? pauseStartedAt : 0,
        pausedTotalMs,
        skipOffsetMs,
        paused,
        pendingWorkoutEntry: phase === 'complete' ? pendingWorkoutEntry : null,
        pendingWorkoutEffort: phase === 'complete' ? pendingWorkoutEffort : null,
        savedAt: Date.now()
      }));
    } catch (_) {}
  }

  function clearActiveWorkout() {
    try { localStorage.removeItem(ACTIVE_WORKOUT_KEY); } catch (_) {}
  }

  function readActiveWorkout() {
    try {
      const raw = localStorage.getItem(ACTIVE_WORKOUT_KEY);
      if (!raw) return null;
      const saved = JSON.parse(raw);
      const startedAt = Number(saved?.workoutStartedAt);
      const savedAt = Number(saved?.savedAt || startedAt);
      if (Number(saved?.schema) !== ACTIVE_WORKOUT_SCHEMA
        || !['playing', 'complete'].includes(saved?.phase)
        || !['strength', 'bike'].includes(saved?.mode)
        || !Number.isFinite(startedAt) || startedAt <= 0
        || !Number.isFinite(savedAt)
        || Date.now() - savedAt > ACTIVE_WORKOUT_MAX_AGE_MS) {
        clearActiveWorkout();
        return null;
      }
      return saved;
    } catch (_) {
      clearActiveWorkout();
      return null;
    }
  }

  function loadProgress() {
    try {
      const parsed = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
      return {
        measurements: Array.isArray(parsed.measurements) ? parsed.measurements : [],
        workouts: Array.isArray(parsed.workouts) ? parsed.workouts : [],
        marks: Array.isArray(parsed.marks) ? parsed.marks : [],
        nutrition: Array.isArray(parsed.nutrition) ? parsed.nutrition : []
      };
    } catch (_) {
      return { measurements: [], workouts: [], marks: [], nutrition: [] };
    }
  }

  function saveProgress() {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressData));
  }

  function loadProfile() {
    try {
      const parsed = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null');
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (_) { return null; }
  }

  function saveProfile() {
    if (profile) localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }

  function uid() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function isoToday(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function parseLocalDate(value) {
    if (value instanceof Date) {
      const copy = new Date(value.getTime());
      if (!Number.isNaN(copy.getTime())) { copy.setHours(12,0,0,0); return copy; }
    }
    const raw=String(value??'').trim();
    const match=raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if(match){
      const date=new Date(Number(match[1]),Number(match[2])-1,Number(match[3]),12,0,0,0);
      if(!Number.isNaN(date.getTime()))return date;
    }
    const parsed=new Date(raw);
    if(!Number.isNaN(parsed.getTime())){parsed.setHours(12,0,0,0);return parsed;}
    const fallback=new Date();fallback.setHours(12,0,0,0);return fallback;
  }

  function formatDate(value) {
    if (!value) return '';
    return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(parseLocalDate(value));
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : String(s);
  }

  function num(value) {
    if (value === null || value === undefined || String(value).trim() === '') return null;
    const n = Number(String(value).replace(',', '.'));
    return Number.isFinite(n) ? n : null;
  }


  function latestMeasurementValue(field) {
    return progressData.measurements.filter((x)=>num(x[field])!==null).sort((a,b)=>String(b.date).localeCompare(String(a.date)))[0]?.[field] ?? null;
  }

  function currentWeight() { return num(latestMeasurementValue('weight')) ?? num(profile?.weight); }

  function goalLabel(goal) {
    return ({lose_fat:'Adelgazar',tone:'Tonificar / recomposición',strength:'Ganar músculo y fuerza',endurance:'Mejorar resistencia',maintain:'Mantenerme y estar en forma',habit:'Crear hábito y constancia'})[goal] || 'Estar en forma';
  }
  function nutritionModeLabel(value) { return ({off:'Pausada',orientation:'Orientación',audit:'Auditoría puntual'})[value] || 'Orientación'; }
  function activityFactor(value) { return ({seated:1.20,breaks:1.30,standing:1.45,low:1.20,light:1.30,moderate:1.45,high:1.55})[value] || 1.30; }
  function round25(value) { return Math.round(value/25)*25; }
  function bmiFor(weight,height){return weight&&height?weight/((height/100)**2):null;}
  function bmiLabel(value){if(!value)return '—';if(value<18.5)return 'Bajo';if(value<25)return 'Saludable';if(value<30)return 'Elevado';return 'Alto';}
  function bodyTypeLabel(value){return ({lean:'Delgado/a',average:'Intermedio',soft:'Grasa algo elevada',high:'Grasa claramente elevada'})[value]||'Sin definir';}
  function desiredLookLabel(value){return ({leaner:'Más ligera/o y ágil',defined:'Más definida/o',athletic:'Más atlética/o y fuerte',feel:'Más sana/o y capaz'})[value]||'Sentirme mejor';}
  function experienceLabel(value){return ({beginner:'Empezando o retomando',some:'Entreno ocasional',regular:'Entreno regular'})[value]||'Sin definir';}
  function activityLabel(value){return ({seated:'Mayormente sentado/a',breaks:'Descansos activos',standing:'De pie / en movimiento',low:'Mayormente sentado/a',light:'Descansos activos',moderate:'De pie / en movimiento',high:'Muy activo/a'})[value]||'Sin definir';}
  function deriveSchedule(hours){const h=Number(hours)||2;if(h<=1)return {days:2,sessionMinutes:20};if(h<=1.5)return {days:3,sessionMinutes:20};if(h<=2)return {days:4,sessionMinutes:20};return {days:5,sessionMinutes:25};}

  function estimateEnergy(source=profile) {
    if (!source || source.sex === 'skip' || source.energySafety === 'skip') return null;
    const weight=source===profile?currentWeight():num(source.weight), height=num(source.height), age=num(source.age);
    if(!weight||!height||!age) return null;
    const bmr=10*weight+6.25*height-5*age+(source.sex==='male'?5:-161);
    const base=bmr*activityFactor(source.activity);
    const weeklyHours=Number(source.weeklyHours)||0;
    const plannedExerciseDaily=(weeklyHours*60*5*3.5*weight/200)/7;
    const tdee=base+plannedExerciseDaily;
    const maintenance=[round25(tdee*.96),round25(tdee*1.04)];
    const bmi=bmiFor(weight,height);
    let target=[...maintenance];
    let note=`Estimación: metabolismo basal + actividad cotidiana + unas ${weeklyHours||0} h/sem de entrenamiento. Se revisa con tu tendencia real.`;
    const safety=source.energySafety||'none';
    if(safety!=='none'){
      target=null;
      note='Por la situación indicada no voy a generar un objetivo calórico automático. El plan de entrenamiento y el seguimiento siguen disponibles.';
    }else if((source.goal==='lose_fat'||source.goal==='tone')&&bmi&&bmi<18.5){
      target=null;
      note='Con un IMC por debajo del rango habitual no voy a recomendar un déficit automático. Priorizaría valoración profesional y rendimiento.';
    }else if(source.goal==='lose_fat'){
      const targetBmi=num(source.targetWeight)?bmiFor(num(source.targetWeight),height):null;
      target=targetBmi&&targetBmi<20?[round25(tdee*.90),round25(tdee*.95)]:[round25(tdee*.85),round25(tdee*.90)];
      if(targetBmi&&targetBmi<20)note+=' Tu meta está cerca del extremo bajo del rango habitual, así que no voy a proponer un recorte agresivo.';
    }else if(source.goal==='tone'){
      target=bmi&&bmi<20?[round25(tdee*.98),round25(tdee*1.02)]:[round25(tdee*.93),round25(tdee*.98)];
    }else if(source.goal==='strength'){
      target=[round25(tdee),round25(tdee*1.05)];
    }
    if(target){
      const floor=source.sex==='male'?1500:1200;
      if(target[1]<floor){target=null;note='El cálculo quedaría demasiado bajo para usarlo como objetivo automático. Prefiero no darte una cifra engañosamente precisa.';}
      else if(target[0]<floor)target[0]=floor;
    }
    const protein=[Math.round(weight*1.6),Math.round(weight*2.0)];
    return {bmr:round25(bmr),maintenance,target,protein,note,weight,tdee:round25(tdee),bmi};
  }

  function buildWeeklyPlan(source=profile) {
    if(!source) return [];
    const e=(modeName,routine)=>({mode:modeName,routine});
    const plans={
      lose_fat:[e('strength','Full Body A'),e('bike','BICI 20 · Base'),e('strength','Full Body B'),e('bike','BICI 20 · Intervalos'),e('strength','Upper Body')],
      tone:[e('strength','Full Body A'),e('strength','Glúteo + posterior'),e('bike','BICI 20 · Base'),e('strength','Upper Body'),e('bike','BICI 20 · Intervalos')],
      strength:[e('strength','Full Body A'),e('strength','Upper Body'),e('strength','Full Body B'),e('strength','Glúteo + posterior'),e('bike','BICI 20 · Base')],
      endurance:[e('bike','BICI 20 · Base'),e('strength','Full Body A'),e('bike','BICI 20 · Intervalos'),e('strength','Core HIIT'),e('bike','BICI 30 · Fondo')],
      maintain:[e('strength','Full Body A'),e('bike','BICI 20 · Base'),e('strength','Full Body B'),e('strength','Core HIIT'),e('bike','BICI 20 · Intervalos')],
      habit:[e('strength','Exprés 6'),e('bike','BICI 12 · No negociable'),e('strength','Full Body A'),e('strength','Core HIIT'),e('bike','BICI 20 · Base')]
    };
    let out=[...(plans[source.goal]||plans.tone)];
    const equipment=Array.isArray(source.equipment)?source.equipment:[];
    if(!equipment.includes('bike')){const replacements=['Core HIIT','Upper Body','Glúteo + posterior'];let r=0;out=out.map((item)=>item.mode==='bike'?e('strength',replacements[(r++)%replacements.length]):item);}
    const minutes=Number(source.sessionMinutes)||20;
    if(minutes<=12)out=out.map((item)=>item.mode==='strength'?e('strength','Exprés 6'):e('bike','BICI 12 · No negociable'));
    else if(minutes>=25&&equipment.includes('dumbbells')&&['lose_fat','tone','strength','maintain'].includes(source.goal)&&source.experience!=='beginner'){
      const first=out.findIndex((item)=>item.mode==='strength');if(first>=0)out[first]=e('strength','Full Body · Completa');
    }
    if(!equipment.includes('dumbbells')){
      const bodyweight=['Fuerza P1 · Cuerpo completo','Fuerza P2 · Cuerpo completo'];let b=0;
      out=out.map((item)=>item.mode==='strength'?e('strength',bodyweight[(b++)%bodyweight.length]):item);
    }
    return out.slice(0,Math.max(2,Math.min(5,Number(source.days)||4)));
  }

  function weekStartDate(){const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return d;}
  function workoutsThisWeek(){const start=weekStartDate();return progressData.workouts.filter((w)=>parseLocalDate(w.date)>=start).sort((a,b)=>String(a.timestamp||a.date).localeCompare(String(b.timestamp||b.date)));}
  function workoutMode(workout){
    if(workout?.mode==='strength'||workout?.mode==='bike')return workout.mode;
    const routine=String(workout?.routine||'');
    if(/^BICI\b/i.test(routine))return 'bike';
    return routine ? 'strength' : null;
  }
  function matchWeeklyPlan(plan,workouts=workoutsThisWeek()){
    const matched=new Set();
    workouts.forEach((workout)=>{
      const modeName=workoutMode(workout);if(!modeName)return;
      let index=plan.findIndex((item,i)=>!matched.has(i)&&item.mode===modeName&&item.routine===workout.routine);
      if(index<0)index=plan.findIndex((item,i)=>!matched.has(i)&&item.mode===modeName);
      if(index>=0)matched.add(index);
    });
    const matchedIndices=[...matched].sort((a,b)=>a-b);
    const nextIndex=plan.findIndex((_,i)=>!matched.has(i));
    return {matchedIndices,done:matchedIndices.length,nextIndex};
  }
  function nextPlanRecommendation(){
    const plan=buildWeeklyPlan(),match=matchWeeklyPlan(plan);
    return {plan,done:match.done,matchedIndices:match.matchedIndices,nextIndex:match.nextIndex,item:match.nextIndex>=0?plan[match.nextIndex]:null};
  }
  function horizonDate(){if(!profile)return null;const d=parseLocalDate(profile.goalStartedAt||profile.createdAt||isoToday());d.setMonth(d.getMonth()+(Number(profile.timeframe)||3));return Number.isNaN(d.getTime())?parseLocalDate(isoToday()):d;}
  function nextReviewDate(){if(!profile)return null;const start=parseLocalDate(profile.goalStartedAt||profile.createdAt||isoToday()),now=new Date();now.setHours(12,0,0,0);let r=new Date(start);let guard=0;while(r<=now&&guard<240){r.setDate(r.getDate()+28);guard++;}return Number.isNaN(r.getTime())?new Date(now.getTime()+28*86400000):r;}

  function daysSinceLastWorkout(){
    if(!progressData.workouts.length)return null;
    const last=progressData.workouts.slice().sort((a,b)=>String(b.timestamp||b.date).localeCompare(String(a.timestamp||a.date)))[0];
    return Math.max(0,Math.floor((new Date()-parseLocalDate(last.date))/86400000));
  }
  function todayCoachCopy(rec){
    if(!rec.item)return `Bien. ${rec.plan.length}/${rec.plan.length}. Sin confeti: has hecho lo que dijiste que ibas a hacer. La semana que viene, repetimos.`;
    if(rec.item.routine==='BICI 12 · No negociable')return 'Doce minutos. No me vendas que no los tienes.';
    const gap=daysSinceLastWorkout();
    if(gap!==null&&gap>=3&&rec.done===0)return `Llevas ${gap} días sin registrar un entrenamiento. No es una tragedia. Convertirlo en ${gap+1} ya empieza a parecer una decisión. Hoy toca esto.`;
    if(rec.done===0)return 'No necesitas motivación. Necesitas darle a EMPEZAR.';
    if(rec.done===rec.plan.length-1)return `Llevas ${rec.done}/${rec.plan.length}. Te queda una. No conviertas el último paso en una negociación.`;
    return `Llevas ${rec.done}/${rec.plan.length}. Bien. Haz la siguiente y seguimos; no hace falta montar una película.`;
  }

  function objectiveSnapshot(source=profile) {
    if(!source) return null;
    const startWeight=num(source.weight), nowWeight=source===profile?(currentWeight()||startWeight):startWeight, targetWeight=num(source.targetWeight);
    const startWaist=num(source.waist), latestWaist=source===profile?num(latestMeasurementValue('waist')):null, nowWaist=latestWaist??startWaist, targetWaist=num(source.targetWaist);
    const horizon=source===profile?horizonDate():(()=>{const d=new Date();d.setMonth(d.getMonth()+(Number(source.timeframe)||6));return d;})();
    const weightDirection=targetWeight&&startWeight?Math.sign(targetWeight-startWeight):0;
    let weightProgress=null, weightRemaining=null;
    if(targetWeight&&startWeight&&nowWeight){
      const total=Math.abs(targetWeight-startWeight), done=weightDirection<0?startWeight-nowWeight:nowWeight-startWeight;
      weightProgress=total>0?Math.max(0,Math.min(100,(done/total)*100)):100;
      weightRemaining=Math.max(0,Math.abs(targetWeight-nowWeight));
    }
    let waistProgress=null, waistRemaining=null;
    if(targetWaist&&startWaist&&nowWaist){
      const total=Math.abs(targetWaist-startWaist), dir=Math.sign(targetWaist-startWaist), done=dir<0?startWaist-nowWaist:nowWaist-startWaist;
      waistProgress=total>0?Math.max(0,Math.min(100,(done/total)*100)):100;
      waistRemaining=Math.max(0,Math.abs(targetWaist-nowWaist));
    }
    const primary=targetWeight?{kind:'weight',label:'Peso',start:startWeight,now:nowWeight,target:targetWeight,unit:'kg',progress:weightProgress,remaining:weightRemaining}:
      targetWaist?{kind:'waist',label:'Cintura',start:startWaist,now:nowWaist,target:targetWaist,unit:'cm',progress:waistProgress,remaining:waistRemaining}:null;
    return {primary,targetWeight,targetWaist,startWeight,nowWeight,startWaist,nowWaist,horizon};
  }
  function objectiveSummary(source=profile){
    const snap=objectiveSnapshot(source);if(!snap)return 'Sin objetivo configurado';
    if(snap.primary){const p=snap.primary;return `${p.now??'—'} → ${p.target} ${p.unit}${p.remaining!=null?` · faltan ${p.remaining.toFixed(1)} ${p.unit}`:''}`;}
    if(source.goal==='strength')return 'Ganar fuerza · medir rendimiento cada 4 semanas';
    if(source.goal==='tone')return 'Recomposición · cintura, rendimiento y constancia';
    return `${goalLabel(source.goal)} · sin cifra corporal fija`;
  }

  function renderToday(){
    if(!profile)return;
    const name=String(profile.name||'').trim();
    els.todayGreeting.textContent=name?`Hoy, ${name}`:'Tu plan de hoy';
    currentRecommendation=null;
    try{
      const horizon=horizonDate()||parseLocalDate(isoToday());
      const horizonText=new Intl.DateTimeFormat('es-ES',{month:'short',year:'numeric'}).format(horizon);
      els.todayHorizon.textContent=`${Number(profile.timeframe)||3} meses · hasta ${horizonText}`;
      const week=workoutsThisWeek(),strength=sumMinutes(week,'strength'),bike=sumMinutes(week,'bike');
      const safeNote=String(profile.goalNote||'').replace(/[<>]/g,'');
      const objective=objectiveSnapshot();
      const objectiveText=objectiveSummary();
      const daysTarget=Math.max(2,Math.min(5,Number(profile.days)||4));
      els.todayPlanSummary.innerHTML=`<p class="eyebrow">TU OBJETIVO</p><h3>${goalLabel(profile.goal)}</h3><p><strong>${objectiveText}</strong> · horizonte ${horizonText}</p><p>${daysTarget} días/semana · ≈ ${profile.weeklyHours||'?'} h/sem · sesiones de ≈ ${Number(profile.sessionMinutes)||20} min${safeNote?` · ${safeNote}`:''}</p><div class="hero-stats"><div class="hero-stat"><strong>${week.length}/${daysTarget}</strong><span>sesiones esta semana</span></div><div class="hero-stat"><strong>${objective?.primary?.progress!=null?`${Math.round(objective.primary.progress)}%`:'4 sem'}</strong><span>${objective?.primary?'avance hacia meta':'próxima revisión'}</span></div><div class="hero-stat"><strong>${strength+bike}m</strong><span>entrenamiento</span></div></div>`;

      const rec=nextPlanRecommendation();
      currentRecommendation=rec?.item||null;
      if(rec?.item){
        const icon=rec.item.mode==='bike'?'🚲':'🔥';
        els.todayRecommendation.innerHTML=`<h3>${icon} ${rec.item.routine}</h3><p>${todayCoachCopy(rec)}</p>`;
        els.openRecommendation.hidden=false;
        els.openRecommendation.disabled=false;
      }else if(rec?.plan?.length){
        els.todayRecommendation.innerHTML=`<h3>✅ Semana hecha</h3><p>${todayCoachCopy(rec)}</p><small>Si haces algo más, que sea porque te apetece: paseo, movilidad o bici suave. No vamos a convertir cumplir el plan en otra obligación.</small>`;
        els.openRecommendation.hidden=true;
      }else{
        els.todayRecommendation.innerHTML='<h3>⚠️ No tengo plan todavía</h3><p>Algo del perfil no cuadra. Entra en PERFIL y revisa el cuestionario; no voy a inventarme una rutina a ciegas.</p>';
        els.openRecommendation.hidden=true;
      }
      const matchedPlanIndices=new Set(rec?.matchedIndices||[]);
      els.todayWeekPlan.innerHTML=(rec?.plan||[]).map((item,index)=>{const done=matchedPlanIndices.has(index);return `<div class="plan-item${done?' done':''}"><span class="plan-index">${index+1}</span><div><strong>${item.mode==='bike'?'🚲':'🔥'} ${item.routine}</strong><span>${item.mode==='bike'?'Cardio guiado':'Fuerza guiada'}</span></div><em>${done?'✓':'·'}</em></div>`;}).join('')||'<p class="muted">Todavía no hay sesiones calculadas.</p>';

      const energy=estimateEnergy();
      if(profile.nutritionMode==='off')els.todayNutritionSummary.innerHTML='<p class="muted">Seguimiento pausado. Perfecto: no vas a convertir cada plato en una hoja de Excel. Si algún día quieres datos, lo activas desde PERFIL.</p>';
      else if(energy){const target=energy.target?`${energy.target[0]}–${energy.target[1]} kcal`:'Sin objetivo automático';els.todayNutritionSummary.innerHTML=`<div class="nutrition-kpis"><div><strong>${target}</strong><span>rango orientativo</span></div><div><strong>${energy.protein[0]}–${energy.protein[1]} g</strong><span>proteína orientativa</span></div><div><strong>${nutritionModeLabel(profile.nutritionMode)}</strong><span>seguimiento</span></div></div>`;}
      else els.todayNutritionSummary.innerHTML='<p class="muted">Has elegido no calcular calorías. El módulo puede seguir sirviendo para auditorías puntuales y sensaciones.</p>';

      const review=nextReviewDate(),days=Math.max(0,Math.ceil((review-new Date())/86400000));
      els.todayReview.innerHTML=`<strong>🔎 Próxima revisión del plan</strong><p>${new Intl.DateTimeFormat('es-ES',{weekday:'long',day:'numeric',month:'long'}).format(review)} · en ${days} día${days===1?'':'s'}.</p><small>Revisamos semanas, no numeritos con complejo de protagonista. Un peso suelto no manda aquí.</small>`;
    }catch(error){
      console.error('Hiit Me Baby · renderToday',error);
      const fallbackPlan=buildWeeklyPlan();
      const item=fallbackPlan[0]||null;
      currentRecommendation=item;
      els.todayHorizon.textContent='Plan activo';
      els.todayPlanSummary.innerHTML=`<p class="eyebrow">TU PLAN</p><h3>${goalLabel(profile.goal)}</h3><p>Hay un dato antiguo que no he podido interpretar del todo. No te voy a dejar sin entrenar por eso.</p>`;
      if(item){
        els.todayRecommendation.innerHTML=`<h3>${item.mode==='bike'?'🚲':'🔥'} ${item.routine}</h3><p>No necesitas motivación. Necesitas darle a EMPEZAR.</p>`;
        els.openRecommendation.hidden=false;els.openRecommendation.disabled=false;
      }else{
        els.todayRecommendation.innerHTML='<h3>⚠️ Revisa tu perfil</h3><p>No he podido montar el plan semanal. Entra en PERFIL y vuelve a guardar el cuestionario.</p>';
        els.openRecommendation.hidden=true;
      }
      els.todayWeekPlan.innerHTML=fallbackPlan.map((item,index)=>`<div class="plan-item"><span class="plan-index">${index+1}</span><div><strong>${item.mode==='bike'?'🚲':'🔥'} ${item.routine}</strong><span>${item.mode==='bike'?'Cardio guiado':'Fuerza guiada'}</span></div><em>·</em></div>`).join('');
      els.todayNutritionSummary.innerHTML='<p class="muted">La orientación de alimentación volverá a mostrarse cuando el perfil quede reparado.</p>';
      els.todayReview.innerHTML='<strong>🔧 Perfil antiguo detectado</strong><p>Puedes entrenar mientras lo arreglamos. Si quieres dejarlo limpio, entra en PERFIL y revisa el cuestionario.</p>';
    }
  }

  function nutritionTrendGuidance(){
    if(!profile)return '';
    const last28=progressData.workouts.filter((x)=>inRange(x.date,daysAgo(27))),expected=Math.max(1,(Number(profile.days)||4)*4),adherence=last28.length/expected;
    if(last28.length<Math.max(2,Number(profile.days)||4))return 'Todavía hay pocos datos. Con dos numeritos no hacemos ciencia. Primero varias semanas; luego hablamos de tocar calorías.';
    if(profile.goal==='lose_fat'){
      const wn=recentAverage('waist',28,0),wp=recentAverage('waist',56,28),kn=recentAverage('weight',28,0),kp=recentAverage('weight',56,28);
      const moving=(wn!==null&&wp!==null&&wn<wp-.2)||(kn!==null&&kp!==null&&kn<kp-.2);
      if(moving)return 'La tendencia va donde queríamos. No toques nada por impaciencia: recortar más porque sí sería buscar problemas donde no los hay.';
      if(adherence<.65)return 'Antes de recortar comida, cumple el entrenamiento que ya habíamos pactado. No vamos a arreglar con hambre lo que todavía es un problema de constancia.';
      return 'La tendencia está estable y el entrenamiento va bien. Antes de tocar calorías a ciegas, haz una auditoría de 5 días. Adivinar no cuenta como método.';
    }
    if(profile.goal==='tone')return adherence>=.65?'En recomposición manda el conjunto: cintura, rendimiento y constancia. Si mejoran, que la báscula se haga la interesante todo lo que quiera.':'Primero cumple con el entrenamiento. Afinar la comida antes de tener constancia es ponerle alerón a un coche sin ruedas.';
    if(profile.goal==='strength')return adherence>=.65?'Aquí manda rendir y recuperar mejor. Si eso avanza, deja de perseguir la caloría perfecta como si te debiera dinero.':'Primero cumple con el entrenamiento. Afinar la comida antes de tener constancia es ponerle alerón a un coche sin ruedas.';
    return adherence>=.65?'Ya hay datos para mirar tendencias. Si hambre, energía y rendimiento están bien, no toques cosas solo por aburrimiento.':'Todavía no tocaría la alimentación. Primero una base de entrenamiento decente; luego ya jugamos a afinar.';
  }

  function auditEntries(auditId){return progressData.nutrition.filter((x)=>x.auditId===auditId).sort((a,b)=>String(a.date).localeCompare(String(b.date)));}
  function renderAudit(){
    const enabled=profile?.nutritionMode!=='off';els.auditCard.hidden=!enabled;if(!enabled)return;
    if(!profile.activeAudit){els.auditStatus.innerHTML='<p>No hay auditoría activa. Cuando te interese revisar alimentación, haces cinco días de check-in rápido y luego vuelves a olvidarte del tema.</p>';els.startAudit.textContent='EMPEZAR AUDITORÍA DE 5 DÍAS';els.auditForm.hidden=true;els.auditHistory.innerHTML='';return;}
    const audit=profile.activeAudit,entries=auditEntries(audit.id),today=parseLocalDate(isoToday()),end=parseLocalDate(audit.end),active=today<=end;
    const avg=(field)=>entries.length?(entries.reduce((sum,x)=>sum+(Number(x[field])||0),0)/entries.length).toFixed(1):'—',yes=(field)=>entries.filter((x)=>x[field]==='yes').length;
    els.auditStatus.innerHTML=`<p><strong>${active?'Auditoría activa':'Auditoría terminada'}:</strong> ${formatDate(audit.start)} → ${formatDate(audit.end)} · ${entries.length}/5 check-ins.</p>${entries.length?`<div class="nutrition-kpis"><div><strong>${avg('hunger')}/5</strong><span>hambre media</span></div><div><strong>${avg('energy')}/5</strong><span>energía media</span></div><div><strong>${yes('protein')}/${entries.length}</strong><span>días proteína ≥2</span></div></div>`:''}`;
    els.startAudit.textContent=active?'REINICIAR AUDITORÍA':'EMPEZAR OTRA AUDITORÍA';els.auditForm.hidden=!active;if(active){els.auditDate.min=audit.start;els.auditDate.max=audit.end;if(!els.auditDate.value)els.auditDate.value=isoToday();}
    els.auditHistory.innerHTML=entries.length?entries.slice().reverse().map((x)=>`<li><div class="history-entry"><span>${formatDate(x.date)}</span><strong>Hambre ${x.hunger}/5 · energía ${x.energy}/5 · proteína ${x.protein==='yes'?'sí':x.protein==='no'?'no':'?'} · fruta/verdura ${x.produce==='yes'?'sí':x.produce==='no'?'no':'?'}</strong>${x.note?`<span>${String(x.note).replace(/[<>]/g,'')}</span>`:''}</div><button class="history-delete" type="button" data-audit-delete="${x.id}">BORRAR</button></li>`).join(''):'<li class="empty-state">Aún no hay check-ins en esta auditoría.</li>';
  }

  function renderNutrition(){
    if(!profile)return;els.nutritionModePill.textContent=nutritionModeLabel(profile.nutritionMode);const energy=estimateEnergy();
    if(profile.nutritionMode==='off'){els.energyEstimate.innerHTML='<p class="eyebrow">SEGUIMIENTO PAUSADO</p><h3>No tienes que registrar nada</h3><p>La alimentación queda fuera del seguimiento hasta que tú decidas activarla. El entrenamiento y las medidas siguen funcionando igual.</p>';els.nutritionGuidance.innerHTML='<strong>🍽️ Cero deberes</strong><p>Si algún día quieres una orientación o una auditoría puntual, cambia el modo desde PERFIL.</p>';renderAudit();return;}
    if(energy){const target=energy.target?`${energy.target[0]}–${energy.target[1]} kcal/día`:'Sin objetivo automático';els.energyEstimate.innerHTML=`<p class="eyebrow">ORIENTACIÓN INICIAL</p><h3>${target}</h3><p>Mantenimiento estimado: ${energy.maintenance[0]}–${energy.maintenance[1]} kcal · proteína orientativa: ${energy.protein[0]}–${energy.protein[1]} g/día.</p><div class="energy-grid"><div class="energy-box"><strong>${currentWeight()} kg</strong><span>peso usado ahora</span></div><div class="energy-box"><strong>${energy.bmr}</strong><span>metabolismo basal estimado</span></div></div><p class="tiny-note" style="color:inherit">${energy.note}</p>`;}
    else els.energyEstimate.innerHTML='<p class="eyebrow">SIN CONTEO</p><h3>No calculamos calorías</h3><p>Has elegido no usar una estimación energética. El módulo puede quedarse en auditorías puntuales de hambre, energía, proteína y fruta/verdura.</p>';
    els.nutritionGuidance.innerHTML=`<strong>🧭 ¿Lo estás haciendo bien?</strong><p>${nutritionTrendGuidance()}</p><small>La app no puede atribuir un cambio a la comida si no tiene datos suficientes. Si hace falta información, propone una auditoría en lugar de inventarse la causa.</small>`;renderAudit();
  }

  function mapLegacyActivity(value){return ({low:'seated',light:'breaks',moderate:'standing',high:'standing'})[value]||value||'seated';}
  function prefillOnboarding(){
    if(!profile)return;const f=els.profileForm.elements;
    const setRadio=(name,value)=>{const input=els.profileForm.querySelector(`input[name="${name}"][value="${value}"]`);if(input)input.checked=true;};
    ['sex','goal','bodyType','desiredLook','activity','experience','weeklyHours','timeframe','nutritionMode'].forEach((key)=>{let value=profile[key];if(key==='activity')value=mapLegacyActivity(value);if(value!==undefined&&value!==null)setRadio(key,String(value));});
    ['age','height','weight','waist','targetWeight','targetWaist','eventDate','energySafety'].forEach((key)=>{if(f[key])f[key].value=profile[key]??(key==='energySafety'?'none':'');});
    const eq=Array.isArray(profile.equipment)?profile.equipment:[];els.profileForm.querySelectorAll('input[name="equipment"]').forEach((box)=>{box.checked=eq.includes(box.value);});if(f.lowImpact)f.lowImpact.checked=profile.lowImpact!==false;
  }
  function setOnboardingStep(next){
    const steps=[...els.profileForm.querySelectorAll('[data-onboarding-step]')];onboardingStep=Math.max(0,Math.min(steps.length-1,next));
    steps.forEach((s,i)=>s.hidden=i!==onboardingStep);els.onboardingStepLabel.textContent=`${onboardingStep+1} / ${steps.length}`;els.onboardingProgressBar.style.width=`${((onboardingStep+1)/steps.length)*100}%`;
    els.onboardingBack.disabled=onboardingStep===0;els.onboardingNext.textContent=onboardingStep===steps.length-1?'VER MI PLAN':'SIGUIENTE';window.scrollTo({top:0,behavior:'smooth'});
  }
  function validateOnboardingStep(){const step=els.profileForm.querySelector(`[data-onboarding-step="${onboardingStep}"]`);if(!step)return true;const required=[...step.querySelectorAll('[required]')];for(const input of required){if(!input.checkValidity()){input.reportValidity();return false;}}return true;}
  function collectOnboardingDraft(){
    const fd=new FormData(els.profileForm),age=num(fd.get('age')),height=num(fd.get('height')),weight=num(fd.get('weight')),weeklyHours=num(fd.get('weeklyHours'))||2;
    if(!age||!height||!weight)return null;const schedule=deriveSchedule(weeklyHours);
    return {name:profile?.name||'',age,sex:String(fd.get('sex')||'skip'),height,weight,waist:num(fd.get('waist')),activity:String(fd.get('activity')||'seated'),experience:String(fd.get('experience')||'beginner'),bodyType:String(fd.get('bodyType')||'average'),desiredLook:String(fd.get('desiredLook')||'feel'),goal:String(fd.get('goal')||'tone'),timeframe:Number(fd.get('timeframe'))||6,targetWeight:num(fd.get('targetWeight')),targetWaist:num(fd.get('targetWaist')),eventDate:String(fd.get('eventDate')||''),weeklyHours,days:schedule.days,sessionMinutes:schedule.sessionMinutes,equipment:fd.getAll('equipment').map(String),lowImpact:fd.get('lowImpact')==='yes',nutritionMode:String(fd.get('nutritionMode')||'off'),energySafety:String(fd.get('energySafety')||'none'),createdAt:profile?.createdAt||isoToday(),goalStartedAt:isoToday(),activeAudit:profile?.activeAudit||null,onboardingVersion:ONBOARDING_VERSION};
  }
  function projectionFor(source){
    const w=num(source.weight),h=num(source.height),target=num(source.targetWeight);if(!w||!h||!target||target>=w||!['lose_fat','tone'].includes(source.goal))return null;
    const targetBmi=bmiFor(target,h);if(targetBmi<18.5)return {unsafe:true,targetBmi};
    const delta=w-target,fast=Math.max(.1,w*.005),slow=Math.max(.1,w*.0025),minWeeks=Math.ceil(delta/fast),maxWeeks=Math.ceil(delta/slow),a=new Date(),b=new Date();a.setDate(a.getDate()+minWeeks*7);b.setDate(b.getDate()+maxWeeks*7);return {unsafe:false,minWeeks,maxWeeks,from:a,to:b,targetBmi};
  }
  function formatMonthYear(d){return new Intl.DateTimeFormat('es-ES',{month:'short',year:'numeric'}).format(d);}
  function validateGoalRealism(source){
    const weight=num(source.weight),height=num(source.height),target=num(source.targetWeight),targetWaist=num(source.targetWaist),currentWaist=num(source.waist);
    if(!weight||!height)return {ok:true};
    if(targetWaist&&currentWaist&&['lose_fat','tone'].includes(source.goal)&&targetWaist>=currentWaist){
      return {ok:false,message:`Has puesto ${source.targetWaist} cm como cintura objetivo, pero partes de ${source.waist} cm. Si quieres reducir cintura, la meta tiene que ser menor; si no, déjala vacía.`};
    }
    if(!target)return {ok:true};
    if(source.goal==='lose_fat'&&target>=weight){
      return {ok:false,message:`No. Has puesto ${source.targetWeight} kg como objetivo, pero ahora indicas ${source.weight} kg y has elegido adelgazar. Esas dos cosas no cuadran. Corrige el peso objetivo o déjalo vacío.`};
    }
    if(source.goal==='strength'&&target<=weight){
      return {ok:false,message:`No me cuadra: has elegido ganar músculo y fuerza, pero tu peso objetivo (${source.targetWeight} kg) no está por encima de tu peso actual (${source.weight} kg). Cambia la cifra o déjala vacía y seguiremos rendimiento.`};
    }
    if(['lose_fat','tone'].includes(source.goal)&&target<weight){
      const targetBmi=bmiFor(target,height);
      if(targetBmi<18.5){
        const minWeight=Math.ceil((18.5*((height/100)**2))*10)/10;
        return {ok:false,message:`No. ${source.targetWeight} kg no entra como objetivo automático: para ${source.height} cm quedaría por debajo del cortafuegos de IMC 18,5. El mínimo de referencia sería ≈ ${minWeight} kg. Si tu intención es otra, esto ya no lo decide una app.`};
      }
      const weeks=Math.max(1,Number(source.timeframe||3)*4.345);
      const weeklyLoss=(weight-target)/weeks;
      const maxWeeklyLoss=weight*.01;
      if(weeklyLoss>maxWeeklyLoss){
        const minMonths=Math.ceil(((weight-target)/maxWeeklyLoss)/4.345);
        return {ok:false,message:`No. Para llegar ahí en ${source.timeframe} meses tendrías que perder ≈ ${weeklyLoss.toFixed(2)} kg/semana, más del 1 % de tu peso por semana. Eso se pasa de frenada. Amplía el plazo a unos ${Math.max(minMonths,1)} meses o cambia la meta.`};
      }
    }
    if(source.goal==='strength'&&target>weight){
      const weeks=Math.max(1,Number(source.timeframe||3)*4.345),weeklyGain=(target-weight)/weeks,maxWeeklyGain=weight*.005;
      if(weeklyGain>maxWeeklyGain){
        const minMonths=Math.ceil(((target-weight)/maxWeeklyGain)/4.345);
        return {ok:false,message:`No. Subir de ${source.weight} a ${source.targetWeight} kg en ${source.timeframe} meses exigiría ≈ ${weeklyGain.toFixed(2)} kg/semana. Para una meta de músculo eso va demasiado rápido para tratarlo como ganancia limpia. Amplía el plazo a unos ${Math.max(minMonths,1)} meses o deja el peso sin cifra y mide rendimiento.`};
      }
    }
    return {ok:true};
  }
  function renderOnboardingResult(){
    const draft=collectOnboardingDraft();if(!draft)return;
    const realism=validateGoalRealism(draft);
    if(!realism.ok){
      const targetInput=realism.message.includes('cintura')?els.profileForm.elements.targetWaist:els.profileForm.elements.targetWeight;
      if(targetInput){targetInput.setCustomValidity(realism.message);}
      setOnboardingStep(9);
      if(targetInput){targetInput.reportValidity();setTimeout(()=>targetInput.setCustomValidity(''),50);}
      els.onboardingLead.textContent='No. Esa meta se pasa de frenada. Cambia el peso o el plazo: no voy a convertir una mala idea en un plan con botones bonitos.';
      return;
    }
    onboardingDraft=draft;els.profileForm.hidden=true;els.onboardingNav.hidden=true;els.onboardingResult.hidden=false;els.onboardingStepLabel.textContent='TU PLAN';els.onboardingProgressBar.style.width='100%';els.onboardingLead.textContent='Vale. Con esto sí puedo trabajar. Sin gurús, sin fechas mágicas y sin hacer trampas con los números.';
    const bmi=bmiFor(draft.weight,draft.height),energy=estimateEnergy(draft),plan=buildWeeklyPlan(draft),projection=projectionFor(draft),horizon=new Date();horizon.setMonth(horizon.getMonth()+draft.timeframe);
    let projectionText=`Horizonte elegido: ${draft.timeframe} meses · hasta ${formatMonthYear(horizon)}. Primera revisión real en 4 semanas.`;
    if(projection?.unsafe)projectionText=`El peso objetivo indicado implicaría un IMC de ${projection.targetBmi.toFixed(1)}. No voy a convertirlo en una fecha ni en un déficit automático.`;
    else if(projection){
      const horizonWeeks=Math.max(1,Math.round(draft.timeframe*4.345));
      if(horizonWeeks<projection.minWeeks)projectionText=`Tu objetivo es ${draft.targetWeight} kg. El plazo de ${draft.timeframe} meses parece más rápido de lo que usaría como referencia prudente; un ritmo gradual apunta aproximadamente a ${projection.minWeeks}–${projection.maxWeeks} semanas (${formatMonthYear(projection.from)}–${formatMonthYear(projection.to)}).`;
      else if(horizonWeeks<=projection.maxWeeks)projectionText=`Tu objetivo es ${draft.targetWeight} kg. El horizonte de ${draft.timeframe} meses entra dentro de una referencia gradual aproximada de ${projection.minWeeks}–${projection.maxWeeks} semanas. No es una fecha garantizada.`;
      else projectionText=`Tu objetivo es ${draft.targetWeight} kg. No hace falta acelerar para llenar todo el plazo: una referencia gradual sería de ${projection.minWeeks}–${projection.maxWeeks} semanas (${formatMonthYear(projection.from)}–${formatMonthYear(projection.to)}).`;
    }
    const eventText=draft.eventDate?`<p class="result-event">📅 Tu fecha de referencia es ${formatDate(draft.eventDate)}. La tratamos como checkpoint, no como ultimátum.</p>`:'';
    const energyHtml=energy?`<div class="result-energy"><div><span>Metabolismo basal</span><strong>≈ ${energy.bmr} kcal</strong></div><div><span>Mantenimiento</span><strong>${energy.maintenance[0]}–${energy.maintenance[1]} kcal</strong></div><div><span>Objetivo inicial</span><strong>${energy.target?`${energy.target[0]}–${energy.target[1]} kcal`:'Sin objetivo automático'}</strong></div><div><span>Proteína orientativa</span><strong>${energy.protein[0]}–${energy.protein[1]} g</strong></div></div><p class="tiny-note">${energy.note}</p>`:'<p class="muted">Has elegido no usar una estimación energética automática. El entrenamiento y el seguimiento funcionan igual.</p>';
    const planHtml=plan.map((x,i)=>`<div class="plan-item"><span class="plan-index">${i+1}</span><div><strong>${x.mode==='bike'?'🚲':'🔥'} ${x.routine}</strong><span>${x.mode==='bike'?'Cardio guiado':'Fuerza guiada'}</span></div><em>·</em></div>`).join('');
    const targetY=projection&&!projection.unsafe?70:78;
    const draftObjective=objectiveSnapshot(draft), objectiveLine=objectiveSummary(draft);
    els.onboardingResultContent.innerHTML=`<section class="result-hero"><p class="eyebrow">TU PUNTO DE PARTIDA</p><h3>${goalLabel(draft.goal)}</h3><p>${desiredLookLabel(draft.desiredLook)} · ${draft.weeklyHours} h/semana disponibles</p></section>
      <section class="result-card objective-card"><p class="eyebrow">TU OBJETIVO</p><h3>${objectiveLine}</h3><div class="result-facts"><div><span>Resultado</span><strong>${draftObjective.primary?`${draftObjective.primary.target} ${draftObjective.primary.unit}`:'Sin cifra corporal fija'}</strong></div><div><span>Plazo</span><strong>${draft.timeframe} meses</strong></div><div><span>Proceso</span><strong>${draft.days} sesiones/semana</strong></div><div><span>Primera revisión</span><strong>4 semanas</strong></div></div><p class="tiny-note">La meta dice adónde vas. El proceso dice qué haces esta semana. Si los datos reales no acompañan, ajustamos el plan; no fingimos que una fecha manda sobre tu cuerpo.</p></section>
      <section class="result-card"><div class="bmi-title"><div><p class="eyebrow">REFERENCIA CORPORAL</p><h3>IMC ${bmi.toFixed(1)} · ${bmiLabel(bmi)}</h3></div></div><div class="bmi-meter"><span style="left:${Math.max(3,Math.min(97,((bmi-15)/25)*100))}%"></span></div><div class="bmi-scale"><small>Bajo</small><small>Saludable</small><small>Elevado</small><small>Alto</small></div><p class="tiny-note">El IMC es una referencia aproximada: no distingue músculo de grasa y no decide por sí solo tu objetivo.</p></section>
      <section class="result-card"><div class="result-facts"><div><span>Edad</span><strong>${draft.age}</strong></div><div><span>Peso</span><strong>${draft.weight} kg</strong></div><div><span>Altura</span><strong>${draft.height} cm</strong></div><div><span>Cintura</span><strong>${draft.waist?`${draft.waist} cm`:'—'}</strong></div><div><span>Punto de partida</span><strong>${bodyTypeLabel(draft.bodyType)}</strong></div><div><span>Vida diaria</span><strong>${activityLabel(draft.activity)}</strong></div><div><span>Experiencia</span><strong>${experienceLabel(draft.experience)}</strong></div><div><span>Tiempo</span><strong>${draft.weeklyHours} h/sem</strong></div><div><span>Peso objetivo</span><strong>${draft.targetWeight?`${draft.targetWeight} kg`:'—'}</strong></div><div><span>Cintura objetivo</span><strong>${draft.targetWaist?`${draft.targetWaist} cm`:'—'}</strong></div></div></section>
      <section class="result-card"><p class="eyebrow">ORIENTACIÓN ENERGÉTICA</p><h3>De dónde salen las calorías</h3>${energyHtml}</section>
      <section class="result-card"><p class="eyebrow">PLAN SEMANAL</p><h3>${draft.days} sesiones · en casa</h3><div class="plan-list">${planHtml}</div></section>
      <section class="result-card projection-card"><p class="eyebrow">HORIZONTE</p><h3>${projectionText}</h3><svg viewBox="0 0 320 120" role="img" aria-label="Curva orientativa de progreso"><path d="M18 28 C90 28 130 48 168 70 S250 ${targetY} 302 ${targetY}" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><circle cx="18" cy="28" r="6"/><circle cx="302" cy="${targetY}" r="7"/><text x="16" y="17">Ahora</text><text x="250" y="108">Horizonte</text></svg>${eventText}<p class="tiny-note">Ilustración orientativa. Los resultados reales dependen de adherencia, descanso, alimentación, salud y respuesta individual.</p></section>`;
    els.onboardingCancel.hidden=!onboardingEditing;
  }
  function openOnboarding(editing=false){onboardingEditing=editing;els.library.hidden=true;els.onboarding.hidden=false;els.profileForm.hidden=false;els.onboardingResult.hidden=true;els.onboardingNav.hidden=false;els.onboardingLead.textContent='No es un examen. Pero si aquí nos contamos películas, luego no protestes cuando el plan no cuadre.';els.profileForm.reset();if(profile)prefillOnboarding();setOnboardingStep(0);els.onboardingCancel.hidden=!editing;}
  function closeOnboarding(){if(onboardingRequired)return;els.onboarding.hidden=true;els.library.hidden=false;setSection(previousSection||'profile');}
  function saveOnboarding(){if(!onboardingDraft)return;const wasNew=!profile;profile={...onboardingDraft,updatedAt:new Date().toISOString()};saveProfile();onboardingRequired=false;if(wasNew&&progressData.measurements.length===0){progressData.measurements.push({id:uid(),date:isoToday(),weight:profile.weight,waist:profile.waist,hip:null,thigh:null,arm:null});saveProgress();}els.onboarding.hidden=true;els.library.hidden=false;els.mainTabs.hidden=false;setSection('today');renderProgress();}
  function renderProfile(){if(!profile)return;const e=estimateEnergy(),bmi=bmiFor(currentWeight(),profile.height),plan=buildWeeklyPlan(),objective=objectiveSnapshot();els.profileSummaryCard.innerHTML=`<p class="eyebrow">OBJETIVO ACTUAL</p><h3>${goalLabel(profile.goal)}</h3><p class="objective-big">🎯 ${objectiveSummary()}</p><p class="muted">Plazo: ${profile.timeframe} meses · ${profile.weeklyHours||'—'} h/semana · ${profile.days} sesiones · ${experienceLabel(profile.experience)}</p><div class="profile-summary-grid"><div><span>IMC orientativo</span><strong>${bmi?bmi.toFixed(1):'—'} ${bmi?`· ${bmiLabel(bmi)}`:''}</strong></div><div><span>Avance</span><strong>${objective?.primary?.progress!=null?`${Math.round(objective.primary.progress)} %`:'Se revisa en 4 semanas'}</strong></div><div><span>Mantenimiento</span><strong>${e?`${e.maintenance[0]}–${e.maintenance[1]} kcal`:'Sin cálculo'}</strong></div><div><span>Objetivo energético</span><strong>${e?.target?`${e.target[0]}–${e.target[1]} kcal`:'Sin objetivo automático'}</strong></div></div><div class="plan-list">${plan.map((x,i)=>`<div class="plan-item"><span class="plan-index">${i+1}</span><div><strong>${x.mode==='bike'?'🚲':'🔥'} ${x.routine}</strong></div><em>·</em></div>`).join('')}</div>`;}
  function setSection(nextSection){
    if(onboardingRequired){openOnboarding(false);return;}if(section!=='profile')previousSection=section;section=nextSection;
    const panels={today:els.todayPanel,training:els.trainingPanel,progress:els.progressPanel,nutrition:els.nutritionPanel,profile:els.profilePanel};Object.entries(panels).forEach(([key,panel])=>{if(panel)panel.hidden=key!==section;});
    [['today',els.todayTab],['training',els.trainingTab],['progress',els.progressTab],['nutrition',els.nutritionTab],['profile',els.profileTab]].forEach(([key,button])=>button?.classList.toggle('active',key===section));
    if(section==='today')renderToday();if(section==='training')renderLibrary();if(section==='progress')renderProgress();if(section==='nutrition')renderNutrition();if(section==='profile')renderProfile();
  }
  function startAudit(){
    if(!profile)return;if(profile.activeAudit&&parseLocalDate(profile.activeAudit.end)>=parseLocalDate(isoToday())){if(!window.confirm('¿Reiniciar la auditoría actual y empezar cinco días nuevos? Los check-ins anteriores no se borrarán.'))return;}
    const start=parseLocalDate(isoToday()),end=new Date(start);end.setDate(end.getDate()+4);profile.activeAudit={id:uid(),start:isoToday(start),end:isoToday(end)};saveProfile();els.auditDate.value=isoToday();renderNutrition();
  }
  function saveAuditCheckin(event){
    event.preventDefault();if(!profile?.activeAudit)return;const fd=new FormData(els.auditForm),date=String(fd.get('date')||isoToday());
    if(parseLocalDate(date)<parseLocalDate(profile.activeAudit.start)||parseLocalDate(date)>parseLocalDate(profile.activeAudit.end))return;
    const existing=progressData.nutrition.find((x)=>x.auditId===profile.activeAudit.id&&x.date===date);
    const entry={id:existing?.id||uid(),auditId:profile.activeAudit.id,date,hunger:Number(fd.get('hunger')),energy:Number(fd.get('energy')),protein:String(fd.get('protein')),produce:String(fd.get('produce')),note:String(fd.get('note')||'').trim()};
    if(existing)progressData.nutrition=progressData.nutrition.map((x)=>x.id===existing.id?entry:x);else progressData.nutrition.push(entry);
    saveProgress();els.auditForm.reset();els.auditDate.value=isoToday();renderNutrition();
  }
  function deleteAuditCheckin(id){if(!id||!progressData.nutrition.some((x)=>x.id===id))return;if(!window.confirm('¿Borrar este check-in de alimentación?'))return;progressData.nutrition=progressData.nutrition.filter((x)=>x.id!==id);saveProgress();renderNutrition();}
  function openRecommendedRoutine(){if(!currentRecommendation)return;mode=currentRecommendation.mode;const list=sets(),found=list.findIndex((r)=>r.name===currentRecommendation.routine);selectedIndex=found>=0?found:0;if(mode==='strength'){rounds=3;localStorage.setItem('hmb-rounds-v6','3');}els.strengthTab.classList.toggle('active',mode==='strength');els.bikeTab.classList.toggle('active',mode==='bike');setSection('training');}

  function strengthDurationSeconds(routine, count) {
    const n = routine.exercises.length;
    const workPerRound = routine.exercises.reduce((sum, exercise) => sum + Number(exercise?.[2]?.duration || routine.workDuration || 30), 0);
    const work = workPerRound * count;
    const betweenExercises = Math.max(0, n - 1) * Number(routine.changeDuration ?? 10) * count;
    const roundBreaks = Math.max(0, count - 1) * (routine.roundBreak || 30);
    return (routine.warmup || 60) + work + betweenExercises + roundBreaks;
  }

  function updateDuration() {
    if (mode !== 'strength') return;
    const total = strengthDurationSeconds(currentRoutine(), currentRoundCount());
    const min = Math.floor(total / 60);
    const sec = total % 60;
    els.duration.textContent = `≈ ${min}:${String(sec).padStart(2, '0')}`;
  }

  function renderLibrary() {
    els.list.innerHTML = '';
    sets().forEach((routine, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `routine-card${index === selectedIndex ? ' selected' : ''}`;
      button.setAttribute('aria-pressed', index === selectedIndex ? 'true' : 'false');
      const title = document.createElement('strong');
      const sub = document.createElement('span');
      title.textContent = routine.name;
      sub.textContent = routine.subtitle;
      button.append(title, sub);
      button.addEventListener('click', () => { selectedIndex = index; renderLibrary(); });
      els.list.appendChild(button);
    });

    const routine = currentRoutine();
    if (mode === 'strength') {
      const chips = routine.exercises.map(([name]) => `<span class="exercise-chip">${name}</span>`).join('');
      const visualCount = routine.exercises.filter(([name]) => hasVisual(name)).length;
      const visualNote = visualCount === routine.exercises.length
        ? '<p class="visual-ready">✨ Guía visual completa.</p>'
        : '';
      const activeRounds=currentRoundCount(routine);
      const timingText=routine.repBased
        ? `${activeRounds} vueltas · trabaja por repeticiones · ${routine.changeDuration||25} s de cambio máximo · ${routine.roundBreak||60} s entre vueltas · pulsa SALTAR cuando acabes antes.`
        : `30 s trabajo · 10 s cambio · ${routine.roundBreak}s entre rondas · ${routine.warmup}s de calentamiento.`;
      els.detail.innerHTML = `<strong>${routine.name}</strong><p>${timingText}</p><p class="material-line">🧰 ${routine.equipment}</p>${visualNote}<div class="exercise-preview">${chips}</div>`;
      els.roundPicker.hidden = Boolean(routine.fixedRounds);
      if (!routine.fixedRounds) updateRoundButtons();
      updateDuration();
      preloadRoutineVisuals(routine);
    } else {
      const total = routine.blocks.reduce((sum, block) => sum + block[0], 0);
      els.detail.innerHTML = `<strong>${routine.name}</strong><p>${Math.round(total / 60)} minutos guiados. La voz anuncia cada cambio de intensidad y la pantalla muestra lo que toca.</p>`;
      els.roundPicker.hidden = true;
    }
  }

  function updateRoundButtons() {
    document.querySelectorAll('[data-rounds]').forEach((button) => {
      button.classList.toggle('active', Number(button.dataset.rounds) === rounds);
    });
  }

  function setTrainingMode(nextMode) {
    mode = nextMode;
    selectedIndex = 0;
    els.strengthTab.classList.toggle('active', mode === 'strength');
    els.bikeTab.classList.toggle('active', mode === 'bike');
    renderLibrary();
  }

  function warmupSteps(routine) {
    const total = routine.warmup || 60;
    const a = Math.floor(total / 3);
    const b = Math.floor(total / 3);
    const c = total - a - b;
    return [
      { type: 'warmup', duration: a, name: 'Marcha + brazos', cue: `Activa el cuerpo. Ten preparado: ${routine.equipment}.` },
      { type: 'warmup', duration: b, name: 'Movilidad de hombros', cue: 'Círculos suaves; suelta cuello y hombros.' },
      { type: 'warmup', duration: c, name: 'Bisagra de cadera', cue: 'Sin peso. Cadera atrás y vuelve arriba.' }
    ];
  }

  function buildStrengthSequence(routine) {
    const steps = warmupSteps(routine);
    let ordinal = 0;
    const routineRounds = currentRoundCount(routine);
    const totalWork = routine.exercises.length * routineRounds;

    for (let round = 1; round <= routineRounds; round++) {
      routine.exercises.forEach(([name, cue, meta], exerciseIndex) => {
        ordinal += 1;
        const duration = Number(meta?.duration || routine.workDuration || 30);
        steps.push({ type: 'work', duration, name, cue, round, ordinal, totalWork, repBased: Boolean(routine.repBased) });
        if (exerciseIndex < routine.exercises.length - 1) {
          const nextName = routine.exercises[exerciseIndex + 1][0];
          steps.push({ type: 'rest', duration: Number(routine.changeDuration ?? 10), name: 'Cambio', cue: `Siguiente: ${nextName}`, nextName, round });
        }
      });
      if (round < routineRounds) {
        const nextName = routine.exercises[0][0];
        steps.push({ type: 'roundRest', duration: routine.roundBreak || 30, name: 'Entre rondas', cue: `Ronda ${round} hecha. Bebe, recolócate y recupera.`, nextName, round });
      }
    }
    return steps;
  }

  function buildBikeSequence(routine) {
    return routine.blocks.map(([duration, intensity, cue], index) => ({
      type: 'bike', duration, name: intensity, cue, block: index + 1, totalBlocks: routine.blocks.length
    }));
  }

  function buildTimeline() {
    let cursor = 0;
    timeline = sequence.map((step) => {
      const startMs = cursor;
      cursor += step.duration * 1000;
      return { startMs, endMs: cursor };
    });
  }

  function stopTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function ensureAudio() {
    try {
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
    } catch (_) {}
  }

  function beep(frequency = 900, duration = 0.09, volume = 0.12) {
    try {
      ensureAudio();
      if (!audioContext) return;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (_) {}
  }

  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    selectedVoice = voices.find((v) => /^es[-_]/i.test(v.lang) && /Google|Microsoft/i.test(v.name))
      || voices.find((v) => /^es[-_]/i.test(v.lang)) || null;
  }

  function speak(text, { interrupt = false, rate = 1 } = {}) {
    if (!('speechSynthesis' in window)) return false;
    try {
      pickVoice();
      if (interrupt) window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = rate;
      utterance.volume = 1;
      if (selectedVoice) utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (_) { return false; }
  }

  function announceCountdown(second) {
    if (lastAnnouncedSecond === second) return;
    lastAnnouncedSecond = second;
    beep(second === 1 ? 980 : 760, 0.08, 0.1);
    speak(String(second), { interrupt: true, rate: 1.08 });
  }

  function announceStep(step) {
    lastAnnouncedSecond = null;
    if (step.type === 'warmup') {
      speak(`${step.name}. ${step.cue}`, { interrupt: true, rate: 0.96 });
    } else if (step.type === 'work' && step.repBased) {
      speak(`${step.name}. ${step.cue}`, { interrupt: true, rate: 0.96 });
    } else if (step.type === 'rest') {
      speak(`Cambio. Siguiente: ${step.nextName}.`, { interrupt: true, rate: 0.98 });
    } else if (step.type === 'roundRest') {
      speak(`${step.cue} Siguiente ronda empieza con ${step.nextName}.`, { interrupt: true, rate: 0.96 });
    } else if (step.type === 'bike') {
      speak(`${step.name}. ${step.cue}`, { interrupt: true, rate: 0.96 });
    }
  }

  function imageForExercise(name) {
    const key = IMAGE_KEY[name];
    return key ? EXERCISE_IMAGES[key] : null;
  }
  function hasVisual(name) { return Boolean(imageForExercise(name)); }
  function visualSources(name) { const src = imageForExercise(name); return src ? [src] : []; }
  function visualExerciseName(step) {
    if (step.type === 'rest' || step.type === 'roundRest') return step.nextName;
    if (step.type === 'work') return step.name;
    return null;
  }

  function renderVisual(step) {
    const visualName = visualExerciseName(step);
    const sources = visualName ? visualSources(visualName) : [];
    if (sources.length === 1) {
      els.visual.classList.add('has-image');
      els.visual.innerHTML = `<img src="${sources[0]}" alt="Demostración de ${visualName}" draggable="false">`;
      return;
    }
    els.visual.classList.remove('has-image');
    els.visual.innerHTML = '';
    els.visual.textContent = step.type === 'work' ? '🔥' : step.type === 'rest' ? '💨' : step.type === 'roundRest' ? '🥤' : step.type === 'bike' ? '🚲' : '⚡';
  }

  function preloadExerciseVisual(name) {
    visualSources(name).forEach((src) => { const img = new Image(); img.src = src; });
  }
  function preloadRoutineVisuals(routine) {
    if (!routine || !routine.exercises) return;
    routine.exercises.forEach(([name]) => preloadExerciseVisual(name));
  }

  function nextDescription() {
    const next = sequence[stepIndex + 1];
    if (!next) return 'Último bloque';
    if (next.type === 'work') return `Después: ${next.name}`;
    if (next.type === 'rest' || next.type === 'roundRest') return next.cue;
    if (next.type === 'bike') return `Después: ${next.name}`;
    if (next.type === 'warmup') return `Después: ${next.name}`;
    return '';
  }

  function renderStepUI({ announce = true, transition = false } = {}) {
    if (stepIndex < 0 || stepIndex >= sequence.length) return;
    const step = sequence[stepIndex];
    if (transition) beep(step.type === 'work' ? 1120 : 980, 0.15, 0.14);

    els.playerRoutine.textContent = currentRoutine().name;
    els.stage.dataset.phase = step.type;
    els.phase.textContent = step.type === 'work' ? (step.repBased ? 'REPETICIONES' : 'TRABAJO') : step.type === 'rest' ? 'CAMBIO' : step.type === 'roundRest' ? 'ENTRE RONDAS' : step.type === 'bike' ? 'BICI' : 'CALENTAMIENTO';
    els.exercise.textContent = (step.type === 'rest' || step.type === 'roundRest') ? step.nextName : step.name;
    renderVisual(step);
    els.coach.textContent = step.type === 'work' ? (step.repBased ? step.cue : `${step.cue} · A TOPE.`) : step.cue;
    els.next.textContent = nextDescription();

    if (step.type === 'work') {
      els.playerRound.textContent = `Ronda ${step.round} de ${currentRoundCount()}`;
      els.progressText.textContent = `${step.ordinal} / ${step.totalWork}`;
      els.progress.style.width = `${((step.ordinal - 1) / step.totalWork) * 100}%`;
    } else if (step.type === 'bike') {
      els.playerRound.textContent = `Bloque ${step.block} de ${step.totalBlocks}`;
      els.progressText.textContent = `${step.block} / ${step.totalBlocks}`;
      els.progress.style.width = `${((step.block - 1) / step.totalBlocks) * 100}%`;
    } else if (step.type === 'warmup') {
      els.playerRound.textContent = 'Calentamiento';
      els.progressText.textContent = '';
    } else {
      els.playerRound.textContent = step.type === 'roundRest' ? 'Recupera' : `Ronda ${step.round}`;
      if (step.type === 'roundRest') els.progressText.textContent = `Ronda ${step.round} / ${currentRoundCount()}`;
    }
    if (announce) announceStep(step);
  }

  function activeElapsedMs(now = Date.now()) {
    const clockNow = paused ? pauseStartedAt : now;
    return Math.max(0, clockNow - workoutStartedAt - pausedTotalMs + skipOffsetMs);
  }
  function locateStep(elapsedMs) {
    for (let i = 0; i < timeline.length; i++) if (elapsedMs < timeline[i].endMs) return i;
    return -1;
  }

  function syncPlayback({ announceTransition = true } = {}) {
    if (workoutFinished || !sequence.length) return;
    const elapsed = activeElapsedMs();
    const located = locateStep(elapsed);
    if (located === -1) { finishWorkout(); return; }

    if (located !== stepIndex) {
      const hadStep = stepIndex >= 0;
      stepIndex = located;
      lastAnnouncedSecond = null;
      renderStepUI({ announce: announceTransition && document.visibilityState === 'visible', transition: hadStep && document.visibilityState === 'visible' });
    }

    const remainingMs = Math.max(0, timeline[stepIndex].endMs - elapsed);
    const remainingSeconds = Math.ceil(remainingMs / 1000);
    els.timer.textContent = formatTime(remainingSeconds);
    const step = sequence[stepIndex];
    if (!paused && document.visibilityState === 'visible') {
      if ((step.type === 'warmup' || step.type === 'rest' || step.type === 'roundRest') && remainingSeconds >= 1 && remainingSeconds <= 3) announceCountdown(remainingSeconds);
      if (step.type === 'bike' && remainingSeconds >= 1 && remainingSeconds <= 3 && lastAnnouncedSecond !== remainingSeconds) {
        lastAnnouncedSecond = remainingSeconds;
        beep(remainingSeconds === 1 ? 980 : 700, 0.06, 0.08);
      }
    }
  }

  async function requestWakeLock() {
    try { if ('wakeLock' in navigator && (!wakeLock || wakeLock.released)) wakeLock = await navigator.wakeLock.request('screen'); } catch (_) {}
  }
  function releaseWakeLock() {
    if (wakeLock) { wakeLock.release().catch(() => {}); wakeLock = null; }
  }

  function startWorkout() {
    ensureAudio();
    if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); window.speechSynthesis.resume(); }
    requestWakeLock();
    sequence = mode === 'strength' ? buildStrengthSequence(currentRoutine()) : buildBikeSequence(currentRoutine());
    buildTimeline();
    stepIndex = -1;
    workoutStartedAt = Date.now();
    pauseStartedAt = 0; pausedTotalMs = 0; skipOffsetMs = 0; paused = false; workoutFinished = false; lastAnnouncedSecond = null; lastWorkoutId = null;
    pendingWorkoutEntry = null; pendingWorkoutEffort = null;
    els.library.hidden = true; els.complete.hidden = true; els.player.hidden = false; els.pause.textContent = 'PAUSA'; els.progress.style.width = '0%';
    saveActiveWorkout();
    syncPlayback({ announceTransition: true });
    timerId = setInterval(() => syncPlayback({ announceTransition: true }), 250);
  }

  function buildPendingWorkoutEntry() {
    const wallActiveMs = Math.max(0, Date.now() - workoutStartedAt - pausedTotalMs - (paused && pauseStartedAt ? Date.now() - pauseStartedAt : 0));
    const plannedActiveMs = timeline.length ? Math.max(0, timeline[timeline.length - 1].endMs - skipOffsetMs) : wallActiveMs;
    const realActiveMs = Math.min(wallActiveMs, plannedActiveMs);
    const actualMinutes = Math.max(1, Math.round(realActiveMs / 60000));
    return {
      id: uid(), date: isoToday(), timestamp: new Date().toISOString(), mode,
      routine: currentRoutine().name, rounds: mode === 'strength' ? currentRoundCount() : null,
      minutes: actualMinutes, effort: pendingWorkoutEffort
    };
  }

  function showCompletionScreen({ announce = true } = {}) {
    if (announce) {
      beep(1250, 0.18, 0.14); setTimeout(() => beep(1450, 0.2, 0.14), 190);
      speak('Entrenamiento terminado. Confirma si de verdad cuenta.', { interrupt: true, rate: 0.95 });
    }
    els.library.hidden = true;
    els.player.hidden = true; els.complete.hidden = false;
    els.completeTitle.textContent = '¿Lo damos por hecho?';
    const completedRounds=currentRoundCount();
    els.completeSummary.textContent = `Has llegado al final: ${currentRoutine().name}${mode === 'strength' ? ` · ${completedRounds} ronda${completedRounds === 1 ? '' : 's'}` : ''}. Si lo has hecho, guárdalo. Si estabas trasteando, no nos hagamos trampas al solitario.`;
    els.effortPicker.hidden = false;
    els.confirmWorkout.hidden = false;
    els.discardWorkout.hidden = false;
    els.back.hidden = true;
    els.effortPicker.querySelectorAll('[data-effort]').forEach((b) => b.classList.toggle('active', Number(b.dataset.effort) === pendingWorkoutEffort));
  }

  function finishWorkout({ announce = true } = {}) {
    if (workoutFinished) return;
    workoutFinished = true;
    stopTimer(); releaseWakeLock(); els.progress.style.width = '100%';
    pendingWorkoutEffort = null;
    pendingWorkoutEntry = buildPendingWorkoutEntry();
    showCompletionScreen({ announce });
    saveActiveWorkout();
  }

  function confirmCompletedWorkout() {
    if (!pendingWorkoutEntry) return;
    pendingWorkoutEntry = withEffortMetadata({ ...pendingWorkoutEntry, effort: pendingWorkoutEffort });
    progressData.workouts.push(pendingWorkoutEntry);
    saveProgress();
    lastWorkoutId = pendingWorkoutEntry.id;
    pendingWorkoutEntry = null;
    clearActiveWorkout();
    els.completeTitle.textContent = 'Guardado.';
    els.completeSummary.textContent = 'Hecho. Sin confeti. Cuenta porque lo has hecho, no porque hayas abierto la rutina.';
    els.effortPicker.hidden = true;
    els.confirmWorkout.hidden = true;
    els.discardWorkout.hidden = true;
    els.back.hidden = false;
    renderProgress();
    if (profile) { renderToday(); renderNutrition(); }
  }

  function discardCompletedWorkout() {
    pendingWorkoutEntry = null;
    pendingWorkoutEffort = null;
    lastWorkoutId = null;
    clearActiveWorkout();
    els.complete.hidden = true;
    els.effortPicker.hidden = true;
    els.confirmWorkout.hidden = true;
    els.discardWorkout.hidden = true;
    els.back.hidden = false;
    els.library.hidden = false;
    if (pendingReload) window.location.reload();
  }

  function quitWorkout() {
    stopTimer(); releaseWakeLock(); workoutFinished = true;
    pendingWorkoutEntry = null; pendingWorkoutEffort = null;
    clearActiveWorkout();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    els.player.hidden = true; els.complete.hidden = true; els.library.hidden = false;
    if (pendingReload) window.location.reload();
  }

  function togglePause() {
    if (!paused) {
      paused = true; pauseStartedAt = Date.now(); els.pause.textContent = 'SEGUIR';
      saveActiveWorkout();
      if ('speechSynthesis' in window) window.speechSynthesis.pause(); return;
    }
    pausedTotalMs += Date.now() - pauseStartedAt; pauseStartedAt = 0; paused = false; els.pause.textContent = 'PAUSA';
    saveActiveWorkout();
    if ('speechSynthesis' in window) window.speechSynthesis.resume();
    requestWakeLock(); syncPlayback({ announceTransition: false });
  }

  function skipStep() {
    if (workoutFinished || stepIndex < 0) return;
    const elapsed = activeElapsedMs();
    const remaining = Math.max(0, timeline[stepIndex].endMs - elapsed);
    skipOffsetMs += remaining + 1;
    saveActiveWorkout();
    beep(1050, 0.1, 0.1); syncPlayback({ announceTransition: true });
  }

  function restoreActiveWorkout() {
    const saved = readActiveWorkout();
    if (!saved) return false;

    mode = saved.mode;
    const list = mode === 'strength' ? STRENGTH : BIKE;
    let restoredIndex = list.findIndex((routine) => routine.name === saved.routine);
    if (restoredIndex < 0 && saved.selectedIndex != null && Number.isInteger(Number(saved.selectedIndex))) {
      const candidate = Number(saved.selectedIndex);
      if (candidate >= 0 && candidate < list.length) restoredIndex = candidate;
    }
    if (restoredIndex < 0) { clearActiveWorkout(); return false; }
    selectedIndex = restoredIndex;

    if (mode === 'strength') {
      const restoredRounds = Number(saved.rounds);
      rounds = [1, 2, 3].includes(restoredRounds) ? restoredRounds : 3;
      localStorage.setItem('hmb-rounds-v6', String(rounds));
    }
    els.strengthTab.classList.toggle('active', mode === 'strength');
    els.bikeTab.classList.toggle('active', mode === 'bike');

    sequence = mode === 'strength' ? buildStrengthSequence(currentRoutine()) : buildBikeSequence(currentRoutine());
    buildTimeline();
    workoutStartedAt = Number(saved.workoutStartedAt);
    pausedTotalMs = Math.max(0, Number(saved.pausedTotalMs) || 0);
    skipOffsetMs = Math.max(0, Number(saved.skipOffsetMs) || 0);
    paused = Boolean(saved.paused);
    pauseStartedAt = paused ? Number(saved.pauseStartedAt) || Number(saved.savedAt) || Date.now() : 0;
    stepIndex = -1;
    lastAnnouncedSecond = null;
    lastWorkoutId = null;
    pendingReload = false;
    const restoredEffort = Number(saved.pendingWorkoutEffort);
    pendingWorkoutEffort = saved.pendingWorkoutEffort != null
      && Number.isInteger(restoredEffort) && restoredEffort >= 1 && restoredEffort <= EFFORT_SCALE_MAX
      ? restoredEffort : null;
    pendingWorkoutEntry = saved.pendingWorkoutEntry && typeof saved.pendingWorkoutEntry === 'object' ? saved.pendingWorkoutEntry : null;

    if (saved.phase === 'complete') {
      workoutFinished = true;
      if (!pendingWorkoutEntry) { clearActiveWorkout(); return false; }
      stopTimer(); releaseWakeLock();
      showCompletionScreen({ announce: false });
      return true;
    }

    workoutFinished = false;
    pendingWorkoutEntry = null;
    pendingWorkoutEffort = null;
    els.library.hidden = true; els.complete.hidden = true; els.player.hidden = false;
    els.pause.textContent = paused ? 'SEGUIR' : 'PAUSA';
    els.progress.style.width = '0%';
    stopTimer();
    syncPlayback({ announceTransition: false });
    if (!workoutFinished) {
      timerId = setInterval(() => syncPlayback({ announceTransition: true }), 250);
      if (!paused && document.visibilityState === 'visible') requestWakeLock();
    }
    return true;
  }

  function isFirstFriday(date) {
    return date.getDay() === 5 && date.getDate() <= 7;
  }

  function nextWeekday(from, weekday) {
    const d = new Date(from); d.setHours(12,0,0,0);
    const delta = (weekday - d.getDay() + 7) % 7;
    d.setDate(d.getDate() + delta);
    return d;
  }

  function nextFirstFriday(from) {
    const d = new Date(from.getFullYear(), from.getMonth(), 1, 12);
    let delta = (5 - d.getDay() + 7) % 7;
    d.setDate(1 + delta);
    if (d < from) {
      const next = new Date(from.getFullYear(), from.getMonth() + 1, 1, 12);
      delta = (5 - next.getDay() + 7) % 7;
      next.setDate(1 + delta);
      return next;
    }
    return d;
  }

  function measurementSchedule() {
    const now = new Date();
    const day = now.getDay();
    const due = [];
    if ([1,3,5].includes(day)) due.push('peso');
    if (day === 5) due.push('cintura');
    if (isFirstFriday(now)) due.push('cadera', 'muslo', 'brazo');

    const candidates = [nextWeekday(now, 1), nextWeekday(now, 3), nextWeekday(now, 5)];
    candidates.forEach((d) => { if (d.toDateString() === now.toDateString()) d.setDate(d.getDate() + 7); });
    candidates.sort((a,b) => a-b);
    return { due, nextWeight: candidates[0], nextFull: nextFirstFriday(new Date(now.getTime() + 86400000)) };
  }

  function sumMinutes(items, modeName) {
    return items.filter((x) => !modeName || x.mode === modeName).reduce((s, x) => s + (Number(x.minutes) || 0), 0);
  }

  function daysAgo(n) { const d = new Date(); d.setHours(12,0,0,0); d.setDate(d.getDate()-n); return d; }
  function inRange(dateValue, start, end = new Date()) {
    const d = parseLocalDate(dateValue); return d >= start && d <= end;
  }

  function renderProgressSummary() {
    const start = new Date(); start.setHours(0,0,0,0); start.setDate(start.getDate() - ((start.getDay()+6)%7));
    const week = progressData.workouts.filter((x) => parseLocalDate(x.date) >= start);
    const days = new Set(week.map((x) => x.date)).size;
    const strength = sumMinutes(week, 'strength');
    const bike = sumMinutes(week, 'bike');
    els.progressSummary.innerHTML = `
      <div class="stat-card"><strong>${days}</strong><span>días esta semana</span></div>
      <div class="stat-card"><strong>${strength}</strong><span>min fuerza</span></div>
      <div class="stat-card"><strong>${bike}</strong><span>min bici</span></div>`;
  }

  function renderMeasurementDue() {
    const s = measurementSchedule();
    if (s.due.length) {
      els.measurementDue.innerHTML = `<strong>📏 Hoy toca medir</strong><p>${s.due.join(' · ')}.</p><small>Dos minutos y fuera. Por la mañana, después de ir al baño y antes de desayunar.</small>`;
    } else {
      els.measurementDue.innerHTML = `<strong>📏 Próxima medición</strong><p>Peso: ${new Intl.DateTimeFormat('es-ES',{weekday:'long',day:'numeric',month:'short'}).format(s.nextWeight)}.</p><small>Cadera, muslo y brazo: primer viernes del mes.</small>`;
    }
  }

  function metricSeries(metric) {
    if (metric === 'pushups') {
      return progressData.marks.filter((x) => num(x.pushups) !== null).map((x) => ({ date: x.date, value: num(x.pushups) })).sort((a,b)=>a.date.localeCompare(b.date));
    }
    return progressData.measurements.filter((x) => num(x[metric]) !== null).map((x) => ({ date: x.date, value: num(x[metric]) })).sort((a,b)=>a.date.localeCompare(b.date));
  }

  function renderChart() {
    const metric = els.chartMetric.value;
    const labels = { weight:'Peso (kg)', waist:'Cintura (cm)', hip:'Cadera (cm)', thigh:'Muslo (cm)', arm:'Brazo (cm)', pushups:'Flexiones máximas' };
    let series = metricSeries(metric);
    const range = els.chartRange.value;
    if (range !== 'all') {
      const cutoff = daysAgo(range === '3m' ? 90 : 365);
      series = series.filter((p) => parseLocalDate(p.date) >= cutoff);
    }
    if (series.length > 80) {
      const step = (series.length - 1) / 79;
      series = Array.from({length: 80}, (_, i) => series[Math.round(i * step)]);
    }
    if (series.length < 2) {
      els.chart.innerHTML = `<div class="empty-state">Con un dato no hay tendencia, hay un dato. Añade al menos otro registro de ${labels[metric].toLowerCase()} y entonces hablamos.</div>`;
      return;
    }
    const values = series.map((p) => p.value);
    let min = Math.min(...values), max = Math.max(...values);
    if (min === max) { min -= 1; max += 1; }
    const pad = (max-min)*0.12 || 1; min -= pad; max += pad;
    const W=620,H=220,L=44,R=14,T=18,B=34;
    const x = (i) => L + (series.length===1?0:(i/(series.length-1))*(W-L-R));
    const y = (v) => T + ((max-v)/(max-min))*(H-T-B);
    const points = series.map((p,i)=>`${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
    const circles = series.map((p,i)=>`<circle cx="${x(i)}" cy="${y(p.value)}" r="4"><title>${formatDate(p.date)}: ${p.value}</title></circle>`).join('');
    const first = series[0], last = series[series.length-1];
    els.chart.innerHTML = `<div class="chart-head"><strong>${labels[metric]}</strong><span>${first.value} → ${last.value}</span></div>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfico de ${labels[metric]}">
        <line x1="${L}" y1="${T}" x2="${L}" y2="${H-B}" class="axis"/><line x1="${L}" y1="${H-B}" x2="${W-R}" y2="${H-B}" class="axis"/>
        <text x="4" y="${T+5}" class="chart-label">${max.toFixed(1)}</text><text x="4" y="${H-B}" class="chart-label">${min.toFixed(1)}</text>
        <polyline points="${points}" class="chart-line"/>${circles}
        <text x="${L}" y="${H-8}" class="chart-label">${series[0].date.slice(5)}</text><text x="${W-R}" y="${H-8}" text-anchor="end" class="chart-label">${series.at(-1).date.slice(5)}</text>
      </svg>`;
  }

  function weeklyBuckets() {
    const out = [];
    const today = new Date(); today.setHours(0,0,0,0);
    const monday = new Date(today); monday.setDate(today.getDate()-((today.getDay()+6)%7));
    for (let i=7;i>=0;i--) {
      const start = new Date(monday); start.setDate(monday.getDate()-i*7);
      const end = new Date(start); end.setDate(start.getDate()+7);
      const rows = progressData.workouts.filter((w)=>{const d=parseLocalDate(w.date); return d>=start && d<end;});
      out.push({ label:`${start.getDate()}/${start.getMonth()+1}`, strength:sumMinutes(rows,'strength'), bike:sumMinutes(rows,'bike') });
    }
    return out;
  }

  function renderWeeklyTraining() {
    const rows = weeklyBuckets();
    const max = Math.max(1, ...rows.map((r)=>r.strength+r.bike));
    els.weeklyTraining.innerHTML = rows.map((r)=>{
      const total=r.strength+r.bike;
      return `<div class="week-row"><span>${r.label}</span><div class="week-track"><i class="strength-bar" style="width:${(r.strength/max)*100}%"></i><i class="bike-bar" style="width:${(r.bike/max)*100}%"></i></div><strong>${total}m</strong></div>`;
    }).join('');
  }

  function recentAverage(metric, startDays, endDays) {
    const start = daysAgo(startDays), end = daysAgo(endDays);
    const vals = progressData.measurements.filter((x)=>{const d=parseLocalDate(x.date); return d>=start && d<end && num(x[metric])!==null;}).map((x)=>num(x[metric]));
    return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : null;
  }

  function effortAverage(modeName, startDays, endDays) {
    const start=daysAgo(startDays), end=daysAgo(endDays);
    const vals=progressData.workouts.filter((x)=>x.mode===modeName && x.effort && parseLocalDate(x.date)>=start && parseLocalDate(x.date)<end).map((x)=>Number(x.effort));
    return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : null;
  }

  function renderGoals() {
    const current28=progressData.workouts.filter((x)=>inRange(x.date,daysAgo(27)));
    const targetSessions=profile?Math.max(1,(Number(profile.days)||4)*4):16;
    const strengthSessions=current28.filter((x)=>x.mode==='strength').length;
    const strengthMinutes=sumMinutes(current28,'strength'),bikeMinutes=sumMinutes(current28,'bike'),bikeRpe=effortAverage('bike',28,0);
    const waistNow=recentAverage('waist',28,0),waistPrev=recentAverage('waist',56,28),push=metricSeries('pushups'),objective=objectiveSnapshot();
    const pushText=push.length>=2?`${push.at(-2).value} → ${push.at(-1).value}`:push.length?`${push.at(-1).value} · creando referencia`:'sin marca';
    if(els.progressGoalTitle)els.progressGoalTitle.textContent=profile?`${goalLabel(profile.goal)} · ${objectiveSummary()}`:'Creando referencia';
    const waistText=waistNow===null?'sin datos todavía':waistPrev===null?`${waistNow.toFixed(1)} cm · referencia inicial`:`${(waistNow-waistPrev)>=0?'+':''}${(waistNow-waistPrev).toFixed(1)} cm vs. 4 semanas previas`;
    const targetLine=objective?.primary?`${objective.primary.now??'—'} → ${objective.primary.target} ${objective.primary.unit} · ${Math.round(objective.primary.progress||0)} % del camino`:'Sin cifra corporal fija: aquí mandan tendencia, rendimiento y constancia.';
    const deadline=objective?.horizon?new Intl.DateTimeFormat('es-ES',{month:'long',year:'numeric'}).format(objective.horizon):'—';
    els.goals.innerHTML=`<div><span>🎯 Meta</span><strong>${targetLine}</strong></div><div><span>⏳ Plazo</span><strong>${deadline} · revisión cada 4 semanas</strong></div><div><span>📅 Proceso</span><strong>${current28.length}/${targetSessions} sesiones previstas en 4 semanas</strong></div><div><span>💪 Fuerza</span><strong>${strengthSessions} sesiones · ${strengthMinutes} min · flexiones ${pushText}</strong></div><div><span>🚲 Bici</span><strong>${bikeMinutes} min${bikeRpe!==null?` · esfuerzo medio ${bikeRpe.toFixed(1)}/5`:''}</strong></div><div><span>📏 Cintura</span><strong>${objective?.targetWaist?`${objective.nowWaist??'—'} → ${objective.targetWaist} cm`:`${waistText}`}</strong></div>`;
  }


  function monthKey(dateValue) {
    return String(dateValue).slice(0, 7);
  }

  function monthLabel(key) {
    const [y,m]=key.split('-').map(Number);
    return new Intl.DateTimeFormat('es-ES',{month:'short',year:'2-digit'}).format(new Date(y,m-1,1,12));
  }

  function renderMonthlySummary() {
    const keys=new Set();
    progressData.measurements.forEach((x)=>keys.add(monthKey(x.date)));
    progressData.workouts.forEach((x)=>keys.add(monthKey(x.date)));
    const months=[...keys].filter(Boolean).sort().reverse().slice(0,12);
    if(!months.length){
      els.monthlySummary.innerHTML='<div class="empty-state">Cuando tengas registros, aquí aparecerá el resumen de cada mes.</div>';
      return;
    }
    const rows=months.map((key)=>{
      const measurements=progressData.measurements.filter((x)=>monthKey(x.date)===key);
      const workouts=progressData.workouts.filter((x)=>monthKey(x.date)===key);
      const avg=(field)=>{const vals=measurements.map((x)=>num(x[field])).filter((v)=>v!==null);return vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1):'—';};
      return `<tr><th>${monthLabel(key)}</th><td>${avg('weight')}</td><td>${avg('waist')}</td><td>${sumMinutes(workouts,'strength')}</td><td>${sumMinutes(workouts,'bike')}</td></tr>`;
    }).join('');
    els.monthlySummary.innerHTML=`<div class="table-scroll"><table class="month-table"><thead><tr><th>Mes</th><th>Peso</th><th>Cintura</th><th>Fuerza</th><th>Bici</th></tr></thead><tbody>${rows}</tbody></table></div><p class="tiny-note">Peso y cintura = media del mes · fuerza y bici = minutos totales.</p>`;
  }

  function renderRecentHistory() {
    const items = [
      ...progressData.workouts.map((x)=>({id:x.id, date:x.date, kind:'workout', text:`${x.mode==='bike'?'🚲':'🔥'} ${x.routine} · ${x.minutes} min${x.effort?` · esfuerzo ${x.effort}/5`:''}`})),
      ...progressData.measurements.map((x)=>({id:x.id, date:x.date, kind:'measure', text:`📏 Medidas${x.weight?` · ${x.weight} kg`:''}${x.waist?` · cintura ${x.waist} cm`:''}`})),
      ...progressData.marks.map((x)=>({id:x.id, date:x.date, kind:'mark', text:`🏅 Flexiones máximas: ${x.pushups}`}))
    ].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,30);
    els.recentHistory.innerHTML = items.length ? items.map((x)=>`<li><div class="history-entry"><span>${formatDate(x.date)}</span><strong>${x.text}</strong></div><button class="history-delete" type="button" data-delete-kind="${x.kind}" data-delete-id="${x.id}" aria-label="Borrar registro del ${formatDate(x.date)}">BORRAR</button></li>`).join('') : '<li class="empty-state">Todavía no hay historial. Solo se guardarán los entrenamientos que confirmes al terminar.</li>';
  }

  function deleteHistoryRecord(kind, id) {
    const buckets = { workout: 'workouts', measure: 'measurements', mark: 'marks' };
    const bucket = buckets[kind];
    if (!bucket || !id) return;
    const exists = progressData[bucket].some((x)=>x.id===id);
    if (!exists) return;
    if (!window.confirm('¿Borrar este registro? Esta acción no se puede deshacer.')) return;
    progressData[bucket] = progressData[bucket].filter((x)=>x.id!==id);
    if (lastWorkoutId === id) lastWorkoutId = null;
    saveProgress();
    renderProgress();
    if (profile) { renderToday(); renderNutrition(); }
    flash('Registro borrado.');
  }

  function renderProgress() {
    if (!els.measurementDate.value) els.measurementDate.value = isoToday();
    if (!els.markDate.value) els.markDate.value = isoToday();
    renderProgressSummary(); renderMeasurementDue(); renderChart(); renderWeeklyTraining(); renderGoals(); renderMonthlySummary(); renderRecentHistory();
  }

  function flash(message) {
    els.progressMessage.textContent = message;
    els.progressMessage.hidden = false;
    clearTimeout(flash.timer); flash.timer=setTimeout(()=>{els.progressMessage.hidden=true;},2600);
  }

  function saveMeasurement(event) {
    event.preventDefault();
    const fd = new FormData(els.measurementForm);
    const entry = { id:uid(), date:fd.get('date') || isoToday() };
    ['weight','waist','hip','thigh','arm'].forEach((key)=>{ const v=num(fd.get(key)); if(v!==null) entry[key]=v; });
    if (Object.keys(entry).length <= 2) { flash('Añade al menos una medida.'); return; }
    progressData.measurements.push(entry); saveProgress();
    els.measurementForm.reset(); els.measurementDate.value=isoToday(); flash('Medición guardada.'); renderProgress(); if(profile){renderToday();renderNutrition();}
  }

  function saveMark(event) {
    event.preventDefault();
    const fd=new FormData(els.markForm); const pushups=num(fd.get('pushups'));
    if(pushups===null || pushups<0){flash('Pon un número válido de flexiones.');return;}
    progressData.marks.push({id:uid(),date:fd.get('date')||isoToday(),pushups:Math.round(pushups)}); saveProgress();
    els.markForm.reset(); els.markDate.value=isoToday(); flash('Marca guardada.'); renderProgress(); if(profile)renderToday();
  }

  function exportProgress() {
    const exportData={...progressData,workouts:progressData.workouts.map(withEffortMetadata)};
    const payload={app:'Hiit Me Baby',version:VERSION,exportedAt:new Date().toISOString(),profile,...exportData};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`hiit-me-baby-datos-${isoToday()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),500);flash('Copia de tus datos creada.');
  }
  async function importProgress(file) {
    try{const parsed=JSON.parse(await file.text());if(!Array.isArray(parsed.measurements)||!Array.isArray(parsed.workouts)||!Array.isArray(parsed.marks))throw new Error('Formato');progressData={measurements:parsed.measurements,workouts:parsed.workouts.map(withEffortMetadata),marks:parsed.marks,nutrition:Array.isArray(parsed.nutrition)?parsed.nutrition:[]};if(parsed.profile&&typeof parsed.profile==='object'){profile=parsed.profile;saveProfile();els.mainTabs.hidden=false;}saveProgress();renderProgress();if(profile){renderToday();renderNutrition();populateProfileForm();}flash('Datos importados.');}catch(_){flash('No he podido leer ese archivo.');}
  }

  els.todayTab.addEventListener('click',()=>setSection('today'));
  els.trainingTab.addEventListener('click',()=>setSection('training'));
  els.progressTab.addEventListener('click',()=>setSection('progress'));
  els.nutritionTab.addEventListener('click',()=>setSection('nutrition'));
  els.profileTab.addEventListener('click',()=>setSection('profile'));
  els.strengthTab.addEventListener('click',()=>setTrainingMode('strength'));
  els.bikeTab.addEventListener('click',()=>setTrainingMode('bike'));
  els.openRecommendation.addEventListener('click',openRecommendedRoutine);
  els.onboardingNext.addEventListener('click',()=>{if(!validateOnboardingStep())return;const total=els.profileForm.querySelectorAll('[data-onboarding-step]').length;if(onboardingStep>=total-1)renderOnboardingResult();else setOnboardingStep(onboardingStep+1);});
  els.onboardingBack.addEventListener('click',()=>setOnboardingStep(onboardingStep-1));
  els.onboardingSave.addEventListener('click',saveOnboarding);
  els.onboardingAdjust.addEventListener('click',()=>{els.onboardingResult.hidden=true;els.profileForm.hidden=false;els.onboardingNav.hidden=false;setOnboardingStep(Math.max(0,onboardingStep));});
  els.onboardingCancel.addEventListener('click',closeOnboarding);
  els.redoOnboarding.addEventListener('click',()=>openOnboarding(true));
  els.startAudit.addEventListener('click',startAudit);
  els.auditForm.addEventListener('submit',saveAuditCheckin);
  els.auditHistory.addEventListener('click',(event)=>{const button=event.target.closest('[data-audit-delete]');if(button)deleteAuditCheckin(button.dataset.auditDelete);});

  document.querySelectorAll('[data-rounds]').forEach((button)=>button.addEventListener('click',()=>{rounds=Number(button.dataset.rounds);localStorage.setItem('hmb-rounds-v6',String(rounds));updateRoundButtons();updateDuration();}));
  els.start.addEventListener('click',startWorkout);els.pause.addEventListener('click',togglePause);els.skip.addEventListener('click',skipStep);els.quit.addEventListener('click',quitWorkout);els.confirmWorkout.addEventListener('click',confirmCompletedWorkout);els.discardWorkout.addEventListener('click',discardCompletedWorkout);
  els.back.addEventListener('click',()=>{els.complete.hidden=true;els.library.hidden=false;els.effortPicker.hidden=true;if(profile)setSection('today');if(pendingReload)window.location.reload();});
  els.effortPicker.querySelectorAll('[data-effort]').forEach((button)=>button.addEventListener('click',()=>{pendingWorkoutEffort=Number(button.dataset.effort);els.effortPicker.querySelectorAll('[data-effort]').forEach((b)=>b.classList.toggle('active',b===button));saveActiveWorkout();}));
  els.recentHistory.addEventListener('click',(event)=>{const button=event.target.closest('[data-delete-id]');if(button)deleteHistoryRecord(button.dataset.deleteKind,button.dataset.deleteId);});
  els.measurementForm.addEventListener('submit',saveMeasurement);els.markForm.addEventListener('submit',saveMark);els.chartMetric.addEventListener('change',renderChart);els.chartRange.addEventListener('change',renderChart);els.exportBtn.addEventListener('click',exportProgress);els.importBtn.addEventListener('click',()=>els.importInput.click());els.importInput.addEventListener('change',()=>{const file=els.importInput.files&&els.importInput.files[0];if(file)importProgress(file);els.importInput.value='';});

  if ('speechSynthesis' in window) { pickVoice(); window.speechSynthesis.onvoiceschanged=pickVoice; }
  else { els.voiceNotice.hidden=false; els.voiceNotice.textContent='Este navegador no ofrece voz; los avisos sonoros seguirán funcionando.'; }

  window.addEventListener('beforeinstallprompt',(event)=>{event.preventDefault();deferredInstallPrompt=event;els.install.hidden=false;});
  els.install.addEventListener('click',async()=>{if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;els.install.hidden=true;});

  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden'){saveActiveWorkout();releaseWakeLock();return;}
    if(!els.player.hidden&&!paused){requestWakeLock();syncPlayback({announceTransition:true});}
  });
  window.addEventListener('pagehide',()=>saveActiveWorkout());
  window.addEventListener('beforeunload',()=>saveActiveWorkout());
  window.addEventListener('pageshow',()=>{if(!els.player.hidden&&!paused)syncPlayback({announceTransition:false});});

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('./service-worker.js', { updateViaCache: 'none' });
        registration.update().catch(() => {});
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!els.player.hidden || !els.complete.hidden) { pendingReload = true; return; }
          window.location.reload();
        });
      } catch (_) {}
    });
  }

  Object.values(EXERCISE_IMAGES).forEach((src) => { const img=new Image(); img.src=src; });
  renderLibrary();
  renderProgress();
  if(onboardingRequired){
    els.mainTabs.hidden=true;
    openOnboarding(false);
  }else{
    els.onboarding.hidden=true;
    if(!restoreActiveWorkout()){
      els.library.hidden=false;
      setSection('today');
    }
  }
})();
