import { BlockElement } from './BlockElement';

interface IGridContainerConfig {
    classNames?: string[]
    rows?: number,
    colums?: number
    columsWidth?: number
    rowsHeight?: number
    gap?: number
}

export class GridContainer extends BlockElement {
    private colums: number | undefined;
    private rows: number | undefined;
    private columsWidth: number | undefined;
    private rowsHeight: number | undefined;
    private gap: number | undefined;
    constructor(congif: IGridContainerConfig) {
        super(congif)
        this.rows = congif.rows
        this.colums = congif.colums
        this.columsWidth = congif.columsWidth
        this.rowsHeight = congif.rowsHeight
        this.gap = congif.gap

        this.createGrid()
    }

    private createGrid() {
        const gridBlock = this.domEl
        gridBlock.style.display = 'grid'
        gridBlock.style.gridTemplateColumns = `repeat(${this.colums}, ${this.columsWidth || 'auto'})`
        gridBlock.style.gridTemplateRows = `repeat(${this.rows}, ${this.rowsHeight || 'auto'})`
        gridBlock.style.gridAutoRows = 'auto'
        gridBlock.style.gridAutoColumns = 'auto'
        gridBlock.style.gap = (this.gap ? this.gap : 0) + 'px'
    }
} 