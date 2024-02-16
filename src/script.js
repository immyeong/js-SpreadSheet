const cellContainer = document.querySelector('.spreadSheet-container');
const exportBtn = document.querySelector('#export-btn');
const cellStatus = document.querySelector('#cell-status');
const ROWS = 10;
const COLS = 10;
const spreadSheet = [];

class Cell {
    constructor(isHeader, disabled, data, row, column, rowName,colName, active = false){
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.rowName = rowName;
        this.colName = colName;
        this.active = active;
    }

}

function createCellEl(cell){
    const cellEl = document.createElement('input');
    cellEl.className = 'cell';
    cellEl.id = 'cell_' + cell.row + cell.column;
    cellEl.value = cell.data;

    if(cell.isHeader){
        cellEl.classList.add('header');
        cellEl.setAttribute('disabled', '');
    }

    cellEl.onclick = () => handleCellClick(cell);

    cellEl.onchange = () => handleCellChange(cellEl.value , cell);

    return cellEl;
}

function handleCellChange(data, cell){
    cell.data = data;
}

function handleCellClick(cell){
    handleClearActiveState();
    const rowHeader = spreadSheet[cell.row][0];
    const colHeader = spreadSheet[0][cell.column];

    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
    const colHeaderEl = getElFromRowCol(colHeader.row, colHeader.column);
    
    rowHeaderEl.classList.add('active');
    colHeaderEl.classList.add('active');

    cellStatus.innerText = colHeader.colName + '' + rowHeader.rowName;
}

function handleClearActiveState(){
    for(let i=0; i<spreadSheet.length; i++){
        for(let j=0; j<spreadSheet[i].length; j++){
            const rowHeader = spreadSheet[i][0];
            const colHeader = spreadSheet[0][j];

            const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
            const colHeaderEl = getElFromRowCol(colHeader.row, colHeader.column);
            
            rowHeaderEl.classList.remove('active');
            colHeaderEl.classList.remove('active');
        }
    }
}

function getElFromRowCol(row, col){
    return document.getElementById('cell_'+ row + col);
}

function drawSheet(){
    for(let i=0; i<spreadSheet.length; i++){
        const rowEl = document.createElement('div');
        rowEl.className = 'cell-rows';
        for(let j=0; j<spreadSheet[i].length; j++){
            const cell = spreadSheet[i][j];
            const cellEl = createCellEl(cell);

            rowEl.append(cellEl);
        }
        cellContainer.append(rowEl);
    }
}

initSpreadSheet();

function initSpreadSheet(){
    for(let i=0; i<ROWS; i++){
        const spreadSheetRow = [];
        for(let j=0; j<COLS; j++){
            let cellData = '';
            let isHeader = false;
            let disabled = false;

            if(j===0){
                cellData = i;
                isHeader = true;
                disabled = true;
            }

            if(i === 0){
                cellData = String.fromCharCode(65 + (j - 1));
                isHeader = true;
                disabled = true;
            }

            if(i===0 && j===0){
                cellData = '';
            }

            rowName = i;
            colName = String.fromCharCode(65 + (j - 1));

            const cell = new Cell(isHeader, disabled, cellData, i ,j ,rowName, colName, false);
            spreadSheetRow.push(cell);
        }
        spreadSheet.push(spreadSheetRow);
    }
    drawSheet();
}

exportBtn.addEventListener('click', () => {
    let csv = '';
    for(let i=0; i<spreadSheet.length; i++){
        csv +=
            spreadSheet[i]
                .filter(item => !item.isHeader)
                .map(item => item.data)
                .join(',') + '\r\n';
    }

    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);
    
    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'SpreadSheet File Name.csv';
    a.click();
})