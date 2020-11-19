(this["webpackJsonpminesweeper-typescript"]=this["webpackJsonpminesweeper-typescript"]||[]).push([[0],{109:function(e,n,r){"use strict";r.r(n);var t=r(2),o=(r(0),r(14)),l=r.n(o),a=r(15);function c(e,n){return{type:e,payload:n}}var i,s="OPEN_CELL",u="LABEL_CELL",d="SHOW_ALL_BOMBS",b="RESTART_GAME",m="CHANGE_GAME_LEVEL",f=(r(71),r(72),{openCell:function(e,n){return c(s,{rowIndex:e,columnIndex:n})},labelCell:function(e,n){return c(u,{rowIndex:e,columnIndex:n})}}),j=Object(a.b)((function(e){return{board:e.board,isGameEnded:e.isGameEnded}}),f)((function(e){return Object(t.jsx)("span",{className:e.cell.isOpen?"openCell":"initialCell",onClick:function(){e.cell.isOpen||e.isGameEnded||e.openCell(e.cell.rowIndex,e.cell.columnIndex)},onContextMenu:function(n){n.preventDefault(),e.labelCell(e.cell.rowIndex,e.cell.columnIndex)},children:e.cell.isOpen?0===e.cell.bombCount?null:e.cell.isBomb?"\ud83d\udca3":e.cell.bombCount:e.cell.isFlagged?"\u2620\ufe0f":e.cell.isQuestioned?"?":null})})),p=r(113),O=(r(73),r(112)),v=r(34),h=r(1),g="easy",x="medium",C="hard";function E(e){var n,r=(n=e.length-1,Math.floor(Math.random()*n));e[r].isBomb=!0,e.splice(r,1)}function L(e){i=function(e){switch(e){case g:return i=4;case x:return i=6;case C:return i=10}throw new Error("Unexpected gameLevel value.")}(e);for(var n=[],r=[],t=0;t<=i-1;t++){n[t]=[];for(var o=0;o<=i-1;o++){var l={isBomb:!1,isOpen:!1,bombCount:null,isFlagged:!1,isQuestioned:!1,rowIndex:t,columnIndex:o};n[t][o]=l,r.push(l)}}for(var a=1;a<=i;a++)E(r);return n}var w=function(e){return{board:L(e),isGameEnded:!1,gameLevel:e}};function G(e,n,r){var t=e.length,o=e[0].length;return n>=0&&n<t&&r>=0&&r<o}function y(e,n,r){return G(e,n,r)&&e[n][r].isBomb}function I(e){for(var n=0;n<e.length;n++)for(var r=0;r<e[n].length;r++)e[n][r].isBomb&&(e[n][r].isOpen=!0)}function B(e,n){return e.map((function(e){return e.reduce((function(e,r){return n(r)?e+1:e}),0)})).reduce((function(e,n){return e+n}))}function M(e){var n=(i=e.length)*i,r=B(e,(function(e){return e.isOpen&&!e.isBomb}));return n-i-r}function A(e,n,r){if(G(e.board,n,r)){var t=e.board[n][r];if(!t.isOpen){if(t.isOpen=!0,t.isBomb)return I(e.board),void(e.isGameEnded=!0);if(0!==M(e.board)){if(t.bombCount=function(e,n,r){for(var t=0,o=-1;o<=1;o++)for(var l=-1;l<=1;l++)0===o&&0===l||y(e,n+o,r+l)&&t++;return t}(e.board,n,r),0===t.bombCount)for(var o=-1;o<=1;o++)for(var l=-1;l<=1;l++)0===o&&0===l||A(e,n+o,r+l)}else e.isGameEnded=!0}}}var N=function(e){return e.map((function(e){return e.map((function(e){return e}))}))},k=function(e){return B(e,(function(e){return e.isFlagged}))};function _(e,n){var r=k(n);e.isFlagged?(e.isFlagged=!1,e.isQuestioned=!0):e.isQuestioned?e.isQuestioned=!1:r<i?e.isFlagged=!0:r===i&&(e.isQuestioned=!0)}var F=function(e){return e.board},Q=Object(v.a)([F],M),R=Object(v.a)([F],k),S=function(e){return Object(t.jsx)(j,{cell:e},Object(p.a)())},T=function(e){return Object(t.jsx)("div",{children:e.map(S)},Object(p.a)())},H={restartGame:function(e){return c(b,{gameLevel:e})},showAllBombs:function(){return c(d)},changeGameLevel:function(e){return c(m,{gameLevel:e})}},U=Object(a.b)((function(e){return{board:e.board,isGameEnded:e.isGameEnded,notMinedCells:Q(e),flaggedCells:R(e),gameLevel:e.gameLevel}}),H)((function(e){var n=function(){return e.restartGame(e.gameLevel)};return Object(t.jsxs)("div",{className:"app",children:[Object(t.jsx)("table",{className:"center",children:Object(t.jsx)("tbody",{children:Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{children:Object(t.jsx)("h1",{children:"Minesweeper"})}),Object(t.jsx)("td",{children:Object(t.jsxs)("select",{name:"levels",id:"levels",onChange:function(n){return e.changeGameLevel(n.currentTarget.value)},children:[Object(t.jsx)("option",{value:g,selected:!0,children:"Easy"}),Object(t.jsx)("option",{value:x,children:"Medium"}),Object(t.jsx)("option",{value:C,children:"Hard"})]})})]})})}),Object(t.jsxs)("p",{children:["Not Mined Cells: ",e.notMinedCells]}),Object(t.jsxs)("p",{children:[" \u2620\ufe0f \ufe0f Bombs: ",e.board.length-e.flaggedCells]}),Object(t.jsx)("button",{onClick:n,children:"Restart"}),Object(t.jsx)("button",{onClick:function(){return e.showAllBombs()},children:"Show All Bombs"}),e.board.map(T),e.isGameEnded&&e.notMinedCells>0&&Object(t.jsx)(O.a,{message:"GAME OVER",type:"error",closable:!0,onClick:n}),0===e.notMinedCells&&Object(t.jsx)(O.a,{message:"CONGRATULATIONS! YOU WON!",type:"success",closable:!0,onClick:n})]})})),J=r(20),V=Object(J.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w(g),n=arguments.length>1?arguments[1]:void 0;switch(n.type){case s:var r=N(e.board),t=Object(h.a)(Object(h.a)({},e),{},{board:r});return A(t,n.payload.rowIndex,n.payload.columnIndex),t;case u:var o=N(e.board),l=o[n.payload.rowIndex][n.payload.columnIndex];return _(l,o),Object(h.a)(Object(h.a)({},e),{},{board:o});case b:return w(n.payload.gameLevel);case d:var a=N(e.board);return I(a),Object(h.a)(Object(h.a)({},e),{},{board:a});case m:return w(n.payload.gameLevel)}return e}));l.a.render(Object(t.jsx)(a.a,{store:V,children:Object(t.jsx)(U,{})}),document.getElementById("root"))},71:function(e,n,r){},73:function(e,n,r){}},[[109,1,2]]]);
//# sourceMappingURL=main.a11e66b1.chunk.js.map