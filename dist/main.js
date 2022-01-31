/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _modules_makeBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/makeBoard */ \"./src/modules/makeBoard.js\");\n/* harmony import */ var _modules_makePlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/makePlayer */ \"./src/modules/makePlayer.js\");\n/* harmony import */ var _modules_gameDisplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/gameDisplay */ \"./src/modules/gameDisplay.js\");\n\n\n\n // import { shipFactory } from './makeShips';\n\nvar gameMessages = document.getElementById('game-messages');\nvar board1 = (0,_modules_makeBoard__WEBPACK_IMPORTED_MODULE_1__.boardFactory)();\nvar board2 = (0,_modules_makeBoard__WEBPACK_IMPORTED_MODULE_1__.boardFactory)();\n(0,_modules_gameDisplay__WEBPACK_IMPORTED_MODULE_3__.displayGame)(board1, board1.rows, 'public'); // create human player\n\nvar nameForm = document.getElementById('name-form');\nvar nameInput = document.getElementById('name-input');\nvar nameInputBtn = document.getElementById('name-input-btn');\nvar player1;\nnameInputBtn.addEventListener('click', function () {\n  var playerName = nameInput.value;\n  player1 = (0,_modules_makePlayer__WEBPACK_IMPORTED_MODULE_2__.playerFactory)(playerName, false, board2);\n  nameForm.classList.add('hidden');\n  gameMessages.textContent = \"Hi, \".concat(playerName, \", time to place your ships!\");\n}); // USE TO RUN THROUGH AUTOMATED GAME\n// const player1 = playerFactory('name', true, board2);\n// const player2 = playerFactory('other name', true, board1);\n// board1.placeArmada(player1.getArmada());\n// board2.placeArmada(player2.getArmada());\n// const turnBtn = document.getElementById('turn-btn');\n// turnBtn.addEventListener('click', () => takeTurn());\n// let turn = 1;\n// let phase = 'setup';\n// const gameBoardContainer = document.getElementById('board-container');\n// gameBoardContainer.addEventListener('click', (e) => {\n//   const row = e.target.dataset.rowCoord;\n//   const column = e.target.dataset.columnCoord;\n//   if(phase === 'setup') {\n//   }\n// })\n// function takeTurn() {\n//   console.log(turn);\n//   let player;\n//   let board;\n//   if(turn === 1) {\n//     player = player1;\n//     board = board2;\n//   } else {\n//     player = player2;\n//     board = board1;\n//   }\n//   displayGame(board, board.rows, 'public');\n//   setTimeout(() => {  player.makeGuess(board); }, 2000);\n//   setTimeout(() => {  displayGame(board, board.rows, 'private'); }, 2500);\n//   if(turn === 1) { turn = 2; } else { turn = 1; };\n//   console.log(turn);\n// }\n// export { takeTurn };\n// TO DO\n// -Allow manual ship placement\n// -Set up game over\n// -Show your own board while hitting other\n// -Show whose turn it is\n// -Make ships looks better\n// -Change colors as ships sink / are sunk\n// -Have AI guess near spaces to hit\n// -Create ship classes\n// -Add numbers and letters to board\n\n//# sourceURL=webpack://battleship_game/./src/index.js?");

/***/ }),

/***/ "./src/makeShips.js":
/*!**************************!*\
  !*** ./src/makeShips.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"shipFactory\": () => (/* binding */ shipFactory)\n/* harmony export */ });\nvar shipFactory = function shipFactory(name, size, firstPosition, direction) {\n  var status = 'afloat';\n  var hits = 0;\n  var positions = [firstPosition];\n\n  var hit = function hit() {\n    hits++;\n\n    if (hits === size) {\n      status = 'sunk';\n    }\n  };\n\n  var positionShip = function positionShip() {\n    var rowPos = firstPosition.row;\n    var colPos = firstPosition.column;\n\n    for (var i = 0; i < size - 1; i++) {\n      var newColumn = colPos + 1 + i;\n      var newRow = rowPos + 1 + i;\n      var newPosition = void 0;\n\n      if (direction === 'horizontal') {\n        newPosition = {\n          row: rowPos,\n          column: newColumn\n        };\n      } else if (direction === 'vertical') {\n        newPosition = {\n          row: newRow,\n          column: colPos\n        };\n      }\n\n      positions.push(newPosition);\n    }\n  };\n\n  function getHits() {\n    return hits;\n  }\n\n  ;\n\n  function getStatus() {\n    return status;\n  }\n\n  ;\n\n  function getDirection() {\n    return direction;\n  }\n\n  ;\n\n  function getPositions() {\n    return positions;\n  }\n\n  ;\n  return {\n    name: name,\n    size: size,\n    positions: positions,\n    getDirection: getDirection,\n    hit: hit,\n    getHits: getHits,\n    getStatus: getStatus,\n    positionShip: positionShip,\n    getPositions: getPositions\n  };\n};\n\n\n\n//# sourceURL=webpack://battleship_game/./src/makeShips.js?");

/***/ }),

/***/ "./src/modules/gameDisplay.js":
/*!************************************!*\
  !*** ./src/modules/gameDisplay.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayGame\": () => (/* binding */ displayGame)\n/* harmony export */ });\n/* harmony import */ var _makeBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./makeBoard */ \"./src/modules/makeBoard.js\");\n/* harmony import */ var _makePlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./makePlayer */ \"./src/modules/makePlayer.js\");\n/* harmony import */ var _makeShips__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../makeShips */ \"./src/makeShips.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index */ \"./src/index.js\");\n\n\n\n\n\nfunction displayGame(board, boardRows, audience) {\n  var boardContainer = document.getElementById('board-container');\n\n  if (boardContainer.childElementCount === 3) {\n    boardContainer.removeChild(boardContainer.lastChild);\n  }\n\n  function displayStatus(div, row, column) {\n    var spaceStatus = boardRows[row][column];\n\n    switch (spaceStatus) {\n      case 'open':\n        div.classList.add('open');\n        break;\n\n      case 'ship':\n        if (audience === 'public') {\n          div.classList.add('open');\n        } else if (audience === 'private') {\n          div.classList.add('ship');\n        }\n\n        break;\n\n      case 'miss':\n        div.classList.add('miss');\n        break;\n\n      case 'hit':\n        div.classList.add('hit');\n        break;\n    }\n  }\n\n  function addSpace(row, rowNumber) {\n    for (var x = 0; x < 10; x++) {\n      var space = document.createElement('div');\n      space.classList.add('space');\n      space.dataset.rowCoord = rowNumber;\n      space.dataset.columnCoord = x;\n      row.appendChild(space);\n      displayStatus(space, rowNumber, x);\n    }\n  }\n\n  function buildBoard() {\n    var gameBoard = document.createElement('div');\n    gameBoard.classList.add('gameboard');\n    boardContainer.appendChild(gameBoard);\n\n    for (var i = 0; i < 10; i++) {\n      var row = document.createElement('div');\n      row.classList.add('row');\n      row.id = \"board-\".concat(i);\n      addSpace(row, i);\n      gameBoard.appendChild(row);\n    }\n  }\n\n  buildBoard(board);\n}\n\n\n\n//# sourceURL=webpack://battleship_game/./src/modules/gameDisplay.js?");

/***/ }),

/***/ "./src/modules/makeBoard.js":
/*!**********************************!*\
  !*** ./src/modules/makeBoard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"boardFactory\": () => (/* binding */ boardFactory)\n/* harmony export */ });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n// refactor position ship to allow players to do it manually\nvar boardFactory = function boardFactory() {\n  var rows = [];\n  var hitCounter = 0;\n\n  (function popBoard() {\n    for (var i = 0; i < 10; i++) {\n      var newRow = [];\n      rows.push(newRow);\n    }\n\n    var _iterator = _createForOfIteratorHelper(rows),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var row = _step.value;\n\n        for (var _i = 0; _i < 10; _i++) {\n          var newColumn = 'open';\n          row.push(newColumn);\n        }\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  })();\n\n  function placeShip(shipPositions) {\n    for (var i = 0; i < shipPositions.length; i++) {\n      var rowPos = shipPositions[i].row;\n      var colPos = shipPositions[i].column;\n      rows[rowPos][colPos] = 'ship';\n    }\n  }\n\n  var placeArmada = function placeArmada(armadaArr) {\n    var _iterator2 = _createForOfIteratorHelper(armadaArr),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var ship = _step2.value;\n        placeShip(ship.getPositions());\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  };\n\n  function hitShip(coordinates, player) {\n    for (var i = 0; i < player.getArmada().length; i++) {\n      var positionArray = player.getArmada()[i].getPositions();\n\n      for (var x = 0; x < positionArray.length; x++) {\n        if (positionArray[x].row === coordinates.row && positionArray[x].column === coordinates.column) {\n          player.getArmada()[i].hit();\n        }\n      }\n    }\n  }\n\n  var receiveAttack = function receiveAttack(coordinates) {\n    var row = coordinates.row;\n    var column = coordinates.column;\n\n    switch (rows[row][column]) {\n      case 'open':\n        rows[row][column] = 'miss';\n        break;\n\n      case 'ship':\n        rows[row][column] = 'hit';\n        hitShip(coordinates);\n        hitCounter++;\n        break;\n    }\n  };\n\n  var checkIfAllSunk = function checkIfAllSunk() {\n    var shipSpaceTotal = 17;\n\n    if (shipSpaceTotal === hitCounter) {\n      return 'sunk';\n    }\n  };\n\n  return {\n    rows: rows,\n    placeShip: placeShip,\n    placeArmada: placeArmada,\n    receiveAttack: receiveAttack,\n    checkIfAllSunk: checkIfAllSunk,\n    hitShip: hitShip\n  };\n};\n\n // let armadaStatus = 'afloat';\n// const shipLengths = [2, 3, 3, 4, 5];\n// const armadaArr = [];\n// const allShipPositions = [];\n// function checkIfShipOffBoard() {\n//   const allSpaces = [];\n//   for(let i = 0; i < allShipPositions.length; i++) {\n//     allSpaces.push(allShipPositions[i].row);\n//     allSpaces.push(allShipPositions[i].column);\n//   }\n//   const offBoard = allSpaces.filter(value => value > 9);\n//   if(offBoard.length > 0) {\n//     throw 'ship is off board' + offBoard.length;\n//   }\n// }\n\n//# sourceURL=webpack://battleship_game/./src/modules/makeBoard.js?");

/***/ }),

/***/ "./src/modules/makePlayer.js":
/*!***********************************!*\
  !*** ./src/modules/makePlayer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"playerFactory\": () => (/* binding */ playerFactory)\n/* harmony export */ });\n/* harmony import */ var _makeBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./makeBoard */ \"./src/modules/makeBoard.js\");\n/* harmony import */ var _makeShips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../makeShips */ \"./src/makeShips.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\nvar playerFactory = function playerFactory(name, isComputer, oppBoard) {\n  var armadaArr = [];\n  var allShipPositions = [];\n  var ships = [{\n    name: 'Destroyer',\n    size: 2\n  }, {\n    name: 'Submarine',\n    size: 3\n  }, {\n    name: 'Cruiser',\n    size: 3\n  }, {\n    name: 'Battleship',\n    size: 4\n  }, {\n    name: 'Carrier',\n    size: 5\n  }]; // HUMAN FUNCTIONS\n  // AI FUNCTIONS\n\n  function getRandomInt(maxNum) {\n    return Math.floor(Math.random() * (maxNum + 1));\n  }\n\n  function pickDirection() {\n    var directNum = getRandomInt(1);\n    var direction;\n\n    if (directNum === 1) {\n      direction = 'horizontal';\n    } else {\n      direction = 'vertical';\n    }\n\n    return direction;\n  }\n\n  function pickFirstSpace(size, direction) {\n    var rowIndex;\n    var columnIndex;\n    var adjustedMax = 9 - size;\n\n    if (direction === 'horizontal') {\n      rowIndex = getRandomInt(9);\n      columnIndex = getRandomInt(adjustedMax);\n    } else {\n      rowIndex = getRandomInt(adjustedMax);\n      columnIndex = getRandomInt(9);\n    }\n\n    var position = {\n      row: rowIndex,\n      column: columnIndex\n    };\n    return position;\n  }\n\n  function autoPlaceShip(ship) {\n    var direction = pickDirection();\n    var firstSpace = pickFirstSpace(ship.size, direction);\n    var newShip = (0,_makeShips__WEBPACK_IMPORTED_MODULE_1__.shipFactory)(ship.name, ship.size, firstSpace, direction);\n    newShip.positionShip();\n    return newShip;\n  }\n\n  function checkForDupes(arr) {\n    var _iterator = _createForOfIteratorHelper(arr),\n        _step;\n\n    try {\n      var _loop = function _loop() {\n        var item = _step.value;\n        var dupes1 = arr.filter(function (newItem1) {\n          return newItem1.row === item.row;\n        });\n        var dupes2 = dupes1.filter(function (newItem2) {\n          return newItem2.column === item.column;\n        });\n\n        if (dupes2.length > 1) {\n          return {\n            v: true\n          };\n        }\n\n        ;\n      };\n\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var _ret = _loop();\n\n        if (_typeof(_ret) === \"object\") return _ret.v;\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n\n    return false;\n  }\n\n  var autoBuildArmada = function autoBuildArmada() {\n    for (var i = 0; i < ships.length; i++) {\n      var dupeCounter = 0;\n      var dupeCheckArr = [];\n      var isDupe = false;\n      var newShip = autoPlaceShip(ships[i]);\n\n      do {\n        dupeCheckArr = allShipPositions.concat(newShip.getPositions());\n        isDupe = checkForDupes(dupeCheckArr);\n\n        if (isDupe === true) {\n          dupeCounter++;\n          newShip = autoPlaceShip(ships[i]);\n        }\n      } while (isDupe === true && dupeCounter < 40);\n\n      if (isDupe === true) {\n        throw 'DUPES' + dupeCounter;\n      }\n\n      ;\n\n      var _iterator2 = _createForOfIteratorHelper(newShip.getPositions()),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var position = _step2.value;\n          allShipPositions.push(position);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n\n      armadaArr.push(newShip);\n    }\n  };\n\n  if (isComputer === true) {\n    autoBuildArmada();\n  }\n\n  var findOpenSpaces = function findOpenSpaces() {\n    var allOpenSpaces = [];\n\n    for (var i = 0; i < 10; i++) {\n      for (var x = 0; x < 10; x++) {\n        if (oppBoard.rows[i][x] === 'open' || oppBoard.rows[i][x] === 'ship') {\n          var position = {\n            row: i,\n            column: x\n          };\n          allOpenSpaces.push(position);\n        }\n      }\n    }\n\n    return allOpenSpaces;\n  };\n\n  var makeGuess = function makeGuess() {\n    var allOpenSpaces = findOpenSpaces();\n    var maxNum = allOpenSpaces.length;\n    var guess = getRandomInt(maxNum);\n    oppBoard.receiveAttack(allOpenSpaces[guess]);\n  }; //GETTERS\n\n\n  function getArmada() {\n    return armadaArr;\n  }\n\n  ;\n\n  function getAllShipPositions() {\n    return allShipPositions;\n  }\n\n  ;\n  return {\n    name: name,\n    getArmada: getArmada,\n    makeGuess: makeGuess,\n    checkForDupes: checkForDupes,\n    findOpenSpaces: findOpenSpaces,\n    getAllShipPositions: getAllShipPositions\n  };\n};\n\n\n\n//# sourceURL=webpack://battleship_game/./src/modules/makePlayer.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n\\n  font-family: helvetica, arial, sans-serif;\\n  margin: auto;\\n  text-align: center;\\n}\\nbody {\\n  background-color:slategrey;\\n}\\n#board-container {\\n  display: grid;\\n  grid-template-columns: repeat(11, 40px);\\n  grid-template-rows: repeat(11, 40px);\\n  height: 440px;\\n  margin-top: 20px;\\n  width: 440px;\\n} \\n#game-dialog {\\n  margin-top: 20px;\\n}\\n#row-number-container { \\n  border: none;\\n  background-color: transparent;\\n  display: grid;\\n  grid-column-start: 1;\\n  grid-row-start: 2;\\n  grid-template-columns:  1fr;\\n  grid-template-rows: repeat(11, 1fr);\\n  height: 440px;\\n  line-height: 40px;\\n  width: 40px;\\n}\\n#title {\\n  margin-top: 20px;\\n}\\n.number-space {\\n  border: none;\\n  background: transparent;\\n  display: grid;\\n  height: 10px;\\n  width: 10px;\\n}\\n#column-number-container {\\n  border: none;\\n  background-color: transparent;\\n  display: grid;\\n  grid-column-start: 2;\\n  grid-row-start: 1;\\n  grid-template-columns:  repeat(10, 1fr);\\n  grid-template-rows: 1fr;\\n  height: 40px;\\n  line-height: 40px;\\n  width: 400px;\\n}\\n\\n.gameboard {\\n  background-color: transparent;\\n  display: grid;\\n  grid-column-start: 2;\\n  grid-row-start: 2;\\n  grid-template-rows: repeat(10, 1fr);\\n  height: 400px;\\n  width: 400px;\\n}\\n.hidden {\\n  display: none;\\n}\\n.space {\\n  border: solid;\\n  border-color: white;\\n  border-width: 1px;\\n  height:38px;\\n  width: 38px;\\n}\\n.number-space {\\n  border: none;\\n  background-color: transparent;\\n  height: 40px;\\n  width: 40px;\\n}\\n.row {\\n  display: grid;\\n  grid-template-columns: repeat(10, 1fr);\\n  height: 40px;\\n  width: 400px;\\n}\\n.open {\\n  background-color: mediumblue;\\n}\\n.miss {\\n  background-color: lightseagreen;\\n}\\n.hit {\\n  background-color: orange;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship_game/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://battleship_game/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship_game/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship_game/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship_game/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship_game/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship_game/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship_game/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship_game/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship_game/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;