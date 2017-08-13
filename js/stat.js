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

  // Draw text messages
  var drawText = function (text, coordX, coordY, textBaseline, color) {
    ctx.textBaseline = textBaseline;
    ctx.fillStyle = color;

    ctx.fillText(text, coordX, coordY);
  };

  // Draw shadow with indent
  ctx.fillStyle = statisticCloud.shadowColor;
  ctx.fillRect(statisticCloud.coordX + statisticCloud.shadowIndent, statisticCloud.coordY + statisticCloud.shadowIndent, statisticCloud.width, statisticCloud.height);

  // Draw face
  ctx.fillStyle = statisticCloud.mainColor;
  ctx.fillRect(statisticCloud.coordX, statisticCloud.coordY, statisticCloud.width, statisticCloud.height);

  // Render text
  ctx.font = statisticCloud.fontStyle;

  drawText(statisticCloud.winnerText, statisticCloud.coordX + statisticCloud.textIndent, statisticCloud.coordY + statisticCloud.textIndent, 'top', statisticCloud.textColor);

  drawText(statisticCloud.resultListText, statisticCloud.coordX + statisticCloud.textIndent, statisticCloud.coordY + statisticCloud.textIndent * 2, 'top', statisticCloud.textColor);

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

  // Get random color depends from item
  var getRandomBlueColor = function (item) {
    if (item === 'Вы') {
      return 'rgba(255, 0, 0, 1)';
    } else {
      return 'rgba(0, 18, 255, ' + Math.random() + ')';
    }
  };

  // Get max time from time array
  var getMaxTime = function (timesArray) {
    var maxTime = 0;

    for (var i = 0; i < timesArray.length; i++) {
      if (maxTime < timesArray[i]) {
        maxTime = Math.floor(timesArray[i]);
      }
    }

    return maxTime;
  };

  var maxTime = getMaxTime(times);

  // Draw hystogram column
  var drawHystogramColumn = function (coordX, coordY, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(coordX, coordY, width, height);
  };

  for (var i = 0; i < names.length; i++) {
    var time = Math.floor(times[i]);

    // Count each column % from 100% max time
    var columnPercentHeight = Math.floor((time * 100) / maxTime);

    // Count each column X coordinate of begining
    var eachColumnXCoord = hystogram.indentCoordX + (i * hystogram.columnsIndent) + (i * hystogram.columnWidth);

    // Count each column Y coordinate of begining
    var eachColumnYCoord = hystogram.indentCoordY + (hystogram.columnHeight * (100 - columnPercentHeight) / 100);

    // Draw column
    drawHystogramColumn(eachColumnXCoord, eachColumnYCoord, hystogram.columnWidth, hystogram.columnHeight * columnPercentHeight / 100, getRandomBlueColor(names[i]));

    // Draw time
    drawText(time, eachColumnXCoord, eachColumnYCoord - hystogram.textYIndent, 'bottom', getRandomBlueColor(names[i]));

    // Draw name
    drawText(names[i], eachColumnXCoord, hystogram.indentCoordY + hystogram.columnHeight + hystogram.textYIndent, 'top', getRandomBlueColor(names[i]));
  }
};
