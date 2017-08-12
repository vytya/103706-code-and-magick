'use strict';

window.renderStatistics = function (ctx, names, times) {
  var statisticCloud = {
    'coordX': 100,
    'coordY': 10,
    'height': 270,
    'width': 420,
    'mainColor': '#fff',
    'shadowColor': 'rgba(0,0,0,.7)',
    'shadowIndent': 10,
    'fontStyle': '16px PT Mono',
    'winnerText': 'Ура вы победили!',
    'resultListText': 'Список результатов:',
    'textColor': '#000',
    'textIndent': 20,
  };

  // Draw shadow with indent
  ctx.fillStyle = statisticCloud.shadowColor;
  ctx.fillRect(statisticCloud.coordX + statisticCloud.shadowIndent, statisticCloud.coordY + statisticCloud.shadowIndent, statisticCloud.width, statisticCloud.height);

  // Draw face
  ctx.fillStyle = statisticCloud.mainColor;
  ctx.fillRect(statisticCloud.coordX, statisticCloud.coordY, statisticCloud.width, statisticCloud.height);

  // Render text
  ctx.font = statisticCloud.fontStyle;
  ctx.textBaseline = 'top';
  ctx.fillStyle = statisticCloud.textColor;

  ctx.fillText(statisticCloud.winnerText, statisticCloud.coordX + statisticCloud.textIndent, statisticCloud.coordY + statisticCloud.textIndent);

  ctx.fillText(statisticCloud.resultListText, statisticCloud.coordX + statisticCloud.textIndent, statisticCloud.coordY + statisticCloud.textIndent * 2);

  /*
  * Render hystogram columns
  *
  */
  var hystogram = {
    'indentCoordX': 120,
    'indentCoordY': 100,
    'columnHeight': 150,
    'columnWidth': 40,
    'columnsIndent': 50,
    'textYIndent': 10,
  };

  // Get max time & max time array key
  var maxTime = 0;

  for (var i = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = times[i];
    }
  }

  for (var j = 0; j < names.length; j++) {
    var time = Math.floor(times[i]);

    // Count each column % from 100% max time
    var columnPercentHeight = Math.floor((time * 100) / maxTime);

    // Count each column X coordinate of begining
    var eachColumnXCoord = hystogram.indentCoordX + (i * hystogram.columnsIndent) + (i * hystogram.columnWidth);

    // Count each column Y coordinate of begining
    var eachColumnYCoord = hystogram.indentCoordY + (hystogram.columnHeight * (100 - columnPercentHeight) / 100);

    ctx.fillStyle = 'rgba(0, 18, 255, ' + Math.random() + ')';

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    // Draw column
    ctx.fillRect(eachColumnXCoord, eachColumnYCoord, hystogram.columnWidth, hystogram.columnHeight * columnPercentHeight / 100);

    ctx.fillStyle = statisticCloud.textColor;

    // Draw time
    ctx.textBaseline = 'bottom';
    ctx.fillText(time, eachColumnXCoord, eachColumnYCoord - hystogram.textYIndent);

    // Draw name
    ctx.textBaseline = 'top';
    ctx.fillText(names[i], eachColumnXCoord, hystogram.indentCoordY + hystogram.columnHeight + hystogram.textYIndent);
  }
};
